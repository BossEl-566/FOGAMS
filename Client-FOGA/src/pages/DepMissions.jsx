import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import only the images that exist
import MissionImage from '../assets/missions4.jpg';
import FrancisDorduno from '../assets/francis-dorduno.jpg';
import PastorEric from '../assets/pastor-Eric.jpg';
import Khadija from '../assets/Khadija.jpg';
import MrsAdomako from '../assets/Mrs-Adomako.jpg';
import DrShibu from '../assets/Dr-Shibu.jpg';
import mission1 from "../assets/young-singles-3.jpg";
import mission2 from "../assets/missions2.jpg";
import mission3 from "../assets/missions3.jpg";
import mission4 from "../assets/missions4.jpg";
import mission5 from "../assets/missions5.jpg";
import mission6 from "../assets/missions6.jpg";
import mission7 from "../assets/missions7.jpg";

export default function DepMissions() {
  // Gallery images data - using actual imported images
  const galleryImages = [
    { 
      id: 1, 
      category: 'school', 
      placeholder: 'School Outreach - Sharing Bible stories with students', 
      image: mission1
    },
    { 
      id: 2, 
      category: 'prison', 
      placeholder: 'Prison Ministry - Worship service with inmates',
      image: mission2
    },
    { 
      id: 3, 
      category: 'hospital', 
      placeholder: 'Hospital Visit - Praying with patients',
      image: mission3
    },
    { 
      id: 4, 
      category: 'dawn', 
      placeholder: 'Dawn Outreach - Preaching at information center',
      image: mission4
    },
    { 
      id: 5, 
      category: 'school', 
      placeholder: 'School Assembly - Gospel presentation',
      image: mission5
    },
    { 
      id: 6, 
      category: 'prison', 
      placeholder: 'Prison Counseling - One-on-one sessions',
      image: mission6
    },
    { 
      id: 7, 
      category: 'community', 
      placeholder: 'Community Outreach - Sharing God\'s love',
      image: mission7
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
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white bg-gray-300 overflow-hidden">
                <img
                  src={MissionImage}
                  alt="Missions Department"
                  className="w-full h-full object-cover"
                />
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
              <div className="h-48 bg-blue-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={mission1} 
                  alt="School Missions" 
                  className="w-full h-full object-cover"
                />
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
              <div className="h-48 bg-purple-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={mission2} 
                  alt="Prison Ministry" 
                  className="w-full h-full object-cover"
                />
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
              <div className="h-48 bg-green-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={mission3} 
                  alt="Hospital Visits" 
                  className="w-full h-full object-cover"
                />
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
              <div className="md:w-1/2 h-64 bg-orange-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={mission4} 
                  alt="Dawn Outreach" 
                  className="w-full h-full object-cover"
                />
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
                    <div className="h-96 bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img 
                        src={image.image} 
                        alt={image.placeholder}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                      <p className="text-sm uppercase tracking-wider">{image.category} Outreach</p>
                      <p className="text-xs mt-1">{image.placeholder}</p>
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
            {[
              { image: mission5, name: "School Outreach Beneficiary", story: "The mission team brought hope when I needed it most. Their words and prayers changed my life forever." },
              { image: mission6, name: "Prison Ministry Participant", story: "Through the prison ministry, I found redemption and a new purpose in Christ. My life has been transformed." },
              { image: mission7, name: "Community Member", story: "The dawn outreach team met me at my lowest point and showed me God's love in a practical way." }
            ].map((testimony, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimony.image} 
                      alt={testimony.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimony.name}</h4>
                    <p className="text-sm text-gray-500">Mission Beneficiary</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "{testimony.story}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership and Team Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Leadership & Team</h2>
          
          {/* Department Head */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-16 bg-blue-50 rounded-xl p-8">
            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={FrancisDorduno} 
                  alt="Lay Pastor Francis Dorduno"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 md:pl-10 text-center md:text-left">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Lay Pastor Francis Dorduno</h3>
              <p className="text-lg text-gray-600 mb-4">Head of Missions Department</p>
              <p className="text-gray-700 mb-4">
                With over 5 years of missionary experience, Lay Pastor Francis Dorduno leads our team with passion and dedication, 
                ensuring we fulfill our calling to spread the Gospel to all corners of society.
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
            {[
              { 
                name: "Pastor Eric Botchwey", 
                role: "Prison Ministry Leader", 
                years: 5, 
                image: PastorEric 
              },
              { 
                name: "Madam Khadija", 
                role: "Hospital Chaplain", 
                years: 5, 
                image: Khadija 
              },
              { 
                name: "Lay Pastor Francis Dorduno", 
                role: "Dawn Outreach Director", 
                years: 5, 
                image: FrancisDorduno 
              },
              { 
                name: "Deaconess Felicia Adomako", 
                role: "Dawn Outreach Director", 
                years: 5, 
                image: MrsAdomako 
              },
              { 
                name: "Mr. Anothy", 
                role: "Prayer Team Leader", 
                years: 5, 
                image: null // Using mission image as placeholder
              },
              { 
                name: "Dr. Shiabu Adams", 
                role: "Prison Ministry Leader", 
                years: 5, 
                image: DrShibu 
              },
            ].map((member, index) => (
              <div 
                key={`${member.name.replace(/\s+/g, '-')}-${index}`} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full"
              >
                <div className="h-60 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={`Portrait of ${member.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-xs">
                    Serving for {member.years} year{member.years !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Join Team CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Join Our Missions Team</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join us in spreading the Gospel. 
              Whether you can commit to regular service or occasional volunteering, your gifts are needed.
            </p>
            <Link to='/contact-us'>
              <button className="bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                Apply to Serve
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}