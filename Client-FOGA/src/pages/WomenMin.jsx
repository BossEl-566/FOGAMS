import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChurch, FaCalendarAlt, FaPrayingHands, FaUsers } from 'react-icons/fa';

// Import available images
import FriendsWomenMinistry from '../assets/Friends-Women-Ministry.jpg';
import WomenMinistryFoga from '../assets/Women-Ministry-Foga.jpg';
import WomenHero from '../assets/women-hero.jpg';
import WomenAnd from '../assets/Women-and.jpg';
import WomenCuttingCake from '../assets/women-cutting-cake.jpg';
import WomenAction from '../assets/women-action.jpg';
import WomenFriends from '../assets/women-friends.jpg';
import WomenInWorship from '../assets/women-in-worship.jpg';
import WomenCelebration from '../assets/women-celebration.jpg';
import WomenAfricaDressed from '../assets/women-africa-dressed.jpg';
import AsafoMameeYamoah from '../assets/asafo-mamee-yamoah.jpg';
import SingingWomen from '../assets/singing-women.jpg';
import MaaJosephine from '../assets/maa-Josephine.jpg';
import JoyceTwentoh from '../assets/Joyce-twentoh.jpg';
import JanetNuwame from '../assets/Janet-Nuwame.jpg';
import OldLadyMary from '../assets/Old-Lady-Mary.jpg';
import WomenInPink from '../assets/women-in-pink.jpg';

export default function WomenMin() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHero, setCurrentHero] = useState(0);

  // Image paths - using imported images
  const heroImages = [
    FriendsWomenMinistry,
    WomenMinistryFoga,
    WomenHero,
    WomenAnd,
  ];

  const galleryImages = [
    WomenCuttingCake, WomenAction, WomenFriends, WomenInWorship,
    WomenCelebration, WomenAfricaDressed, AsafoMameeYamoah, SingingWomen
  ];

  const leadership = [
    {
      name: "Mad. Josephine Yawson",
      position: "President",
      image: MaaJosephine
    },
    {
      name: "Mrs. Joyce Baaba Twentoh",
      position: "Vice President",
      image: JoyceTwentoh
    },
    {
      name: "Sec Mrs. Janet Nuwame",
      position: "Secretary",
      image: JanetNuwame
    },
    {
      name: "Mad. Mary Blankson",
      position: "Treasurer",
      image: OldLadyMary
    }
  ];

  // Handle image error
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    // Create fallback background
    e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
    
    const fallbackText = document.createElement('div');
    fallbackText.className = 'text-white text-center p-4';
    fallbackText.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="text-sm">Image not available</span>
    `;
    e.target.parentElement.appendChild(fallbackText);
  };

  // Auto-rotate hero images and gallery slides
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const galleryInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (galleryImages.length - 3));
    }, 4000);

    return () => {
      clearInterval(heroInterval);
      clearInterval(galleryInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Compact Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentHero ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url(${img})`,
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
              <div className="text-center px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Women's Ministry
                </h1>
                <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-4">
                  Empowering women through faith, fellowship and service
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4">Welcome Sisters in Christ</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our Women's Ministry is a vibrant community where women of all ages come together to grow spiritually, 
            build meaningful relationships, and serve our church and community with love and compassion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-pink-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border-t-4 border-pink-500">
            <div className="text-pink-600 text-4xl mb-4 flex justify-center">
              <FaChurch />
            </div>
            <h3 className="text-xl font-bold text-pink-800 mb-3">Weekly Fellowship</h3>
            <p className="text-gray-600">
              Join us every Wednesday for Bible study, prayer and encouraging fellowship with other women.
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border-t-4 border-blue-500">
            <div className="text-blue-600 text-4xl mb-4 flex justify-center">
              <FaPrayingHands />
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">Prayer Support</h3>
            <p className="text-gray-600">
              Our prayer warriors are available to pray with you and for you through life's challenges.
            </p>
          </div>

          <div className="bg-red-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border-t-4 border-red-500">
            <div className="text-red-600 text-4xl mb-4 flex justify-center">
              <FaUsers />
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-3">Community Outreach</h3>
            <p className="text-gray-600">
              We actively serve our community through various outreach programs and charitable initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Meeting Times */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Meeting Schedule</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-15 p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-pink-300 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Weekly Bible Study</h3>
              </div>
              <p className="text-blue-100">Wednesdays</p>
              <p className="text-pink-300 font-medium">6:00 PM - 7:30 PM</p>
            </div>

            <div className="bg-white bg-opacity-15 p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-pink-300 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Monthly Fellowship</h3>
              </div>
              <p className="text-blue-100">First Saturday</p>
              <p className="text-pink-300 font-medium">10:00 AM - 12:00 PM</p>
            </div>

            <div className="bg-white bg-opacity-15 p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-pink-300 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Prayer Meeting</h3>
              </div>
              <p className="text-blue-100">Every Friday</p>
              <p className="text-pink-300 font-medium">5:30 AM - 6:30 AM</p>
            </div>

            <div className="bg-white bg-opacity-15 p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-pink-300 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Quarterly Retreat</h3>
              </div>
              <p className="text-blue-100">Next: March 15-17</p>
              <p className="text-pink-300 font-medium">All Day Event</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Our Leadership Team</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((leader, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="h-64 bg-gray-100 overflow-hidden relative">
                {leader.image ? (
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">Image not available</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 text-center bg-gradient-to-b from-white to-blue-50">
                <h3 className="text-xl font-bold text-blue-900">{leader.name}</h3>
                <p className="text-red-600 font-medium">{leader.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Slider */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-800 mb-12">Our Gallery</h2>
          
          <div className="relative overflow-hidden h-64 md:h-96">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
            >
              {galleryImages.map((img, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/4 px-2">
                  <div className="h-64 md:h-96 rounded-lg overflow-hidden shadow-md border-4 border-white relative">
                    <img 
                      src={img} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={handleImageError}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {galleryImages.slice(0, galleryImages.length - 3).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-red-600' : 'bg-pink-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-700 to-pink-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FaQuoteLeft className="text-4xl text-pink-300 mx-auto mb-6" />
          <p className="text-xl md:text-2xl italic mb-8">
            "Being part of this women's ministry has transformed my spiritual life. The love, support and 
            biblical teaching I've received here has helped me grow in ways I never imagined possible."
          </p>
          <p className="font-bold">- Sister Grace Mensah</p>
          <p className="text-pink-300">Member since 2018</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 text-white flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Join Us?</h2>
              <p className="mb-6">
                Whether you're looking for spiritual growth, Christian fellowship, or opportunities to serve, 
                we'd love to welcome you to our next meeting.
              </p>
              <div className="bg-red-600 text-white font-bold py-3 px-6 rounded-full inline-block hover:bg-red-700 transition-colors duration-300 self-start shadow-md">
                Contact Us Today
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src={WomenInPink} 
                alt="Women's Ministry Group"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}