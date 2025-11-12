import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-blue-900 text-white py-2 px-4 text-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Left Section - Contact Info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start space-x-6">
            {/* Phone */}
            <div className="flex items-center space-x-2">
              <FaPhone className="text-blue-300 text-xs" />
              <a href="tel:+233246290280" className="hover:text-blue-200 transition-colors">
                (+233) 24-629-0280
              </a>
            </div>
            
            {/* WhatsApp */}
            <div className="flex items-center space-x-2">
              <FaWhatsapp className="text-green-400 text-xs" />
              <a 
                href="https://wa.me/233240395732" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                (+233) 24-039-5732
              </a>
            </div>
            
            {/* Email */}
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-300 text-xs" />
              <a 
                href="mailto:agghfoga.pedu@gmail.com" 
                className="hover:text-blue-200 transition-colors"
              >
                agghfoga.pedu@gmail.com
              </a>
            </div>
          </div>

          {/* Right Section - Address & Service Times */}
          <div className="flex flex-wrap items-center justify-center md:justify-end space-x-6">
            {/* Address */}
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-300 text-xs" />
              <span className="hidden sm:inline">Cape Coast - Pedu, Opposite Cape FM</span>
              <span className="sm:hidden">Cape Coast - Pedu</span>
            </div>
            
            {/* Service Times */}
            <div className="flex items-center space-x-2">
              <FaClock className="text-blue-300 text-xs" />
              <span className="hidden md:inline">Sun: 6:30AM, 8:00AM, 10:40AM</span>
              <span className="md:hidden">Services Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;