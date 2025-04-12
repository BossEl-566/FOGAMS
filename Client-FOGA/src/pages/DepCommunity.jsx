import React from 'react';
import { motion } from 'framer-motion';

const DepCommunity = () => {
  const impactStories = [
    {
      id: 1,
      title: "Grace's Tailoring Shop",
      description: "With a microloan of ₵5,000, Grace now employs 3 apprentices in her thriving tailoring business",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
    },
    {
      id: 2,
      title: "Youth Tech Hub",
      description: "50 young people trained in digital skills with our equipment donation",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Community Farm Project",
      description: "Sustainable agriculture initiative feeding 200 families monthly",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    }
  ];

  const leadershipTeam = [
    { 
      name: "DR. NANA ABEKA TWENTOH", 
      role: "Chairperson", 
      expertise: "Community Development Strategy",
      quote: "Real change happens when we empower people to transform their own communities"
    },
    { 
      name: "DR. DANIEL OBENG-MENSAH", 
      role: "Men's Representative", 
      expertise: "Entrepreneurship Training",
      quote: "Teaching a man to fish creates generational change"
    },
    { 
      name: "MISS CYNTHIA BAWA", 
      role: "Youth Representative", 
      expertise: "Education Initiatives",
      quote: "Investing in youth is investing in our collective future"
    },
    { 
      name: "MRS BETTY OFORI AIDOO", 
      role: "Women's Representative", 
      expertise: "Microfinance Programs",
      quote: "Small seeds grow mighty trees when nurtured properly"
    }
  ];

  const supportOptions = [
    {
      title: "Become a Monthly Partner",
      description: "Recurring donations that provide sustainable support",
      icon: "🔄",
      cta: "Set Up Monthly Giving"
    },
    {
      title: "Sponsor a Business Startup",
      description: "Fund equipment and training for new entrepreneurs",
      icon: "💼",
      cta: "Fund a Startup"
    },
    {
      title: "Donate Supplies",
      description: "Contribute tools, equipment or materials",
      icon: "🛠️",
      cta: "View Needs List"
    },
    {
      title: "Volunteer Your Skills",
      description: "Mentor entrepreneurs or teach valuable skills",
      icon: "👩‍🏫",
      cta: "Offer Expertise"
    }
  ];

  const scrollToDonationSection = () => {
    const donationSection = document.getElementById('donation-section');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-green-900/70"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="text-shadow-lg shadow-green-800">COMMUNITY IMPACT FUND</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8"
          >
            Empowering Lives Through Sustainable Development
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={scrollToDonationSection}
              className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Make an Impact
            </button>
          </motion.div>
        </div>
      </div>

      {/* Impact Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-16"
        >
          <span className="relative inline-block pb-2">
            Lives Transformed
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {impactStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">{story.title}</h3>
                <p className="text-gray-600">{story.description}</p>
                <button className="mt-4 text-green-600 hover:text-green-800 font-medium flex items-center">
                  Read full story
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            <span className="relative inline-block pb-2">
              Our Empowerment Programs
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">Microfinance</h3>
              <p className="text-green-100 mb-4">Small business loans with mentorship and training</p>
              <div className="text-yellow-300 text-sm font-medium">200+ businesses funded</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-3">Vocational Training</h3>
              <p className="text-green-100 mb-4">Practical skills development programs</p>
              <div className="text-yellow-300 text-sm font-medium">15 trades taught</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-3">Agricultural Support</h3>
              <p className="text-green-100 mb-4">Seeds, tools and modern farming techniques</p>
              <div className="text-yellow-300 text-sm font-medium">50 acre cooperative farm</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="text-4xl mb-4">👩‍💻</div>
              <h3 className="text-xl font-bold mb-3">Digital Literacy</h3>
              <p className="text-green-100 mb-4">Bridging the technology gap in our community</p>
              <div className="text-yellow-300 text-sm font-medium">500+ youth trained</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-16"
        >
          <span className="relative inline-block pb-2">
            Our Leadership Team
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                <div className="text-white text-4xl font-light">
                  {member.name.split(' ')[1].charAt(0)}{member.name.split(' ')[2].charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900">{member.name}</h3>
                <p className="text-yellow-600 font-medium mb-1">{member.role}</p>
                <p className="text-gray-700 text-sm mb-4">{member.expertise}</p>
                <blockquote className="text-gray-600 italic text-sm border-l-2 border-yellow-400 pl-4">
                  "{member.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-16"
          >
            <span className="relative inline-block pb-2">
              How You Can Help
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-green-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{option.description}</p>
                <button className="mt-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-300">
                  {option.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donation-section" className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            <span className="relative inline-block pb-2">
              Make a Financial Impact
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
            </span>
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Bank Account Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-yellow-300">Local Transfers (GHS)</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-green-100 font-medium">Bank Name:</p>
                      <p className="text-white">Ghana Commercial Bank</p>
                    </div>
                    <div>
                      <p className="text-green-100 font-medium">Account Name:</p>
                      <p className="text-white">DEP COMMUNITY IMPACT FUND</p>
                    </div>
                    <div>
                      <p className="text-green-100 font-medium">Account Number:</p>
                      <p className="text-white">6011134567890</p>
                    </div>
                    <div>
                      <p className="text-green-100 font-medium">Branch:</p>
                      <p className="text-white">Kasoa Main Branch</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4 text-yellow-300">International Transfers (USD)</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-green-100 font-medium">Bank Name:</p>
                      <p className="text-white">Standard Chartered Bank Ghana</p>
                    </div>
                    <div>
                      <p className="text-green-100 font-medium">Account Name:</p>
                      <p className="text-white">DEP COMMUNITY IMPACT FUND</p>
                    </div>
                    <div>
                      <p className="text-green-100 font-medium">Account Number:</p>
                      <p className="text-white">0213456789012</p>
                    </div>
                    <div>
                      <p className="text-green-100 font-medium">SWIFT Code:</p>
                      <p className="text-white">SCBLGHAC</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 text-center mt-12">Mobile Money Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h4 className="font-bold mb-2">MTN Mobile Money</h4>
                  <p className="text-green-100 mb-1">Number: 0244 123 4567</p>
                  <p className="text-sm text-green-200">Name: DEP COMMUNITY FUND</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h4 className="font-bold mb-2">Vodafone Cash</h4>
                  <p className="text-green-100 mb-1">Number: 0200 123 4567</p>
                  <p className="text-sm text-green-200">Name: DEP COMMUNITY FUND</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h4 className="font-bold mb-2">AirtelTigo Money</h4>
                  <p className="text-green-100 mb-1">Number: 0277 123 4567</p>
                  <p className="text-sm text-green-200">Name: DEP COMMUNITY FUND</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-green-100 mb-6">
                  Your generous donations help us continue our community empowerment programs and transform lives.
                </p>
                <button className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  I've Made a Donation
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepCommunity;