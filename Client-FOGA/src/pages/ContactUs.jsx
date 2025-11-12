import React from 'react';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import churchBg from '../assets/Board.jpg'; // Replace with your image path


export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  // WhatsApp contact information
  const whatsappContacts = [
    {
      name: "Pastor",
      number: "233246290280", // Format: country code without + and remove any spaces or dashes
      message: "Hello Pastor, I would like to get in touch with you regarding...",
      role: "Senior Pastor"
    },
    {
      name: "Church Office",
      number: "233240395732",
      message: "Hello, I would like to inquire about...",
      role: "Church Administration"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({ isSubmitting: true, isSuccess: false, error: null });

    try {
      // Replace with your actual form submission endpoint
      const response = await fetch('/api/contact/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSubmissionStatus({ isSubmitting: false, isSuccess: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      setSubmissionStatus({ isSubmitting: false, isSuccess: false, error: error.message });
    }
  };

  // Function to open WhatsApp
  const openWhatsApp = (number, message = "") => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 text-white h-96"
        style={{
          backgroundImage: `url(${churchBg})`
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Fellowship Of Grace A/G Church</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for prayer, questions, or just to say hello!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              {submissionStatus.isSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              {submissionStatus.error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                  Error: {submissionStatus.error}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                  disabled={submissionStatus.isSubmitting}
                >
                  {submissionStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* WhatsApp Quick Connect Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Connect via WhatsApp</h2>
              <p className="text-gray-600 mb-6">
                Prefer to chat directly? Connect with our pastoral team and church administration through WhatsApp for immediate assistance.
              </p>
              
              <div className="space-y-4">
                {whatsappContacts.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{contact.name}</h3>
                        <p className="text-gray-600 text-sm">{contact.role}</p>
                      </div>
                      <button
                        onClick={() => openWhatsApp(contact.number, contact.message)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200"
                      >
                        <FaWhatsapp size={18} />
                        <span>Chat on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start">
                  <FaWhatsapp className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">WhatsApp Hours</h4>
                    <p className="text-green-700 text-sm">
                      Our pastoral team is available on WhatsApp during office hours (8:00 AM - 5:00 PM). 
                      For urgent pastoral care outside these hours, please call directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:w-1/2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1 mr-4">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Our Location</h3>
                    <p className="text-gray-600">Fellowship of Grace Assemblies of God, Cape Coast- Pedu. Opposite Cape FM.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1 mr-4">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone Number</h3>
                    <p className="text-gray-600">(+233) 24-039-5732</p>
                    <p className="text-gray-600">(+233) 24-629-0280</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1 mr-4">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Address</h3>
                    <p className="text-gray-600">agghfoga.pedu@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1 mr-4">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Service Times</h3>
                    <p className="text-gray-600">Sunday: 6:00 AM & 7:00 AM & 10:45 AM</p>
                    <p className="text-gray-600">Wednesday Bible Study: 6:00 PM</p>
                    <p className="text-gray-600">Friday Prayer Meeting: 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => openWhatsApp(whatsappContacts[0].number, whatsappContacts[0].message)}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-200"
                >
                  <FaWhatsapp size={18} />
                  <span>Chat with Pastor</span>
                </button>
                <a
                  href="tel:+233240395732"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition duration-200"
                >
                  <FaPhone size={16} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.2858949474497!2d-1.2775667!3d5.1297198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfddfebb728ffd69%3A0x5521eee7ea8a954!2sFellowship%20of%20Grace%20-%20Assemblies%20of%20God%20Church!5e0!3m2!1sen!2sgh!4v1712838152785!5m2!1sen!2sgh"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fellowship of Grace Map"
              ></iframe>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Connect With Us</h2>
              <div className="flex space-x-4">
                <a
                  href="https://web.facebook.com/foga.pedu.7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition duration-200"
                >
                  <FaFacebook size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/agfogapedu/" 
                  className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={20} />
                </a>
                <a 
                  href="https://www.youtube.com/@fellowshipofgraceassemblyp2160" 
                  className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube size={20} />
                </a>
                <button
                  onClick={() => openWhatsApp(whatsappContacts[0].number)}
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition duration-200"
                >
                  <FaWhatsapp size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}