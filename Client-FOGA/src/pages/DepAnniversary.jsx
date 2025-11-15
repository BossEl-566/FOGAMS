import React from 'react';
import { motion } from 'framer-motion';
import anniversaryBg from '../assets/anniversary.jpg';

// Import available images
import DeaconBoateng from '../assets/Deacon-Boateng.jpg';
import DeaconAnsong from '../assets/Deacon-Ansong.jpg';
import MrsAdomako from '../assets/Mrs-Adomako.jpg';
import JoyceTwentoh from '../assets/Joyce-twentoh.jpg';
import Bright from '../assets/bright.jpg';

const DepAnniversary = () => {
  const teamMembers = [
    { 
      name: "DR JUSTICE BOATENG", 
      role: "Chairperson", 
      responsibility: "Overall Anniversary Planning & Coordination",
      quote: "Celebrating our legacy, building our future",
      img: DeaconBoateng
    },
    { 
      name: "MR JOSEPH K. ARTHUR", 
      role: "Finance Coordinator", 
      responsibility: "Budget Management & Sponsorships",
      quote: "Honoring our past through wise stewardship",
      img: null // No image available
    },
    { 
      name: "PROF. ABRAHAM ANSONG", 
      role: "Historical Committee", 
      responsibility: "Documenting Church Heritage",
      quote: "Those who forget their history cannot build the future",
      img: DeaconAnsong
    },
    { 
      name: "MRS FELICIA ADOMAKO", 
      role: "Events Coordinator", 
      responsibility: "Program Planning & Execution",
      quote: "Creating memorable experiences for generations",
      img: MrsAdomako
    },
    { 
      name: "MR BRIGHT ABEKA MENSAH", 
      role: "Men's Representative", 
      responsibility: "Men's Fellowship Activities",
      quote: "Strong foundations for future generations",
      img: Bright // No image available
    },
    { 
      name: "MRS CHARLOTTE SYBIL DANSO", 
      role: "Women's Ministry Rep", 
      responsibility: "Women's Anniversary Projects",
      quote: "Weaving our story through service",
      img: null // No image available
    },
    { 
      name: "MISS EMMANUELLA DONKOR", 
      role: "Youth Representative", 
      responsibility: "Youth Engagement Programs",
      quote: "Connecting generations through celebration",
      img: null // No image available
    },
    { 
      name: "MRS JOYCE BAABA TWENTOH", 
      role: "Children's Dept Lead", 
      responsibility: "Children's Activities",
      quote: "Planting seeds of legacy in young hearts",
      img: JoyceTwentoh
    },
    { 
      name: "MISS MERCY ANNAN", 
      role: "Professional Liaison", 
      responsibility: "Corporate Partnerships",
      quote: "Bridging faith and professional excellence",
      img: null // No image available
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-yellow-50">
      {/* Hero Section */}
      <div
        className="relative py-24 px-4 sm:px-6 lg:px-8 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${anniversaryBg})` }}
      >
        <div className="absolute inset-0 bg-purple-900/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            <span className="text-shadow-lg shadow-yellow-300">CHURCH ANNIVERSARY</span>
          </motion.h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="h-1 w-32 bg-yellow-400 mx-auto mb-8"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl md:text-2xl text-yellow-200 max-w-3xl mx-auto"
          >
            Celebrating {new Date().getFullYear() - 1998} Years of Faith, Legacy, and Community Impact
          </motion.p>
        </div>
      </div>

      {/* Anniversary Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-purple-900 mb-16"
        >
          <span className="relative inline-block">
            Anniversary Committee
            <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-400"></span>
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
              className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-purple-100 hover:border-yellow-300 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center relative overflow-hidden">
                {member.img ? (
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="text-white flex flex-col items-center justify-center">
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
                <p className="text-gray-600 text-sm mb-4">{member.responsibility}</p>
                <blockquote className="text-gray-700 italic text-sm border-l-4 border-yellow-400 pl-4">
                  "{member.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Church Timeline */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="relative inline-block">
              Our Journey Through Time
              <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-400"></span>
            </span>
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-yellow-400 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0">
              {[
                {
                  year: "1998",
                  event: "Church Founding",
                  description: "Humble beginnings in a small community hall"
                },
                {
                  year: "2005",
                  event: "First Permanent Structure",
                  description: "Dedication of the original church building"
                },
                {
                  year: "2012",
                  event: "Major Expansion",
                  description: "Construction of the main auditorium"
                },
                {
                  year: "2018",
                  event: "20th Anniversary",
                  description: "Celebrating two decades of ministry"
                },
                {
                  year: "2023",
                  event: "Silver Jubilee",
                  description: "25 years of faithful service"
                },
                {
                  year: "Present",
                  event: "Current Anniversary",
                  description: "Continuing the legacy of faith"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  {/* Year circle */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-yellow-400 border-4 border-white flex items-center justify-center text-2xl font-bold text-purple-900 z-10 mb-4 md:mb-0">
                    {item.year}
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} p-6`}>
                    <h3 className="text-xl font-bold text-yellow-300">{item.event}</h3>
                    <p className="text-purple-100">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepAnniversary;