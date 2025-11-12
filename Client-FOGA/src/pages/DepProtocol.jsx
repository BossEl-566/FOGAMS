import React from 'react';
import { motion } from 'framer-motion';

// Import only the images that exist
import BraCann from '../assets/Bra-Cann.jpg';
import Savina from '../assets/savina.jpg';
import Hawa from '../assets/Hawa.jpg';
import MrManu from '../assets/Mr-Manu.jpg';
import Rejoyce from '../assets/rejoyce.jpg';

const DepProtocol = () => {
  const teamMembers = [
    {
      name: "Brother Elliot Datsomor",
      role: "Head Usher",
      department: "Sanctuary",
      image: null, // No image available
      quote: "We create the first impression of God's house"
    },
    {
      name: "Brother Linus Datsomor",
      role: "Cleaning Coordinator",
      department: "Sanctuary Care",
      image: null, // No image available
      quote: "A clean temple honors our holy God"
    },
    {
      name: "Mr. Amos Botchway",
      role: "Parking Team Lead",
      department: "Logistics",
      image: BraCann,
      quote: "Order reflects the nature of our God"
    },
    {
      name: "Sister Savina",
      role: "Treasurer",
      department: "Intercession",
      image: Savina,
      quote: "Prayer prepares the spiritual atmosphere"
    },
    {
      name: "Miss Hawawu Kassim",
      role: "Welcome Team",
      department: "First Impressions",
      image: Hawa,
      quote: "Every smile can open a heart to the Gospel"
    },
    {
      name: "Miss Bridget Mawuli",
      role: "Welcome Team",
      department: "First Impressions",
      image: null, // No image available
      quote: "Every smile can open a heart to the Gospel"
    },
    {
      name: "Brother Dickson",
      role: "Welcome Team",
      department: "First Impressions",
      image: null, // No image available
      quote: "Every smile can open a heart to the Gospel"
    },
    {
      name: "Mr Alexanda Manu",
      role: "Security Lead",
      department: "Safety & Time keeper",
      image: MrManu,
      quote: "Protecting God's people is sacred work"
    },
    {
      name: "Sister Rejoice",
      role: "Prayer Coordinator",
      department: "Intercession",
      image: Rejoyce,
      quote: "Prayer prepares the spiritual atmosphere"
    }
  ];

  const weeklySchedule = [
    {
      day: "Tuesday",
      time: "6:00 PM - 7:30 PM",
      activity: "Prayer Meeting",
      description: "Intercessory prayers for the church and community"
    },
    {
      day: "Saturday",
      time: "8:00 AM - 12:00 PM",
      activity: "Church Cleaning",
      description: "Sanctuary preparation for Sunday services"
    },
    {
      day: "Sunday",
      time: "7:00 AM - 1:00 PM",
      activity: "Ushering Ministry",
      description: "Welcoming, seating, and service coordination"
    }
  ];

  const coreValues = [
    {
      title: "Excellence",
      description: "We maintain high standards in all we do",
      icon: "⭐"
    },
    {
      title: "Hospitality",
      description: "Every visitor feels like an honored guest",
      icon: "🤝"
    },
    {
      title: "Order",
      description: "Everything done decently and in order",
      icon: "🔄"
    },
    {
      title: "Prayer",
      description: "Foundation of all our activities",
      icon: "🙏"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436397543931-01c4a5162bdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-purple-900/70"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            PROTOCOL & USHERING
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="h-1 w-24 bg-yellow-400 mx-auto mb-8"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto"
          >
            Creating Order, Warmth, and Sacred Space in God's House
          </motion.p>
        </div>
      </div>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-16"
        >
          <span className="relative inline-block pb-2">
            Our Core Values
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            <span className="relative inline-block pb-2">
              Our Weekly Rhythm
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
            </span>
          </motion.h2>
          
          <div className="space-y-6">
            {weeklySchedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-yellow-400 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-yellow-300">{item.day}</h3>
                    <p className="text-purple-100">{item.time}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <h4 className="text-lg font-semibold">{item.activity}</h4>
                    <p className="text-purple-100">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-16"
        >
          <span className="relative inline-block pb-2">
            Meet Our Team
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 bg-gray-100 overflow-hidden flex items-center justify-center">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm mt-2">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-900">{member.name}</h3>
                <p className="text-yellow-600 font-medium mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.department}</p>
                <blockquote className="text-gray-700 italic text-sm border-l-2 border-yellow-400 pl-4">
                  "{member.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default DepProtocol;