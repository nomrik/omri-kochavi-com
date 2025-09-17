'use client';

import { useState } from 'react';

export default function MailingList() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(''); // 'success', 'error', or ''
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        console.error('Subscription error:', data.error);
      }
    } catch (error) {
      setStatus('error');
      console.error('Network error:', error);
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
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
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