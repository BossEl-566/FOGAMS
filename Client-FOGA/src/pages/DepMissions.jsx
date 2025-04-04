import React, { useState } from 'react';

export default function DepMissions() {
  // Gallery images data - replace placeholder divs with your actual images
  const galleryImages = [
    { 
      id: 1, 
      category: 'school', 
      placeholder: 'School Outreach - Sharing Bible stories with students' 
    },
    { 
      id: 2, 
      category: 'prison', 
      placeholder: 'Prison Ministry - Worship service with inmates' 
    },
    { 
      id: 3, 
      category: 'hospital', 
      placeholder: 'Hospital Visit - Praying with patients' 
    },
    { 
      id: 4, 
      category: 'dawn', 
      placeholder: 'Dawn Outreach - Preaching at information center' 
    },
    { 
      id: 5, 
      category: 'school', 
      placeholder: 'School Assembly - Gospel presentation' 
    },
    { 
      id: 6, 
      category: 'prison', 
      placeholder: 'Prison Counseling - One-on-one sessions' 
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Missions Department</h1>
              <p className="text-xl mb-8">Bringing the light of God's word to schools, prisons, hospitals, and the streets at dawn.</p>
              <button className="bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                Join Our Mission
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Head of Missions Photo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              We are called to spread the Gospel to all corners of society, reaching out to those in schools, prisons, hospitals, 
              and the streets at dawn. Our mission is to bring hope, healing, and the transformative power of God's word to every 
              person we encounter.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Areas */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Mission Fields</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* School Missions */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-48 bg-blue-100 flex items-center justify-center">
                <span className="text-blue-800">School Mission Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Schools Outreach</h3>
                <p className="text-gray-600">
                  Bringing God's word to students and educators, shaping young minds with biblical principles and values.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Education
                  </span>
                </div>
              </div>
            </div>

            {/* Prison Missions */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-48 bg-purple-100 flex items-center justify-center">
                <span className="text-purple-800">Prison Mission Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Prison Ministry</h3>
                <p className="text-gray-600">
                  Offering hope and redemption to inmates through the transformative power of the Gospel.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Reformation
                  </span>
                </div>
              </div>
            </div>

            {/* Hospital Missions */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <span className="text-green-800">Hospital Mission Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Hospital Visits</h3>
                <p className="text-gray-600">
                  Bringing comfort, healing prayers, and spiritual support to patients and medical staff.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Healing
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dawn Outreach - Full width */}
          <div className="mt-12 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 bg-orange-100 flex items-center justify-center">
                <span className="text-orange-800">Dawn Outreach Photo</span>
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Dawn Information Center Outreach</h3>
                <p className="text-gray-600 mb-4">
                  Meeting people where they are early in the morning, sharing God's word at transportation hubs and information centers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Evangelism
                  </span>
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Early Morning
                  </span>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Public Spaces
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outreach Photo Gallery */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Outreach Moments</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Witness the transformative power of God's work through our mission activities.
          </p>

          {/* Sliding Gallery */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl shadow-xl">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((image) => (
                  <div 
                    key={image.id} 
                    className="w-full flex-shrink-0 relative"
                  >
                    <div className="h-96 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-center p-4">{image.placeholder}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                      <p className="text-sm uppercase tracking-wider">{image.category} Outreach</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Impact Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
                    <span className="text-gray-500">Photo</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Testifier {item}</h4>
                    <p className="text-sm text-gray-500">Mission Beneficiary</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The mission team brought hope when I needed it most. Their words and prayers changed my life forever."
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Mission?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you want to participate in our outreach programs or support our missions financially, we'd love to have you on board.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
              Volunteer Now
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition duration-300">
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}