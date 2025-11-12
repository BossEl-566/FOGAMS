import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import your images
import churchProject from '/src/assets/church-project.jpg';
import churchProject1 from '/src/assets/church-project1.jpg';
import churchProject2 from '/src/assets/church-project2.jpg';
import mrManu from '/src/assets/Mr-Manu.jpg';
import karim from '/src/assets/Karim.jpg';

const DepProject = () => {
  // Use imported images
  const projectImages = [
    churchProject,
    churchProject1,
    churchProject2
  ];

  const teamMembers = [
    { 
      name: "MR JOSEPH KWEKU ARTHUR", 
      role: "Chairperson", 
      expertise: "Project Oversight & Fundraising",
      contact: "024-427-4915",
      quote: "Building God's house requires both faith and diligence",
      img: mrManu
    },
    { 
      name: "MR ALEX MANU", 
      role: "Men's Representative", 
      expertise: "Construction Coordination",
      contact: "",
      quote: "Strong foundations for future generations",
      img: mrManu
    },
    { 
      name: "MR KARIM YUSSIF", 
      role: "Youth Representative", 
      expertise: "Volunteer Mobilization",
      contact: "",
      quote: "Engaging young hands in kingdom building",
      img: karim
    },
    { 
      name: "MRS OPHELIA BOATENG", 
      role: "Women's Ministry Rep", 
      expertise: "Interior Design & Decor",
      contact: "",
      quote: "Creating a welcoming house of worship",
      img: mrManu
    }
  ];

  const projectPhases = [
    {
      name: "Phase 1: Foundation",
      progress: 0,
      amount: "₵ 1,000,000",
      status: "Pending",
      description: "Site preparation and foundation work completed"
    },
    {
      name: "Phase 2: Structure",
      progress: 0,
      amount: "₵ 6,000,000",
      status: "Pending",
      description: "Steel framework and roofing currently underway"
    },
    {
      name: "Phase 0: Finishes",
      progress: 0,
      amount: "₵ 1,000,000",
      status: "Pending",
      description: "Interior finishes and landscaping"
    }
  ];

  const donationMethods = [
    {
      name: "Mobile Money",
      details: [
        { network: "MTN", number: "0240 395 732", name: "Assemblies of God Ghana(Fellowship of Grace)" },
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: "Bank Transfer",
      details: [
        { bank: "National Investment Bank (NIB)", account: "1311096930701", name: "Fellowship of Grace Ass. of God" },
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen bg-gray-900 overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 flex">
          {projectImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 24,
                repeat: Infinity,
                repeatDelay: 4,
                delay: index * 10
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
              NEW AUDITORIUM PROJECT
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Building a 3,000-seat worship center for generations to come
          </motion.p>
        </div>
      </div>

      {/* Project Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
        >
          Project Gallery
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={image} 
                  alt={`Church project ${index + 1}`}
                  className="w-full h-56 object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-white p-4">
                <p className="text-gray-700 text-center">Project Phase {index + 1}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center space-x-4"
        >
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all">
            View All Photos
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium py-2 px-4 rounded-lg transition-all">
            Construction Timeline
          </button>
        </motion.div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Vision for the Future
            </h2>
            <div className="h-1 w-24 bg-yellow-500 mb-8"></div>
            <p className="text-lg text-gray-600 mb-6">
              Our new auditorium will be a state-of-the-art worship center designed to serve our growing congregation for decades to come. With modern acoustics, comfortable seating, and versatile spaces, this facility will enhance our worship experience and community outreach.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">3,000-seat main auditorium</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Modern audio-visual systems</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Accessible design for all</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-1 rounded-xl shadow-2xl"
          >
            <div className="rounded-lg overflow-hidden">
              <img 
                src={churchProject} 
                alt="Church project overview"
                className="w-full h-96 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Progress */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Project Phases & Progress
          </motion.h2>
          
          <div className="space-y-12">
            {projectPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{phase.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      phase.status === "Completed" ? "bg-green-100 text-green-800" :
                      phase.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{phase.description}</p>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Budget: {phase.amount}</span>
                      <span>{phase.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          phase.status === "Completed" ? "bg-green-500" :
                          phase.status === "In Progress" ? "bg-yellow-500" :
                          "bg-gray-300"
                        }`} 
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - IMPROVED */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4"
        >
          Project Committee
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto"
        >
          Meet the dedicated team overseeing the construction of our new auditorium
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Member Image */}
              <div className="h-48 overflow-hidden bg-gray-100">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                  {member.name}
                </h3>
                <p className="text-yellow-600 font-semibold mb-2 text-sm">
                  {member.role}
                </p>
                
                {member.contact && (
                  <p className="text-gray-600 text-sm mb-3 font-medium">
                    📞 {member.contact}
                  </p>
                )}
                
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {member.expertise}
                </p>
                
                <blockquote className="text-gray-600 italic text-sm border-l-3 border-yellow-500 pl-3 py-1 bg-yellow-50 rounded-r">
                  "{member.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Support the Project
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {donationMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
              >
                <div className="flex items-center mb-6">
                  {method.icon}
                  <h3 className="text-2xl font-bold ml-4">{method.name}</h3>
                </div>
                
                <div className="space-y-4">
                  {method.details.map((detail, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-300 mb-1">
                        {detail.network || detail.bank}
                      </h4>
                      <p className="text-xl font-mono mb-1">{detail.number || detail.account}</p>
                      <p className="text-sm text-white/80">{detail.name}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              All donations are tax-deductible and will be acknowledged with official receipts.
            </p>
            <Link to="/contact-us" className="inline-block mb-4">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Request Donation Information
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DepProject;