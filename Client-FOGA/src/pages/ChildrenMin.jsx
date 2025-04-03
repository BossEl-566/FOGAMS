import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'flowbite-react'; // Using Flowbite's Carousel instead
import { Modal, Timeline, Card } from 'flowbite-react'

export default function ChildrenMin() {
  const [activeTab, setActiveTab] = useState('about');
  const [showVideo, setShowVideo] = useState(false);

  const galleryImages = [
    '/images/children1.jpg',
    '/images/children2.jpg',
    '/images/children3.jpg',
    '/images/children4.jpg',
    '/images/children5.jpg',
  ];

  const events = [
    { id: 1, title: "Sunday School", day: "Every Sunday", time: "9:00 AM - 10:30 AM", description: "Fun Bible lessons, songs, and activities" },
    { id: 2, title: "Children's Choir Rehearsal", day: "Wednesdays", time: "4:30 PM - 5:30 PM", description: "Learn joyful songs to praise the Lord" },
    { id: 3, title: "Vacation Bible School", day: "July 10-14", time: "9:00 AM - 12:00 PM", description: "Summer fun with Bible stories, crafts, and games" },
    { id: 4, title: "Children's Camp", day: "August 5-7", time: "Overnight", description: "Nature, worship, and friendship at our annual camp" },
  ];

  const teamMembers = [
    { name: "Pastor Sarah Johnson", role: "Children's Ministry Director", image: "/images/pastor-sarah.jpg" },
    { name: "Brother Michael Lee", role: "Sunday School Teacher", image: "/images/teacher-michael.jpg" },
    { name: "Sister Emily Chen", role: "Music Coordinator", image: "/images/teacher-emily.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-500 to-pur-600 text-white py-16 px-4 text-center overflow-hidden border-b-8 border-yellow-300"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Kids For Christ</h1>
          <p className="text-xl md:text-2xl mb-8">Where faith and fun come together!</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-300 text-gray-800 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-400 transition-colors"
            onClick={() => setActiveTab('events')}
          >
            Join Our Next Event
          </motion.button>
        </div>
        
        {/* Floating Balloons */}
        <div className="absolute top-1/4 left-1/10 w-20 h-24 bg-pink-300 rounded-full opacity-70 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/6 w-16 h-20 bg-teal-200 rounded-full opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/5 left-1/5 w-18 h-22 bg-green-200 rounded-full opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex justify-center bg-white shadow-md mb-8 flex-wrap">
        <button 
          className={`px-6 py-4 font-bold ${activeTab === 'about' ? 'text-red-400 border-b-4 border-red-400' : 'text-blue-700'}`}
          onClick={() => setActiveTab('about')}
        >
          About Us
        </button>
        <button 
          className={`px-6 py-4 font-bold ${activeTab === 'gallery' ? 'text-red-400 border-b-4 border-red-400' : 'text-blue-700'}`}
          onClick={() => setActiveTab('gallery')}
        >
          Photo Gallery
        </button>
        <button 
          className={`px-6 py-4 font-bold ${activeTab === 'events' ? 'text-red-400 border-b-4 border-red-400' : 'text-blue-700'}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button 
          className={`px-6 py-4 font-bold ${activeTab === 'team' ? 'text-red-400 border-b-4 border-red-400' : 'text-blue-700'}`}
          onClick={() => setActiveTab('team')}
        >
          Our Team
        </button>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4">
        {/* About Section */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Welcome to Our Children's Ministry!</h2>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              At [Church Name], we believe children are a precious gift from God. Our ministry provides 
              a safe, fun environment where kids can learn about Jesus and grow in faith through 
              age-appropriate Bible lessons, worship, and activities designed just for them!
            </p>
            
            <div 
              className="max-w-2xl mx-auto relative cursor-pointer rounded-xl overflow-hidden shadow-xl mb-12"
              onClick={() => setShowVideo(true)}
            >
              <img src="/images/video-thumbnail.jpg" alt="Children's ministry video" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-red-500 ml-1"></div>
                </div>
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white py-3 px-4">Watch our ministry in action!</p>
            </div>

            {showVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                <div className="relative max-w-4xl w-full">
                  <button 
                    className="absolute -top-10 right-0 text-white text-3xl"
                    onClick={() => setShowVideo(false)}
                  >
                    ×
                  </button>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/your-video-id" 
                      title="Children's Ministry Video" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-blue-800 mb-8">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✝️</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Faith</h4>
                  <p className="text-gray-600">Teaching Biblical truths in creative ways</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Fun</h4>
                  <p className="text-gray-600">Learning through games, music and activities</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👫</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Friendship</h4>
                  <p className="text-gray-600">Building Christ-centered relationships</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Section */}
        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-8"
          >
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-4">Photo Gallery</h2>
            <p className="text-lg text-center mb-8 max-w-2xl mx-auto">See the fun we have learning about Jesus!</p>
            
            <div className="max-w-3xl mx-auto mb-12 rounded-xl overflow-hidden shadow-xl">
              <Carousel 
                showArrows={true} 
                infiniteLoop={true} 
                autoPlay={true} 
                interval={5000}
                showThumbs={false}
              >
                {galleryImages.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Children's ministry activity ${index + 1}`} className="w-full h-96 object-cover" />
                  </div>
                ))}
              </Carousel>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {galleryImages.map((image, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-lg overflow-hidden shadow-md cursor-pointer"
                >
                  <img src={image} alt={`Gallery thumbnail ${index + 1}`} className="w-full h-40 object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Events Section */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-8"
          >
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-4">Upcoming Events</h2>
            <p className="text-lg text-center mb-8 max-w-2xl mx-auto">Join us for these exciting activities!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {events.map(event => (
                <motion.div 
                  key={event.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="bg-blue-700 text-white p-4 flex flex-col items-center justify-center min-w-24">
                    <div className="text-2xl font-bold">{event.day.split(' ')[0]}</div>
                    {event.day.includes(' ') && <div className="text-sm">{event.day.split(' ').slice(1).join(' ')}</div>}
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{event.time}</p>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800 transition-colors">
                      Register Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-blue-50 border-2 border-dashed border-blue-700 rounded-xl p-8 mt-12 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Annual Children's Camp</h3>
              <p className="text-lg mb-2">August 5-7 at Pine Ridge Retreat Center</p>
              <p className="text-gray-700 mb-6">Three days of outdoor adventures, Bible stories, worship, and making new friends!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors"
              >
                Learn More About Camp
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Team Section */}
        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-8"
          >
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-4">Meet Our Team</h2>
            <p className="text-lg text-center mb-8 max-w-2xl mx-auto">Our dedicated leaders who make children's ministry special</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow-md p-6 text-center"
                >
                  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-100 mx-auto mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 italic mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">
                    {member.name.split(' ')[0]} has been serving in children's ministry for {index + 3} years and 
                    loves helping kids grow in their faith.
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 mt-12 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Want to Join Our Team?</h3>
              <p className="text-gray-700 mb-6">We're always looking for loving volunteers to help with our children's programs!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-800 transition-colors"
              >
                Volunteer Today
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer with Animation */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-blue-700 text-white py-12 px-4 mt-12"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <p className="mb-2">children@church.org</p>
            <p>(123) 456-7890</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Sunday Services</h4>
            <p className="mb-2">Children's Church: 11:00 AM</p>
            <p>Sunday School: 9:30 AM</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Location</h4>
            <p className="mb-2">123 Faith Avenue</p>
            <p>City, State 12345</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-blue-600 text-center">
          <p>© {new Date().getFullYear()} [Church Name] Children's Ministry</p>
        </div>
      </motion.footer>
    </div>
  );
}