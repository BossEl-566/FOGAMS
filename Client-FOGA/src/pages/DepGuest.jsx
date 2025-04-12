import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DepGuest = () => {
  const leadershipTeam = [
    { 
      name: "DR. NANA ABEKA TWENTOH", 
      role: "Co-Chairperson", 
      description: "Overseeing all guest experience operations and strategic direction",
      img: "/chairperson1.jpg"
    },
    { 
      name: "MRS FELICIA ADOMAKO", 
      role: "Co-Chairperson", 
      description: "Managing guest experience programs and volunteer coordination",
      img: "/chairperson2.jpg"
    },
    { 
      name: "L.P SAMUEL NUAMEH", 
      role: "Men's Representative", 
      description: "Ensuring men feel welcomed and connected to church activities",
      img: "/men-rep.jpg"
    },
    { 
      name: "MISS MERCY ANNAN", 
      role: "Youth Representative", 
      description: "Creating engaging experiences for young visitors and youth integration",
      img: "/youth-rep.jpg"
    }
  ];

  const demographicGroups = [
    {
      title: "Youth Integration",
      description: "Our specialized approach to welcoming and integrating young visitors (ages 12-25) into our church community:",
      features: [
        "Dedicated youth orientation sessions",
        "Peer connection programs with existing youth members",
        "Special events calendar for new young visitors",
        "Youth mentorship opportunities"
      ],
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Men's Welcome",
      description: "Tailored welcome experience for male visitors of all ages:",
      features: [
        "Men's fellowship introductions",
        "Sports and recreational activity connections",
        "Fatherhood and family support resources",
        "Professional networking opportunities"
      ],
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Women's Connection",
      description: "Specialized care for female visitors addressing their unique needs:",
      features: [
        "Women's fellowship introductions",
        "Mothers' support group connections",
        "Women's ministry program overviews",
        "Special events for new female visitors"
      ],
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Guest Experience Department
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Creating meaningful first impressions and lasting connections for all who visit our church,
          from youth to adults, men and women.
        </p>
      </motion.div>

      {/* Leadership Team */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-20 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
                {/* Placeholder for actual image */}
                <div className="text-gray-500 text-xl">Member Photo</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Demographic Focus Areas */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-20 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Focus Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demographicGroups.map((group, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`rounded-xl shadow-sm border ${group.borderColor} ${group.bgColor} p-6`}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">{group.title}</h3>
              <p className="text-gray-600 mb-4">{group.description}</p>
              <ul className="space-y-2">
                {group.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-blue-700 rounded-2xl p-8 md:p-12 text-white mb-16 max-w-6xl mx-auto"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Guest Experience Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">First Visit</h3>
              <p className="text-blue-100">Warm welcome, information packet, and personal greeting from our team</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Follow-Up</h3>
              <p className="text-blue-100">Personalized connection based on demographic and interests</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Integration</h3>
              <p className="text-blue-100">Introduction to relevant ministries and fellowship opportunities</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Want to Get Involved?</h2>
        <p className="text-gray-600 mb-8">
          Our Guest Experience team is always looking for welcoming faces to help newcomers feel at home.
        </p>
        <Link to="/contact-us" className="inline-block">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-all duration-300">
          Join the Guest Experience Team
        </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default DepGuest;