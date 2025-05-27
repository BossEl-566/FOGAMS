import React from 'react';
import { motion } from 'framer-motion';

const DepCounseling = () => {
  const leadershipTeam = [
    { 
      name: "Her Ladyship Veronique Praba Tetteh", 
      role: "Chairperson", 
      specialty: "Pastoral Care & Crisis Counseling",
      img: "/src/assets/Veronique.jpg",
      quote: "Every visit is an opportunity to bring God's comfort to those in need."
    },
    { 
      name: "MRS. RHODA ACQUAAH", 
      role: "Senior Counselor", 
      specialty: "Marriage & Family Counseling",
      img: "/src/assets/.jpg",
      quote: "Strong families build a strong church community."
    },
    { 
      name: "MRS. STELLA KALU", 
      role: "Visitation Coordinator", 
      specialty: "Home Visits & Hospital Chaplaincy",
      img: "/src/assets/stella.jpg",
      quote: "We meet people where they are, physically and spiritually."
    }
  ];

  const serviceProcess = [
    {
      step: "1",
      title: "Initial Contact",
      description: "Member reaches out or is referred to our department",
      color: "bg-teal-100 border-teal-200"
    },
    {
      step: "2",
      title: "Assessment",
      description: "We listen and understand the specific needs",
      color: "bg-blue-100 border-blue-200"
    },
    {
      step: "3",
      title: "Care Plan",
      description: "Tailored approach developed with the member",
      color: "bg-purple-100 border-purple-200"
    },
    {
      step: "4",
      title: "Ongoing Support",
      description: "Regular follow-ups and adjustments as needed",
      color: "bg-indigo-100 border-indigo-200"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Curved Bottom */}
      <div className="relative bg-gradient-to-r from-blue-800 to-indigo-900 pt-20 pb-32 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/cross-pattern.svg')] bg-repeat"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Counseling & Visitation Ministry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Bringing Christ's compassion to homes, hospitals, and hearts through personalized care
          </motion.p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Leadership Team - Vertical Cards */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Care Team</h2>
          <div className="space-y-8">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200`}
              >
                <div className="md:w-1/3 h-64 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder for image */}
                  <div className="text-gray-500"><img src={member.img} /></div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-start">
                    <span className="text-4xl font-bold text-gray-300 mr-4">{index + 1}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                      <p className="text-gray-700 font-medium mb-4">{member.specialty}</p>
                      <blockquote className="text-gray-600 italic pl-4 border-l-4 border-blue-200">
                        "{member.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Timeline */}
        <section className="bg-gray-50 py-16 mb-20 rounded-xl">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Our Care Process</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
              
              <div className="space-y-12 md:space-y-0">
                {serviceProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  >
                    {/* Step circle */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full ${step.color.split(' ')[0]} border-4 ${step.color.split(' ')[1]} flex items-center justify-center text-2xl font-bold text-gray-800 z-10 mb-4 md:mb-0`}>
                      {step.step}
                    </div>
                    
                    {/* Content */}
                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                      <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Confidentiality Notice */}
        <div className="text-center text-sm text-gray-500 mb-12">
          <p>All counseling conversations are held in strict confidence according to pastoral ethics.</p>
        </div>
      </div>
    </div>
  );
};

export default DepCounseling;