'use client';

import { useEffect, useRef, useState } from 'react';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function MailingList() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState(''); // 'success', 'error', or ''
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStartedAt = useRef(Date.now());
  const widgetIdRef = useRef(null);
  const turnstileContainerRef = useRef(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current) return;

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainerRef.current) return;
      if (widgetIdRef.current != null) return;

      widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: 'subscribe',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return undefined;
    }

    const existing = document.querySelector(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (existing) {
      existing.addEventListener('load', renderWidget);
      return () => existing.removeEventListener('load', renderWidget);
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    document.body.appendChild(script);

    return undefined;
  }, []);

  const resetTurnstile = () => {
    setTurnstileToken('');
    if (window.turnstile && widgetIdRef.current != null) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    if (!TURNSTILE_SITE_KEY || !turnstileToken) {
      setStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          website,
          formStartedAt: formStartedAt.current,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setName('');
        setWebsite('');
        formStartedAt.current = Date.now();
        resetTurnstile();
      } else {
        setStatus('error');
        console.error('Subscription error:', data.error);
        resetTurnstile();
      }
    } catch (error) {
      setStatus('error');
      console.error('Network error:', error);
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Mailing List</h1>

      <p className="mb-4">
        Emailing is kept to a minimum, solely about upcoming performances, recordings of works made available, and selected press.
      </p>

      <p className="mb-6">
        You can unsubscribe anytime.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
            placeholder="Name (optional)"
            autoComplete="name"
          />
        </div>

        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
            placeholder="Email address"
            autoComplete="email"
          />
        </div>

        {/* Honeypot — hidden from humans, filled by many bots */}
        <div
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {TURNSTILE_SITE_KEY ? (
          <div ref={turnstileContainerRef} className="pt-1" />
        ) : (
          <p className="text-sm text-red-700">
            Turnstile is not configured (missing site key).
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !TURNSTILE_SITE_KEY || !turnstileToken}
          className="px-4 py-2 bg-amber-600 text-black hover:bg-amber-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 text-green-700">
          <p>Thank you for subscribing!</p>
          <br />
          <p>Please check your email for a welcome email which <i>might</i> end up in your promtions/spam folder, and move it to your primary inbox - so our efforts are not all in vein!</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 text-red-700">
          <p>Something went wrong. Please try again.</p>
        </div>
      )}
    </div>
  );
}
