import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // MailerLite API configuration
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!MAILERLITE_API_KEY) {
      console.error('MailerLite API key not configured');
      return NextResponse.json(
        { error: 'Service not configured' },
        { status: 500 }
      );
    }

    // Prepare subscriber data
    const subscriberData = {
      email: email,
      fields: name ? { name: name } : {},
      groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : []
    };

    // Add subscriber to MailerLite
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(subscriberData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('MailerLite API error:', errorData);
      
      // Handle specific error cases
      if (response.status === 409) {
        // Subscriber already exists
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

    const result = await response.json();
    console.log('Successfully added subscriber:', result);

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