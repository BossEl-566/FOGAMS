import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Import available images
import FrancisAnsah from '../assets/Francis-Ansah.jpg';
import MDJosephine from '../assets/MD-josephine.jpg';
import Benjamin from '../assets/Benjamin.jpg';
import Mottey from '../assets/mottey.jpg';
import MusicMinistry from '../assets/Music-ministry.jpg';
import Thelma from '../assets/thelma.jpg';
import ActorsOfFaith from '../assets/Actors-of-Faith.jpg';
import CreativeVisuals from '../assets/creative-visuals.jpg';
import Trumpet from '../assets/trumpet.jpg';
import Ministries31 from '../assets/Ministries31.jpg';
import Voices from '../assets/voices.jpg';
import ActorsDisplay from '../assets/actors-display.jpg';

export default function DepCreativeArt() {
  const [activeTab, setActiveTab] = useState('music');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Handle image error
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    // Create fallback background
    e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
    
    const fallbackText = document.createElement('div');
    fallbackText.className = 'text-white text-center p-4';
    fallbackText.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="text-sm">Image not available</span>
    `;
    e.target.parentElement.appendChild(fallbackText);
  };

  // Team Members Data
  const teamMembers = [
    {
      name: 'MR. FRANCIS ANSAH',
      role: 'PRESIDENT',
      image: FrancisAnsah,
      bio: 'Visionary leader with 10+ years experience in creative arts ministry.',
    },
    {
      name: 'MRS. JOSEPHINE ANNAN',
      role: 'MUSIC DIRECTOR',
      image: MDJosephine,
      bio: 'Classically trained musician who directs our Voices of Grace choir.',
    },
    {
      name: 'MR. BENJAMIN KUMI OSEI',
      role: 'SECRETARY',
      image: Benjamin,
      bio: 'Keeps our creative operations running smoothly behind the scenes.',
    },
    {
      name: 'MRS MABEL MORTTEY',
      role: 'TREASURER',
      image: Mottey,
      bio: 'Ensures our creative visions are financially sustainable.',
    }
  ];

  // Departments Data
  const departments = [
    {
      id: 'music',
      title: 'Voices of Grace',
      icon: '🎵',
      description: 'Our award-winning choir blends contemporary gospel with traditional hymns to create powerful worship experiences. With vocal ranges from soprano to bass, we minister through song at services and special events.',
      image: MusicMinistry,
      schedule: 'Tuesdays, 6:00 PM - 8:00 PM'
    },
    {
      id: 'dance',
      title: 'Grace Motion',
      icon: '💃',
      description: 'Expressing worship through movement, our dance team incorporates liturgical, contemporary, and African dance styles. We believe the body is an instrument of praise and use choreography to tell God\'s stories.',
      image: Thelma,
      schedule: 'Saturday, 6:00 PM - 8:00 PM'
    },
    {
      id: 'drama',
      title: 'Actors of Faith',
      icon: '🎭',
      description: 'Through sketches, plays, and dramatic readings, we bring biblical truths to life. Our team specializes in improvisation, scripted performances, and interactive theater that engages congregations.',
      image: ActorsOfFaith,
      schedule: 'Saturday, 6:00 PM - 8:30 PM'
    },
    {
      id: 'media',
      title: 'Creative Visuals',
      icon: '🎥',
      description: 'From stage design to video production, we enhance worship through visual arts. Our team handles lighting, projections, photography, and graphic design to create immersive worship environments.',
      image: CreativeVisuals,
      schedule: 'Saturdays, 6:00 PM - 8:00 PM'
    }
  ];

  // Gallery Images
  const galleryImages = [
    Trumpet,
    Ministries31,
    Voices,
    ActorsOfFaith,
    ActorsDisplay,
  ];

  // Rehearsal Schedule
  const rehearsalSchedule = [
    { team: 'Voices of Grace', day: 'Tuesday', time: '6:00 PM - 8:00 PM' },
    { team: 'Choreography Team', day: 'Saturday', time: '6:00 PM - 8:00 PM' },
    { team: 'Drama Team', day: 'Saturday', time: '6:00 PM - 8:00 PM' },
    { team: 'Combined Rehearsal', day: 'Saturday', time: '6:00 PM - 8:00 PM' },
  ];

  // Upcoming Events
  const upcomingEvents = [
    { title: 'Ose Ayeyi', date: 'January, 6:00 PM', location: 'Main Sanctuary', icon: '🎵' },
    { title: 'Sacred Dance Workshop', date: 'January, 6:00 PM', location: 'Fellowship Hall', icon: '💃' },
    { title: 'Drama Ministry Auditions', date: 'January, 6:00 PM', location: 'Creative Arts Center', icon: '🎭' },
  ];

  // Toggle video mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Auto-rotate gallery images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Video Background */}
      <header className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/creative-arts-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-center px-4">
          {/* Mute/Unmute Button */}
          <button 
            onClick={toggleMute}
            className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-3 z-10"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-yellow-300 drop-shadow-lg">
              CREATIVE ARTS
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white font-light drop-shadow-md">
              Where Worship Meets Creativity in Divine Expression
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full shadow-lg"
              >
                Join Our Team
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-3 bg-transparent border-2 border-white font-bold rounded-full shadow-lg flex items-center"
              >
                Watch Performance <span className="ml-2">▶</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </header>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-yellow-400"
            >
              ✕
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                className="w-full h-96"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1" 
                title="Creative Arts Performance" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">OUR CREATIVE MISSION</h2>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed">
            <p className="mb-6">
              The Creative Arts Department exists to glorify God through artistic excellence, using our talents in music, dance, drama, and visual arts to usher the congregation into authentic worship experiences.
            </p>
            <p>
              We believe creativity is a gift from God and strive to create spaces where artists of all ages can develop their gifts while serving the church community. Our teams collaborate to produce dynamic worship services, special events, and outreach programs that connect people to Christ through the arts.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Why Join Creative Arts?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✦</span>
                <span>Develop your God-given artistic talents</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✦</span>
                <span>Be part of a vibrant creative community</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✦</span>
                <span>Use your gifts to impact lives for Christ</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✦</span>
                <span>Opportunities for training and growth</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-900 to-purple-900 rounded-xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Upcoming Events</h3>
            <ul className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <li key={index} className="flex items-start border-b border-purple-700 pb-3">
                  <span className="text-yellow-400 mr-3">{event.icon}</span>
                  <div>
                    <h4 className="font-bold">{event.title}</h4>
                    <p className="text-sm">{event.date} | {event.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Departments Tabs */}
      <section className="py-12 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center text-yellow-400"
          >
            OUR CREATIVE TEAMS
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {departments.map(dept => (
              <motion.button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === dept.id ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <span className="mr-2">{dept.icon}</span> {dept.title}
              </motion.button>
            ))}
          </div>
          
          {departments.map(dept => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeTab === dept.id ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className={`${activeTab === dept.id ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{dept.title} {dept.icon}</h3>
                  <p className="text-lg mb-6">{dept.description}</p>
                  <div className="bg-gray-800 p-4 rounded-lg inline-block">
                    <p className="font-semibold">Rehearsal Schedule: <span className="text-yellow-400">{dept.schedule}</span></p>
                  </div>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-2xl border-2 border-yellow-500"
                >
                  <img 
                    src={dept.image} 
                    alt={dept.title} 
                    className="w-full h-auto"
                    onError={handleImageError}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-black bg-opacity-30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center text-pink-400"
          >
            OUR GALLERY
          </motion.h2>
          
          <motion.div 
            className="relative h-96 w-full rounded-xl overflow-hidden shadow-2xl mb-8"
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={galleryImages[currentImageIndex]} 
              alt="Gallery" 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-2xl font-bold">Ministry in Action</h3>
            </div>
          </motion.div>
          
          <div className="flex justify-center space-x-4">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-yellow-400' : 'bg-purple-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rehearsal Schedule */}
      <section className="py-16 px-4 bg-black bg-opacity-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ rotate: -2, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center text-green-300"
          >
            REHEARSAL SCHEDULE
          </motion.h2>
          
          <div className="grid gap-6">
            {rehearsalSchedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-300">{item.team}</h3>
                    <p className="text-purple-100">{item.day}s</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-xl font-semibold bg-black bg-opacity-40 px-4 py-2 rounded-full">
                      {item.time}
                    </p>
                  </div>
                </div>
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
          className="text-3xl font-bold mb-12 text-center text-yellow-400"
        >
          MEET OUR LEADERS
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="text-3xl">{member.symbol}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-yellow-300">{member.name}</h3>
                <p className="text-purple-300 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
