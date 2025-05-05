'use client';

import { useState } from 'react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Auctrix?",
      answer: "Auctrix is a premier online property auction platform that connects buyers with unique real estate opportunities. We specialize in residential, commercial, and land properties across India."
    },
    {
      question: "How do I participate in an auction?",
      answer: "To participate in an auction, you need to: 1) Create an account, 2) Complete your profile verification, 3) Browse available properties, 4) Place your bid during the auction period. Make sure to read the property details and terms before bidding."
    },
    {
      question: "What are the payment methods accepted?",
      answer: "We accept various payment methods including bank transfers, UPI, and major credit/debit cards. The specific payment methods available will be shown during the checkout process."
    },
    {
      question: "How do I verify a property before bidding?",
      answer: "Each property listing includes detailed information, photos, and documents. You can schedule a physical inspection through our platform, and our team will assist you in arranging the visit."
    },
    {
      question: "What happens after I win an auction?",
      answer: "After winning an auction, you'll receive a notification and detailed instructions. You'll need to complete the payment within the specified timeframe and submit required documents. Our team will guide you through the entire process."
    },
    {
      question: "Are there any fees for using Auctrix?",
      answer: "There are no fees for browsing properties. A small commission is charged only on successful transactions. The exact fee structure is clearly displayed before you place a bid."
    },
    {
      question: "Can I cancel my bid?",
      answer: "Bids are legally binding and cannot be cancelled once placed. We recommend thoroughly reviewing the property details and your financial capacity before placing a bid."
    },
    {
      question: "How do I know if a property is legitimate?",
      answer: "All properties on Auctrix undergo thorough verification. We verify ownership, legal documents, and property details. Each listing includes verified documents and our team conducts due diligence before listing."
    },
    {
      question: "What if I have issues during the auction?",
      answer: "Our customer support team is available 24/7 to assist you. You can reach us through the contact form, email, or phone. We also have a live chat feature during active auctions."
    },
    {
      question: "How do I get started as a seller?",
      answer: "To list your property, create an account and select 'List Property'. You'll need to provide property details, documents, and photos. Our team will review and verify the information before listing."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Find answers to common questions about our property auction platform.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <span className="text-gray-500 text-xl font-bold">
                  {openIndex === index ? '-' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="/contact" 
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
} 