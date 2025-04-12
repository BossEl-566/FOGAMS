import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DepMedia = () => {
  // Media equipment images for hero section
  const heroImages = [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80", // Camera setup
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", // Audio mixer
    "https://unsplash.com/photos/man-in-black-crew-neck-shirt-holding-black-dslr-camera-H84so_4re8o", // Lighting
    "https://unsplash.com/photos/man-in-black-crew-neck-t-shirt-standing-in-front-of-people-_xJqCQgkpLc"  // Headphones
  ];

  const teamMembers = [
    {
      name: "DR. DANIEL OBENG - MENSAH",
      role: "Chairperson",
      expertise: "Media Strategy & Content Direction",
      image: "/media-chair.jpg",
      quote: "We don't just share content, we spread the Gospel through digital means."
    },
    {
      name: "KARIM YUSSIF SAAMID",
      role: "Multimedia Producer",
      expertise: "Video Production & Live Streaming",
      image: "/media-producer.jpg",
      quote: "Every frame we capture tells a story of faith."
    },
    {
      name: "EMMANUEL P.K. OKYERE",
      role: "Social Media Manager",
      expertise: "Digital Engagement & Branding",
      image: "/media-social.jpg",
      quote: "Turning likes into spiritual connections."
    },
    {
      name: "ALBERT LEMAIRE",
      role: "Audio/Visual Technician",
      expertise: "Sound Engineering & Lighting",
      image: "/media-av.jpg",
      quote: "Perfect sound for perfect worship moments."
    }
  ];

  const services = [
    {
      title: "Live Streaming",
      description: "Broadcasting services and events worldwide",
      icon: "🎥"
    },
    {
      title: "Social Media",
      description: "Engaging content across all platforms",
      icon: "📱"
    },
    {
      title: "Photography",
      description: "Capturing memorable church moments",
      icon: "📸"
    },
    {
      title: "Graphic Design",
      description: "Visual content for announcements and events",
      icon: "🎨"
    },
    {
      title: "Podcasting",
      description: "Audio content for spiritual growth",
      icon: "🎙️"
    },
    {
      title: "Media Training",
      description: "Equipping members with digital skills",
      icon: "💻"
    }
  ];

  const stats = [
    { value: "10K+", label: "Weekly Reach" },
    { value: "500+", label: "Videos Produced" },
    { value: "24/7", label: "Content Updates" },
    { value: "100%", label: "Holy Spirit Led" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Poppins']">
      {/* New Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 flex">
          {heroImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                repeatDelay: 2,
                delay: index * 3
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            ></motion.div>
          ))}
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              textShadow: [
                '0 0 0px rgba(99, 102, 241, 0)',
                '0 0 10px rgba(99, 102, 241, 0.8)',
                '0 0 20px rgba(99, 102, 241, 0.5)'
              ]
            }}
            transition={{ 
              duration: 0.8,
              textShadow: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            MEDIA COMMITTEE
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              textShadow: [
                '0 0 0px rgba(167, 139, 250, 0)',
                '0 0 8px rgba(167, 139, 250, 0.8)',
                '0 0 15px rgba(167, 139, 250, 0.5)'
              ]
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              textShadow: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }
            }}
            className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-12"
          >
            Amplifying God's message through technology and creativity
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: [
                '0 0 0px rgba(255, 255, 255, 0)',
                '0 0 10px rgba(255, 255, 255, 0.8)',
                '0 0 20px rgba(255, 255, 255, 0.5)'
              ]
            }}
            transition={{ 
              delay: 0.6,
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="mt-12 rounded-full"
          >
            <Link to="/gallery">
            <button className="bg-white text-gray-900 hover:bg-gray-200 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Explore Our Work
            </button>
            </Link>
          </motion.div>
        </div>
      </div>
      {/* Rest of the sections remain exactly the same */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Meet The Team
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 bg-gradient-to-br from-blue-900 to-purple-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/media-pattern.png')] opacity-20"></div>
                <div className="text-6xl z-10">
                  {index === 0 && "🎬"}
                  {index === 1 && "🎥"}
                  {index === 2 && "📱"}
                  {index === 3 && "🎛️"}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-400">{member.name}</h3>
                <p className="text-purple-300 font-medium mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4">{member.expertise}</p>
                <blockquote className="text-gray-400 italic text-sm border-l-2 border-blue-500 pl-4">
                  "{member.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Our Media Services
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute -right-10 -top-10 text-8xl opacity-10 group-hover:opacity-20 transition-all duration-500">
                  {service.icon}
                </div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <motion.p 
                  className="text-5xl font-bold mb-2"
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: ["0 0 0px #fff", "0 0 10px #fff", "0 0 0px #fff"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-blue-200 uppercase text-sm tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/media-grid.png')] opacity-10"></div>
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready To Amplify Your Message?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Contact our media team for your next event or project.
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/contact-us">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Connect With Us
              </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepMedia;