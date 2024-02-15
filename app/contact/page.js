import React from 'react';
import Link from 'next/link';

const EMAIL_ADDRESS = "omri.kochavi@gmail.com";

const ContactPage = () => {
  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p className="mb-4">For all enquiries, email me at at <Link className='underline' href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</Link>.</p>
    </div>
  );
};

export default ContactPage;
