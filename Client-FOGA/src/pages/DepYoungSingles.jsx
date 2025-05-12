import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DepYoungSingles() {
  const [activeTab, setActiveTab] = useState('purity');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const leadership = [
    {
      name: 'MISS MARIAN-STELLA ARMAH',
      role: 'PRESIDENT',
      image: '/src/assets/stella.jpg',
      bio: 'Dedicated to empowering young women through biblical principles and practical life skills.',
      symbol: '👑'
    },
    {
      name: 'MRS. SANDRA COBBINAH',
      role: 'SECRETARY',
      image: '/src/assets/sandra.jpg',
      bio: 'Organizes events and keeps our ministry running smoothly with grace and efficiency.',
      symbol: '📝'
    },
    {
      name: 'MISS BRIDGET MAWULI',
      role: 'TREASURER',
      image: '/src/assets/bridget.jpg',
      bio: 'Manages our resources wisely to further our mission of purity and purpose.',
      symbol: '💰'
    },
    {
      name: 'MISS EMMA ESSIEN',
      role: 'ORGANIZER',
      image: '/src/assets/emma.jpg',
      bio: 'Creates meaningful fellowship opportunities that build sisterhood in Christ.',
      symbol: '🎯'
    }
  ];

  const topics = [
    {
      id: 'purity',
      title: 'Purity & Purpose',
      icon: '💍',
      verse: '1 Timothy 4:12',
      description: 'We explore what it means to live a life of purity while waiting on God\'s timing for marriage. Our discussions focus on maintaining emotional, physical, and spiritual integrity.',
      image: '/src/assets/purity.jpg'
    },
    {
      id: 'identity',
      title: 'Identity in Christ',
      icon: '👑',
      verse: '2 Corinthians 5:17',
      description: 'Discovering who you are in Christ before seeking identity in relationships. We study how God sees us and how to build self-worth on His unchanging truth.',
      image: '/src/assets/identity.jpg'
    },
    {
      id: 'fashion',
      title: 'Modest Fashion',
      icon: '👗',
      verse: '1 Peter 3:3-4',
      description: 'Monthly workshops on dressing beautifully while honoring God. Learn how to express your personality through fashion that reflects inner godliness.',
      image: '/src/assets/fashion.jpg'
    },
    {
      id: 'fellowship',
      title: 'Sisterhood',
      icon: '👭',
      verse: 'Ecclesiastes 4:9-10',
      description: 'Building authentic Christian friendships that encourage spiritual growth. We organize retreats, Bible studies, and mentorship opportunities.',
      image: '/src/assets/fellowship.jpg'
    }
  ];

  const testimonies = [
    {
      quote: "Through this ministry, I've learned that my singleness is not a waiting period but a training ground for God's purpose.",
      author: "Abigail, 24"
    },
    {
      quote: "The purity teachings transformed how I view relationships. I now understand my worth in Christ first.",
      author: "Esi, 26"
    },
    {
      quote: "The fashion workshops showed me I can be stylish while honoring God with my clothing choices.",
      author: "Nana Ama, 22"
    }
  ];

  const galleryImages = [
    '/src/assets/young-singles-1.jpg',
    '/src/assets/young-singles-2.jpg',
    '/src/assets/young-singles-3.jpg',
    '/src/assets/young-singles-4.jpg'
  ];

  const upcomingEvents = [
    { title: 'Purity Conference', date: 'June 15, 3:00 PM', location: 'Church Auditorium', icon: '💒' },
    { title: 'Modest Fashion Workshop', date: 'June 22, 10:00 AM', location: 'Fellowship Hall', icon: '👗' },
    { title: 'Sisterhood Retreat', date: 'July 5-7', location: 'Prayer Camp', icon: '⛺' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 text-purple-900">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center bg-[url('/src/assets/young-singles.jpg')] bg-cover bg-center overflow-hidden">
  <div className="absolute inset-0 bg-purple-950/50"></div> {/* Dark overlay for contrast */}

  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
  >
    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
  <span style={{ textShadow: '0 0 10px #fff, 0 0 20px #9333ea' }} className="text-white">
    YOUNG
  </span>{' '}
  <span style={{ textShadow: '0 0 10px #9333ea, 0 0 20px #9333ea' }} className="text-purple-500">
    SINGLES
  </span>
</h1>

    <p className="text-xl md:text-2xl mb-8 text-white font-light max-w-2xl mx-auto">
      Cultivating purity, purpose, and godly femininity while we wait on the Lord
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      {/* Add buttons or links here if needed */}
    </div>
  </motion.div>

  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.8 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
  >
    <div className="animate-bounce">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </motion.div>
</header>


      {/* Mission Statement */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-800">OUR MISSION</h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed">
            <p className="mb-6">
              The Young Singles ministry exists to encourage unmarried women to remain focused on Christ, living pure and purposeful lives that glorify God. 
            </p>
            <p>
              We provide biblical teaching, practical guidance, and sisterly support to help young women navigate singleness with wisdom, maintain sexual purity, develop godly character, and prepare for future relationships according to God's perfect timing.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border border-purple-100"
          >
            <h3 className="text-2xl font-bold mb-4 text-pink-600">Our Core Values</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-pink-500 mr-3">❀</span>
                <span>Purity in thought, word, and action</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3">❀</span>
                <span>Contentment in Christ alone</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3">❀</span>
                <span>Biblical femininity</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-3">❀</span>
                <span>Authentic sisterhood</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border border-purple-100"
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-600">Upcoming Events</h3>
            <ul className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <li key={index} className="flex items-start border-b border-purple-100 pb-3">
                  
                  <div>
                    <h4 className="font-bold">{event.title}</h4>
                    <p className="text-sm text-purple-700">{event.date} | {event.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Teaching Topics */}
      <section className="py-12 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center text-purple-800"
          >
            OUR TEACHING TOPICS
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {topics.map(topic => (
              <motion.button
                key={topic.id}
                onClick={() => setActiveTab(topic.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === topic.id ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 hover:bg-purple-100'}`}
              >
                {topic.title}
              </motion.button>
            ))}
          </div>
          
          {topics.map(topic => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeTab === topic.id ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className={`${activeTab === topic.id ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    
                    <h3 className="text-2xl font-bold">{topic.title}</h3>
                  </div>
                  <p className="italic text-purple-600 mb-4">"{topic.verse}"</p>
                  <p className="text-lg mb-6">{topic.description}</p>
                  <button className="px-6 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition">
                    Learn More
                  </button>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-xl border-2 border-white"
                >
                  <img src={topic.image} alt={topic.title} className="w-full h-auto" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-purple-700 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-pink-200"
          >
            HEAR FROM OUR SISTERS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonies.map((testimony, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-purple-800 rounded-xl p-6 shadow-lg"
              >
                <div className="text-pink-200 text-4xl mb-4">"</div>
                <p className="italic mb-6">{testimony.quote}</p>
                <p className="font-bold text-pink-200">— {testimony.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center text-purple-800"
          >
            SISTERHOOD MOMENTS
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center text-purple-800"
        >
          OUR LEADERSHIP TEAM
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-purple-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/70 to-transparent p-4">
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-800">{member.name}</h3>
                <p className="text-pink-600 font-semibold mb-3">{member.role}</p>
                <p className="text-purple-700">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}