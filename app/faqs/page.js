'use client';
import { useState } from 'react';
export default function FAQs() {
  const [show, setShow] = useState(null);

  const faqList = [
    {
      question: "What is Auctrix?",
      answer: "Auctrix is a online auction website where users can bid on propertys like land, homes, etc. All over india."
    },
    {
      question: "How do I participate in an auction?",
      answer: "Signup first, verify your account then find a property and click bid. Make sure you read every detail about the property before bidding."
    },
    {
      question: "What are the payment methods accepted?",
      answer: "We have bank, cards, UPI and more. Depends what stage you're at."
    },
    {
      question: "How do I verify a property before bidding?",
      answer: "All listings have documents & photos. Physical checks can be setup too with our team."
    },
    {
      question: "What happens after I win an auction?",
      answer: "You'll get email + next steps. Payment + docs needed soon after."
    },
    {
      question: "Fees?",
      answer: "Free to browse, fee when you win. We show it before you confirm."
    },
    {
      question: "Cancel my bid?",
      answer: "Not possible. All bids are final, pls be sure before bidding."
    },
    {
      question: "Property legit?",
      answer: "We check docs, ownership, and do due diligence before putting on site."
    },
    {
      question: "Problems during auction?",
      answer: "Support is there, you can email or use chat. Live help available during auction time."
    },
    {
      question: "List my property?",
      answer: "Go to List Property, fill info and wait for team to approve."
    }
  ];

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div className="bg-slate-900 text-white py-16">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem' }}>
          <h1 className="text-3xl font-bold mb-2">FAQs</h1>
          <p className="text-gray-300 text-base">Common Questions users come across. Listed down all in one place.</p>
        </div>
      </div>

      <div className="px-5 py-10" style={{ maxWidth: '800px', margin: 'auto' }}>
        {faqList.map((item, i) => (
          <div className="bg-white rounded-md mb-4 shadow border border-gray-200" key={i}>
            <button
              onClick={() => setShow(show === i ? null : i)}
              className="w-full text-left px-4 py-3 text-gray-900 text-sm font-semibold flex justify-between items-center"
            >
              <span>{item.question}</span>
              <span className="font-bold text-gray-500">{show === i ? '-' : '+'}</span>
            </button>
            {show === i ? (
              <div className="px-4 pb-3 text-gray-600 text-sm">
                {item.answer}
              </div>
            ) : null}
          </div>
        ))}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p className="text-gray-600 text-sm mb-2">Still stuck?</p>
          <a
            href="/contact"
            className="bg-slate-900 text-white py-2 px-5 text-sm rounded hover:bg-slate-800"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
