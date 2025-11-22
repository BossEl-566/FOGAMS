import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

// Import available images
import YouthWithPatron from '../assets/youth-with-patron.jpg';
import YouthMinistry from '../assets/Youth-Ministry.jpg';
import LinusAndCo from '../assets/Linus-and-Co.jpg';
import YouthDoingAct from '../assets/youth-doing-act.jpg';
import CynthiaBridget from '../assets/Cynthia-Bridget.jpg';
import FriendsPrinceAndCo from '../assets/Friends-Prince-and-co.jpg';
import AssembliesOfGodLogo from '../assets/assembliesOfGodLogo.png';
import Patron from '../assets/patron.jpg';
import Hawa from '../assets/Hawa.jpg';
import BraCann from '../assets/Bra-Cann.jpg';
import Cynthia from '../assets/Cynthia.jpg';
// Bridget image is missing, so we'll handle it as null

const YouthMin = () => {
  // Gallery images
  const galleryImages = [
    YouthWithPatron,
    YouthMinistry,
    LinusAndCo,
    YouthDoingAct,
    CynthiaBridget,
    FriendsPrinceAndCo,
  ];

  // Events data
  const upcomingEvents = [
    { title: "Weekly Youth Meeting", day: "Every Monday", time: "6:00 PM", location: "Church Hall" },
    { title: "Youth Camp", day: "Yearly", time: "All Day", location: "Campground" },
    { title: "Worship Night", day: "Yearly", time: "6:00 PM", location: "Church Hall" },
    { title: "Community Outreach & Evangelism", day: "Holidays", time: "9:00 AM", location: "Abura-Pedu Community" },
  ];

  // Leadership team
  const leadership = [
    { name: "Miss Hawawu Kassim", position: "President", image: Hawa },
    { name: "Mr. Amos Botchway", position: "Vice President", image: BraCann },
    { name: "Miss Cynthia Bawa", position: "Secretary", image: Cynthia },
    { name: "Miss Bridget Mawuli", position: "Treasurer", image: null }, // No image available
  ];

  // Handle image error
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    // Show fallback UI if there's a sibling element
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'flex';
    }
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900">
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Animated background elements - More dynamic */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-pink-500 mix-blend-screen opacity-25"
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div
            className="absolute top-1/3 right-1/3 w-56 h-56 rounded-full bg-blue-400 mix-blend-screen opacity-25"
            animate={{
              y: [0, 30, 0],
              x: [0, -30, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500 mix-blend-screen opacity-25"
            animate={{
              y: [0, 20, 0],
              x: [0, -20, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-yellow-400 mix-blend-screen opacity-20"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Church Logo and Name - Larger and more prominent */}
          <motion.div 
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={AssembliesOfGodLogo} 
              alt="FOGA Logo" 
              className="h-24 md:h-32 mb-4 drop-shadow-lg" 
            />
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white tracking-wide"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
                FOGA
              </span>
            </motion.h2>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            ></motion.div>
          </motion.div>
          
          {/* Main Heading with more dynamic animation */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 100
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 drop-shadow-2xl">
              YOUTH MINISTRY
            </span>
          </motion.h1>
          
          {/* Subheading with staggered letters */}
          <motion.p 
            className="text-lg md:text-xl text-white max-w-2xl mb-10 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.8
            }}
          >
            Where faith meets fun! Join our vibrant community of young believers growing together.
          </motion.p>
          
          {/* CTA Button with pulse animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ 
              duration: 0.5,
              delay: 1,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          </motion.div>

          {/* Scrolling indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg className="w-8 h-8 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* About Section - Light */}
      <section className="py-20 px-4 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/3 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-white rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={Patron} 
                  alt="Youth Ministry Leader" 
                  className="w-full h-auto object-cover"
                  onError={handleImageError}
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-purple-600">Deacon Dr. Justice G.K.A. Boateng</h3>
                  <p className="text-gray-600">Youth Ministry Patron</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  About Our Youth Ministry
                </span>
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                Our youth ministry is a dynamic community where young people from all backgrounds come together to grow in faith, build meaningful relationships, and discover their purpose in Christ. We create a safe space for teens and young adults to ask questions, explore faith, and have fun along the way!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-pink-500 shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Our Vision</h3>
                  <p className="text-gray-600">To empower the next generation to live boldly for Christ in their schools, homes, and communities.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Our Mission</h3>
                  <p className="text-gray-600">To disciple youth through biblical teaching, authentic relationships, and life-changing experiences.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team - Light */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                Our Leadership Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated team leading our youth ministry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  {leader.image ? (
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{leader.name}</h3>
                  <p className="text-purple-600 font-medium">{leader.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - Dark */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-800 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                Upcoming Events
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join us for these exciting events designed just for youth!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-gray-300">{event.day}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-gray-300">{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span className="text-gray-300">{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - Light */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Watch Our Latest Gathering
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the energy of our youth worship and teaching!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
            style={{ height: '600px' }} // Increased height
          >
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/watch?v=Y4nSgyOfONU" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Dark with Slider */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-800 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                Photo Gallery
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Check out moments from our recent events and gatherings
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {galleryImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="overflow-hidden rounded-xl shadow-lg cursor-pointer h-96">
                    <div className="relative h-full group">
                      <img 
                        src={image} 
                        alt={`Youth ministry event ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Dark */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-800 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Join Our Youth Community?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Whether you're new to faith or looking to grow deeper, we'd love to have you!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact-us" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-white text-white font-bold rounded-full shadow-lg"
                >
                  Contact Our Team
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default YouthMin;