import React from 'react';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import churchBg from '../assets/community-event.jpg'; // Replace with your image path

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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
  className="relative bg-cover bg-center bg-no-repeat py-20 text-white"
  style={{
    backgroundImage: `url(${churchBg})`
  }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-black opacity-80"></div>

  <div className="relative container mx-auto px-6 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Fellowship Of Grace A/G Church</h1>
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
                    <p className="text-gray-600">Fellowship of Grace Assemblies of God, Cape Coast. Opposite Cape FM.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1 mr-4">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone Number</h3>
                    <p className="text-gray-600">(+233)24-039-5732</p>
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
                    <p className="text-gray-600">Sunday: 9:00 AM & 11:00 AM</p>
                    <p className="text-gray-600">Wednesday Bible Study: 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe 
                title="Church Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256842494!2d-73.98810768459378!3d40.74844047932787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTMuNyJX!5e0!3m2!1sen!2sus!4v1623862345678!5m2!1sen!2sus" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Connect With Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition duration-200">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition duration-200">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition duration-200">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}