import React from 'react';
import { motion } from 'framer-motion';

const DepFundraising = () => {
  const leadershipTeam = [
    { 
      name: "PROF ABRAHAM ANSONG", 
      role: "Chairperson", 
      contact: "",
      expertise: "Financial Strategy & Investment Oversight",
      quote: "Stewarding resources wisely to advance God's kingdom"
    },
    { 
      name: "MR JOSEPH KWEKU ARTHUR", 
      role: "Finance Director", 
      contact: "0244274915",
      expertise: "Fund Management & Financial Reporting",
      quote: "Every cedi invested in God's work yields eternal dividends"
    },
    { 
      name: "MRS FELICIA ADOMAKO", 
      role: "Fundraising Coordinator", 
      contact: "0243538690",
      expertise: "Capital Campaigns & Donor Relations",
      quote: "Generosity transforms both giver and receiver"
    },
    { 
      name: "MR EMMANUEL L. BILANDAM", 
      role: "Men's Representative", 
      contact: "",
      expertise: "Business Development Initiatives",
      quote: "Building financial foundations for generational impact"
    },
    { 
      name: "MISS BRIDGET MAWULI", 
      role: "Youth Representative", 
      contact: "",
      expertise: "Next-Gen Financial Stewardship",
      quote: "Empowering young investors for kingdom business"
    },
    { 
      name: "MRS ABREFA", 
      role: "Women's Representative", 
      contact: "",
      expertise: "Community Microfinance",
      quote: "Small investments grow mighty harvests"
    }
  ];

  const focusAreas = [
    {
      title: "Capital Fundraising",
      description: "Major campaigns for church projects and expansions",
      features: [
        "Annual pledge drives",
        "Legacy giving programs",
        "Special project funding"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Business Development",
      description: "Church-owned enterprises and income streams",
      features: [
        "Kingdom business incubator",
        "Profit-sharing ventures",
        "Skills training programs"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Investment Portfolio",
      description: "Strategic growth of church assets",
      features: [
        "Real estate investments",
        "Marketable securities",
        "Impact investment fund"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  const stats = [
    { value: "5.2M", label: "Annual Budget Managed" },
    { value: "18+", label: "Business Ventures" },
    { value: "100%", label: "Financial Transparency" },
    { value: "7YRS", label: "Investment Growth" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-green-900 py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">
              FINANCE & FUNDRAISING
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Business Development & Investment Management
          </p>
          <div className="h-1 w-24 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Stewarding God's resources for kingdom impact through strategic financial management, 
            business ventures, and wise investments
          </p>
        </motion.div>
      </div>

      {/* Leadership Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          <span className="border-b-4 border-yellow-400 pb-2">Leadership Team</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                <div className="text-white text-4xl font-light">
                  {member.name.split(' ')[0].charAt(0)}{member.name.split(' ')[1].charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                {member.contact && <p className="text-gray-600 text-sm mb-2">{member.contact}</p>}
                <p className="text-gray-700 text-sm mb-4">{member.expertise}</p>
                <blockquote className="text-gray-600 italic text-sm border-l-2 border-yellow-400 pl-4">
                  "{member.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-800 mb-16"
          >
            <span className="border-b-4 border-yellow-400 pb-2">Our Focus Areas</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-3 bg-gradient-to-r from-blue-600 to-green-600"></div>
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{area.title}</h3>
                  <p className="text-gray-600 mb-6">{area.description}</p>
                  <ul className="space-y-3 text-left">
                    {area.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default DepFundraising;