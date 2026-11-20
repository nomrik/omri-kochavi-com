import { NextResponse } from 'next/server';

const MIN_SUBMIT_MS = 2500;
const EXPECTED_ACTION = 'subscribe';

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function fakeSuccess() {
  // Appear successful so bots don't learn how to bypass checks.
  return NextResponse.json(
    { message: 'Successfully subscribed to mailing list!' },
    { status: 200 }
  );
}

function getExpectedHostnames() {
  return new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? '')
      .split(',')
      .map((hostname) => hostname.trim())
      .filter(Boolean)
  );
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET;
  const expectedHostnames = getExpectedHostnames();

  if (
    typeof token !== 'string' ||
    token.length === 0 ||
    token.length > 2048 ||
    !secret ||
    expectedHostnames.size === 0
  ) {
    return { ok: false, reason: 'misconfigured_or_missing_token' };
  }

  let result;
  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });
    if (ip && ip !== 'unknown') {
      body.set('remoteip', ip);
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: AbortSignal.timeout(10_000),
        body,
      }
    );
    if (!response.ok) {
      throw new Error(`siteverify ${response.status}`);
    }
    result = await response.json();
  } catch (error) {
    console.warn('Turnstile siteverify request failed:', error);
    return { ok: false, reason: 'siteverify_error' };
  }

  if (
    !result.success ||
    result.action !== EXPECTED_ACTION ||
    !expectedHostnames.has(result.hostname)
  ) {
    console.warn('Turnstile verification rejected:', {
      success: result.success,
      action: result.action,
      hostname: result.hostname,
      errorCodes: result['error-codes'],
    });
    return { ok: false, reason: 'invalid' };
  }

  return { ok: true };
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const { email, name, website, formStartedAt, turnstileToken } =
      await request.json();

    // Honeypot: real users never fill this.
    if (typeof website === 'string' && website.trim() !== '') {
      console.warn('Honeypot triggered from', ip);
      return fakeSuccess();
    }

    // Reject instant scripted submissions.
    const started = Number(formStartedAt);
    if (!Number.isFinite(started) || Date.now() - started < MIN_SUBMIT_MS) {
      console.warn('Too-fast submission from', ip);
      return fakeSuccess();
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const turnstile = await verifyTurnstile(turnstileToken, ip);
    if (!turnstile.ok) {
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 403 }
      );
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!MAILERLITE_API_KEY) {
      console.error('MailerLite API key not configured');
      return NextResponse.json(
        { error: 'Service not configured' },
        { status: 500 }
      );
    }

    const subscriberData = {
      email,
      fields: name ? { name } : {},
      groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
    };

    const response = await fetch(
      'https://connect.mailerlite.com/api/subscribers',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(subscriberData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('MailerLite API error:', errorData);

      if (response.status === 409) {
        return NextResponse.json(
          { message: 'You are already subscribed to our mailing list!' },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to subscribe to mailing list' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to mailing list!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
