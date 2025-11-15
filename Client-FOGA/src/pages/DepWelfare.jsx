import React from 'react';
import { motion } from 'framer-motion';

// Import images
// import EvansPaemuka from '../assets/.jpg';
import Apeatse from '../assets/APEATSE.jpg';
import Josephine from '../assets/maa-Josephine.jpg';
// import EmmanuelArthur from '../assets/.jpg';
import JoyceTwentoh from '../assets/Joyce-twentoh.jpg';
import FrancisAnsah from '../assets/Francis-Ansah.jpg';

const DepWelfare = () => {
  const welfareTeam = [
    { name: "MR. EVANS PAEMUKA", role: "Head of Welfare", img: null },
    { name: "MRS ERNESTINA APEATSE", role: "Deputy Head", img: Apeatse },
    { name: "MAD. JOSEPINE YAWSON", role: "Secretary", img: Josephine },
    { name: "MR EMMANUEL ARTHUR", role: "Treasurer", img: null },
    { name: "MRS JOYCE BAABA TWENTOH", role: "Events Coordinator", img: JoyceTwentoh },
    { name: "MR. FRANCIS ANSAH", role: "Member Relations", img: FrancisAnsah },
  ];

  const services = [
    { title: "Weddings", description: "Support and coordination for church weddings", icon: '💒' },
    { title: "Funerals", description: "Assistance with funeral arrangements and bereavement support", icon: '⚰️' },
    { title: "Child Naming", description: "Celebrating new life in our church family", icon: '👶' },
    { title: "Financial Support", description: "Temporary assistance for members in need", icon: '💰' },
    { title: "Monthly Contribution", description: "Collection of offerings every last week of the month", icon: '📅' },
    { title: "Member Care", description: "Looking after the wellbeing of all members", icon: '❤️' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Welfare Department
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Caring for our church family in times of joy, sorrow, and everyday life.
          Every member is part of our welfare community.
        </p>
      </motion.div>

      {/* Services Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">Our Welfare Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {welfareTeam.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
            >
              <div className="h-48 bg-purple-100 overflow-hidden">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-900">{member.name}</h3>
                <p className="text-purple-600 mb-4">{member.role}</p>
                <p className="text-gray-600">Dedicated to serving our church community with love and compassion.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Membership Info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-purple-700 rounded-2xl p-8 md:p-12 text-white mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Welfare Community</h2>
          <p className="text-lg mb-6">
            Every member of our church is automatically part of the welfare department. 
            We collect offerings as dues every last week of the month to support our 
            community in times of need and celebration.
          </p>
          <div className="bg-white text-purple-900 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2">Welfare Contributions</h3>
            <p>Collected every last Sunday of the month during service.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DepWelfare;