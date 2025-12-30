import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import SkeletonLoader from '../components/SkeletonLoader';
import {HiOutlineCalendar} from 'react-icons/hi';

// Import your images
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpg';
import themeflier from "../assets/theme-2026.jpeg"
import dailybible from "../assets/daily-bible.jpg"
import dawn from "../assets/dawn-service.jpg"
import family from "../assets/family-service.jpg"
import youth from "../assets/youth-service.jpg"
import midweekdawn from "../assets/dawn-prayers.jpg"
import biblestudy from "../assets/bible-study.jpg"
import helpline from "../assets/help-line.jpg"
import prayerservice from "../assets/prayer-service.jpg"
import { Link } from 'react-router-dom';
import { HiLocationMarker, HiOutlineSparkles, HiOutlineHeart, HiOutlineClock, HiOutlineUserGroup } from 'react-icons/hi';
import { FaPray, FaChurch, FaBible, FaHandsHelping } from 'react-icons/fa';

export default function Home() {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [events, setEvents] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [message, setMessage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Mouse move effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fundamental truths states
  const [showAllTruths, setShowAllTruths] = useState(false);
  
  // All 16 fundamental truths
  const truths = [
    {
      title: "The Scriptures Inspired",
      summary: "The Bible is the inspired Word of God, the product of holy men who spoke as they were moved by the Holy Spirit.",
      scripture: "2 Timothy 3:16-17 - 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.'",
      icon: <FaBible className="text-blue-500" />
    },
    {
      title: "The One True God",
      summary: "There is one true God revealed as Father, Son, and Holy Spirit.",
      scripture: "Deuteronomy 6:4 - 'Hear, O Israel: The Lord our God, the Lord is one.' Matthew 28:19 - 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.'",
      icon: <FaChurch className="text-blue-500" />
    },
    {
      title: "The Deity of the Lord Jesus Christ",
      summary: "The Lord Jesus Christ is the eternal Son of God who became man without ceasing to be God.",
      scripture: "John 1:1,14 - 'In the beginning was the Word, and the Word was with God, and the Word was God... The Word became flesh and made his dwelling among us.' Philippians 2:6-7 - 'Who, being in very nature God, did not consider equality with God something to be used to his own advantage; rather, he made himself nothing by taking the very nature of a servant.'",
      icon: <HiOutlineHeart className="text-red-500" />
    },
    {
      title: "The Fall of Man",
      summary: "Man was created good and upright but fell into sin through voluntary disobedience.",
      scripture: "Genesis 1:26-27 - 'Then God said, Let us make mankind in our image, in our likeness... Genesis 3:6 - 'When the woman saw that the fruit of the tree was good for food and pleasing to the eye, and also desirable for gaining wisdom, she took some and ate it.'",
      icon: <FaHandsHelping className="text-amber-500" />
    },
    {
      title: "The Salvation of Man",
      summary: "Man's only hope of redemption is through the shed blood of Jesus Christ.",
      scripture: "Ephesians 2:8-9 - 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.' Romans 10:9 - 'If you declare with your mouth, Jesus is Lord, and believe in your heart that God raised him from the dead, you will be saved.'",
      icon: <HiOutlineSparkles className="text-purple-500" />
    },
    {
      title: "The Ordinances of the Church",
      summary: "Water baptism and Holy Communion are ordinances to be observed by the Church.",
      scripture: "Matthew 28:19 - 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.' 1 Corinthians 11:26 - 'For whenever you eat this bread and drink this cup, you proclaim the Lord's death until he comes.'",
      icon: <FaPray className="text-cyan-500" />
    },
    {
      title: "The Baptism in the Holy Spirit",
      summary: "All believers are entitled to the baptism in the Holy Spirit with the initial sign of speaking in tongues.",
      scripture: "Acts 2:4 - 'All of them were filled with the Holy Spirit and began to speak in other tongues as the Spirit enabled them.' Acts 1:8 - 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses.'",
      icon: <HiOutlineSparkles className="text-yellow-500" />
    },
    {
      title: "The Initial Physical Evidence",
      summary: "The baptism of believers in the Holy Spirit is witnessed by the initial physical sign of speaking in tongues.",
      scripture: "Acts 10:45-46 - 'The circumcised believers who had come with Peter were astonished that the gift of the Holy Spirit had been poured out even on Gentiles. For they heard them speaking in tongues and praising God.' Acts 19:6 - 'When Paul placed his hands on them, the Holy Spirit came on them, and they spoke in tongues and prophesied.'",
      icon: <HiOutlineUserGroup className="text-green-500" />
    },
    {
      title: "Sanctification",
      summary: "Sanctification is an act of separation from evil and dedication to God.",
      scripture: "1 Thessalonians 4:3 - 'It is God's will that you should be sanctified: that you should avoid sexual immorality.' Hebrews 12:14 - 'Make every effort to live in peace with everyone and to be holy; without holiness no one will see the Lord.'",
      icon: <HiOutlineHeart className="text-pink-500" />
    },
    {
      title: "The Church and Its Mission",
      summary: "The Church is the Body of Christ with a divine mission to reach the lost.",
      scripture: "Ephesians 1:22-23 - 'And God placed all things under his feet and appointed him to be head over everything for the church, which is his body.' Matthew 28:19-20 - 'Therefore go and make disciples of all nations...teaching them to obey everything I have commanded you.'",
      icon: <FaChurch className="text-indigo-500" />
    },
    {
      title: "The Ministry",
      summary: "A divinely called and scripturally ordained ministry serves the Church.",
      scripture: "Ephesians 4:11-12 - 'So Christ himself gave the apostles, the prophets, the evangelists, the pastors and teachers, to equip his people for works of service.' 1 Timothy 3:1 - 'Here is a trustworthy saying: Whoever aspires to be an overseer desires a noble task.'",
      icon: <FaHandsHelping className="text-teal-500" />
    },
    {
      title: "Divine Healing",
      summary: "Deliverance from sickness is provided for in the atonement.",
      scripture: "Isaiah 53:4-5 - 'Surely he took up our pain and bore our suffering...by his wounds we are healed.' James 5:14-15 - 'Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord.'",
      icon: <HiOutlineHeart className="text-rose-500" />
    },
    {
      title: "The Blessed Hope",
      summary: "The resurrection of those who have fallen asleep in Christ and their rapture is the imminent blessed hope.",
      scripture: "1 Thessalonians 4:16-17 - 'For the Lord himself will come down from heaven...and the dead in Christ will rise first. After that, we who are still alive will be caught up together with them in the clouds to meet the Lord in the air.' Titus 2:13 - 'While we wait for the blessed hope—the appearing of the glory of our great God and Savior, Jesus Christ.'",
      icon: <HiOutlineSparkles className="text-amber-500" />
    },
    {
      title: "The Millennial Reign",
      summary: "The second coming of Christ includes the rapture and a millennial reign on earth.",
      scripture: "Revelation 20:6 - 'Blessed and holy are those who share in the first resurrection...they will reign with him a thousand years.' Zechariah 14:9 - 'The Lord will be king over the whole earth. On that day there will be one Lord, and his name the only name.'",
      icon: <FaChurch className="text-blue-500" />
    },
    {
      title: "The Final Judgment",
      summary: "There will be a final judgment in which the wicked will be raised and judged.",
      scripture: "Revelation 20:12-13 - 'And I saw the dead, great and small, standing before the throne, and books were opened...The dead were judged according to what they had done.' Matthew 25:46 - 'Then they will go away to eternal punishment, but the righteous to eternal life.'",
      icon: <FaBible className="text-gray-500" />
    },
    {
      title: "The New Heavens and New Earth",
      summary: "We look forward to the new heavens and new earth where righteousness dwells.",
      scripture: "2 Peter 3:13 - 'But in keeping with his promise we are looking forward to a new heaven and a new earth, where righteousness dwells.' Revelation 21:1 - 'Then I saw a new heaven and a new earth, for the first heaven and the first earth had passed away.'",
      icon: <HiOutlineSparkles className="text-sky-500" />
    }
  ];

  const initialTruths = truths.slice(0, 4);
  const [displayedTruths, setDisplayedTruths] = useState(initialTruths);
  const [hoveredTruth, setHoveredTruth] = useState(null);

  const toggleShowAllTruths = () => {
    if (showAllTruths) {
      setDisplayedTruths(initialTruths);
    } else {
      setDisplayedTruths(truths);
    }
    setShowAllTruths(!showAllTruths);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/event/get');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("/api/get-daily-bible-message");
        const data = await response.json();
        const messages = data.dailyBibleMessage;

        if (messages && messages.length > 0) {
          const latest = messages[0];
          setMessage(latest);
        }
      } catch (err) {
        console.error("Error fetching daily message:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  if (loading || !message) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <SkeletonLoader />
      </div>
    );
  }
 
  const date = new Date(message.createdAt);
  const formattedDate = date.toLocaleString("default", {
    month: "short",
    day: "numeric",
  }).toUpperCase();

  // Enhanced Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    arrows: false,
    pauseOnHover: true,
    pauseOnFocus: true,
    dotsClass: "slick-dots !bottom-8",
    appendDots: dots => (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ul className="flex space-x-3"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300 cursor-pointer"></div>
    )
  };

  const slides = [
    {
      image: slide1,
      title: "Welcome to Our Community",
      subtitle: "2026 | New Beginnings",
      text: "Join us in worship and fellowship every Sunday",
      color: "from-blue-600/90 to-purple-600/90"
    },
    {
      image: slide2,
      title: "Deepen Your Faith",
      subtitle: "Grow in Grace",
      text: "Weekly Bible study groups for all ages",
      color: "from-emerald-600/90 to-cyan-600/90"
    },
    {
      image: slide3,
      title: "Serve With Purpose",
      subtitle: "Make a Difference",
      text: "Find your place in our ministry teams",
      color: "from-amber-600/90 to-orange-600/90"
    },
    {
      image: slide4,
      title: "Children's Ministry",
      subtitle: "Future Generation",
      text: "A safe and fun environment for kids",
      color: "from-rose-600/90 to-pink-600/90"
    }
  ];

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Stats data
  const stats = [
    { label: "Weekly Attendees", value: "200+", change: "+12%" },
    { label: "Community Impact", value: "12+", change: "Projects" },
    { label: "Small Groups", value: "28", change: "Active" },
    { label: "Years Serving", value: "26+", change: "Since 1998" }
  ];

  return (
    <div className="w-full overflow-hidden relative bg-gradient-to-b from-gray-50 to-white" ref={containerRef}>
      {/* Animated Background Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-purple-50/20"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-blue-300/30 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh'],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Hero Carousel Section - Enhanced */}
      <div className="h-screen relative overflow-hidden">
        <Slider {...settings} className="w-full h-full" ref={sliderRef}>
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-screen">
              <motion.div 
                className="absolute inset-0"
                style={{
                  scale: scale,
                  y: y
                }}
              >
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover select-none"
                  style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} mix-blend-multiply`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </motion.div>
              
              {/* Floating Elements */}
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ 
                      y: [0, 30, 0],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 5,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                    }}
                  />
                ))}
              </div>

              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pointer-events-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="container mx-auto max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="inline-block mb-4"
                  >
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium border border-white/20">
                      {slide.subtitle}
                    </span>
                  </motion.div>
                  
                  <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                    {slide.title.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="inline-block mr-4"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h2>
                  
                  <motion.p 
                    className="text-2xl md:text-3xl text-white/90 mb-12 font-light max-w-2xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {slide.text}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <Link to="/how-to-join-us">
                      <motion.button
                        className="px-10 py-5 bg-white text-gray-900 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 pointer-events-auto group relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center">
                          Join Our Community
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                    </Link>
                    
                    <Link to="/visit">
                      <motion.button
                        className="px-10 py-5 bg-transparent text-white rounded-2xl text-lg font-semibold border-2 border-white/30 hover:border-white/60 backdrop-blur-sm transition-all duration-300 pointer-events-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Plan Your Visit
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Stats Bar */}
      <motion.div 
        className="w-full bg-gradient-to-r from-white via-blue-50/50 to-white backdrop-blur-xl border-y border-gray-200/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-blue-500 font-semibold">{stat.change}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Theme of the Year Section - Redesigned */}
      <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            {/* Flier Image with Floating Effect */}
            <div className="w-full lg:w-1/2 relative">
              <motion.div
                initial={{ rotateY: -30, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                // transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-200/50 bg-white/20 backdrop-blur-sm">
                  <img 
                    src={themeflier}
                    alt="2026 Church Theme: The Faith of our Fathers"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"></div>
              </motion.div>
            </div>

            {/* Theme Content */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
                  <HiOutlineSparkles className="w-4 h-4 text-white mr-2" />
                  <span className="text-white text-sm font-semibold tracking-wider">OUR 2026 THEME</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                  The Faith
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    of our Fathers
                  </span>
                </h2>
                
                <div className="relative mb-10">
                  <div className="absolute -left-4 top-1/2 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 -translate-y-1/2"></div>
                  <blockquote className="text-2xl text-gray-700 italic pl-8 border-l-4 border-blue-200/50">
                    "Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you."
                    <div className="text-right text-blue-600 mt-4 font-medium text-lg">Jude 1/ John 14:12</div>
                  </blockquote>
                </div>

                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  This year, we're committing to a lifestyle of persistent prayer that unlocks God's supernatural power in our lives, families, and community. Join us as we seek God's face continually and expect miraculous manifestations of His presence.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/prayer-groups">
                    <motion.button
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center">
                        Join Prayer Groups
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </motion.button>
                  </Link>
                  <Link to="/prayer-guide">
                    <motion.button
                      className="px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download Prayer Guide
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fundamental Truths Section - Enhanced */}
      <section className="w-full py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-6 border border-blue-200/50">
              <span className="text-blue-600 text-sm font-semibold tracking-wider">FOUNDATIONAL BELIEFS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Fundamental Truths
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The 16 foundational beliefs that guide our faith and practice in 2026
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedTruths.map((truth, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredTruth(index)}
                onMouseLeave={() => setHoveredTruth(null)}
                className={`relative group cursor-pointer transition-all duration-500 ${expandedCard === index ? 'md:col-span-2' : ''}`}
                onClick={() => toggleCard(index)}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${hoveredTruth === index ? 'opacity-30' : ''}`}></div>
                
                <div className={`relative bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden transition-all duration-500 h-full ${hoveredTruth === index ? 'shadow-2xl' : 'shadow-lg'}`}>
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex items-start mb-6">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200/50 flex items-center justify-center mr-4 transition-all duration-300 ${hoveredTruth === index ? 'scale-110' : ''}`}>
                        <div className="text-2xl">
                          {truth.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="text-blue-600 text-sm font-bold bg-blue-50 px-3 py-1 rounded-full mr-3">
                            {showAllTruths ? `TRUTH ${index + 1}` : `TRUTH ${initialTruths.findIndex(t => t.title === truth.title) + 1}`}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {truth.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                      {truth.summary}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 font-medium">Click to expand</span>
                      <motion.div
                        animate={{ rotate: expandedCard === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-t border-gray-200/50 p-8">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 text-blue-500 text-2xl mr-4">✝</div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                Scripture Reference
                                <span className="ml-2 text-sm font-normal text-blue-500 bg-blue-50 px-2 py-1 rounded">
                                  KJV
                                </span>
                              </h4>
                              <p className="text-gray-700 italic leading-relaxed bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50">
                                {truth.scripture}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16 space-y-8"
          >
            {/* Toggle Button */}
            <motion.button 
              onClick={toggleShowAllTruths}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                {showAllTruths ? (
                  <>
                    Show Less Truths
                    <svg className="w-5 h-5 ml-2 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Explore All {truths.length} Fundamental Truths
                    <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>

            {/* External Link */}
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <a 
                href="https://ag.org/beliefs/statement-of-fundamental-truths" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors inline-flex items-center group"
              >
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Learn More About Our Beliefs on AG.org
                </span>
                <svg className="w-4 h-4 ml-2 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events & Daily Bible Message Section - Enhanced */}
      <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Upcoming Events Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-full mb-4 border border-blue-200/50">
                  <HiOutlineCalendar className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-blue-600 text-sm font-semibold tracking-wider">UPCOMING GATHERINGS</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Join Our Next
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                    Community Events
                  </span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-6"></div>
                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                  Be part of these special gatherings and experience God's transformative presence in community
                </p>
              </motion.div>

              {loading ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <p className="text-red-500">Error loading events: {error}</p>
                </div>
              ) : events.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {events.data.slice(0, 4).map((event, index) => {
                    const eventDate = new Date(event.date);
                    const day = eventDate.getDate();
                    const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                    const time = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                      <motion.div
                        key={event._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        className="group"
                      >
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 h-full transition-all duration-500 hover:shadow-2xl">
                          <div className="relative h-48 overflow-hidden">
                            <motion.img 
                              src={event.image || slide1} 
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-4 left-4">
                              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                                <div className="font-bold text-2xl text-gray-900">{day}</div>
                                <div className="text-xs text-gray-600 font-semibold">{month}</div>
                              </div>
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                                {time}
                              </span>
                            </div>
                          </div>
                          <div className="p-8">
                            <div className="flex items-center mb-4">
                              <HiLocationMarker className="w-5 h-5 text-blue-500 mr-2" />
                              <p className="text-blue-600 font-medium">{event.location}</p>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                              {event.description}
                            </p>
                            <Link to={`/events/${event._id}`} state={{ eventId: event._id }}>
                              <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center group">
                                <span className="mr-2">Learn More</span>
                                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* View All Events Button */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 text-center mt-8"
                  >
                    <Link to="/events">
                      <motion.button
                        className="px-8 py-4 bg-gradient-to-r from-white to-gray-50 border-2 border-blue-200 text-blue-600 hover:text-blue-700 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="flex items-center justify-center">
                          View All Upcoming Events
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HiOutlineCalendar className="w-10 h-10 text-blue-500" />
                  </div>
                  <p className="text-gray-600 text-lg">No upcoming events scheduled</p>
                </div>
              )}
            </div>

            {/* Daily Bible Message Column - Enhanced */}
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 h-full backdrop-blur-sm">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={message.image || dailybible}
                      alt="Daily Bible Message"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                        <span className="text-white text-sm font-semibold tracking-wider">DAILY DEVOTIONAL</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-2">Today's Word</h3>
                      <p className="text-white/90">Spiritual nourishment for your day</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl px-4 py-3 text-center mr-4">
                          <div className="font-bold text-2xl text-white">{formattedDate.split(' ')[1]}</div>
                          <div className="text-xs text-white/90 font-medium">{formattedDate.split(' ')[0]}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 font-medium">Category</div>
                          <div className="text-blue-600 font-semibold">{message.category}</div>
                        </div>
                      </div>
                      <HiOutlineSparkles className="w-8 h-8 text-yellow-500" />
                    </div>

                    <h4 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                      {message.title}
                    </h4>

                    <div 
                      className="text-gray-600 mb-8 leading-relaxed prose prose-lg max-w-none line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold">A</span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Shared by</div>
                          <div className="font-semibold text-gray-900">Admin</div>
                        </div>
                      </div>
                      <Link to={`/daily-bible-message/${message.slug}`}>
                        <motion.button
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read Full
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Services Section - Enhanced */}
      <section className="w-full py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-amber-500/10 rounded-full mb-6 border border-blue-200/50">
              <HiOutlineClock className="w-4 h-4 text-amber-600 mr-2" />
              <span className="text-amber-600 text-sm font-semibold tracking-wider">WORSHIP SCHEDULE</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Weekly Services
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join us as we worship, grow, and experience God's transformative presence together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sunday Services */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Sunday Services</h3>
              </div>
              
              {[
                { img: dawn, time: "6:30 AM", title: "Glory Service", desc: "Early morning worship for those who seek God at sunrise" },
                { img: family, time: "8:00 AM", title: "Family Service", desc: "Worship and teaching for all ages with children's ministry" },
                { img: youth, time: "10:40 AM", title: "Youth & Teens Service", desc: "Energetic worship and relevant teaching for young people" }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-500 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.img} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                          {service.time}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {service.desc}
                      </p>
                      <button className="text-amber-600 font-semibold hover:text-amber-700 transition-colors flex items-center group">
                        <span className="mr-2">Learn More</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Midweek Services */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Midweek Services</h3>
              </div>

              {[
                { img: midweekdawn, time: "4:00 AM (Wed)", title: "Midweek Dawn Prayers", desc: "Start your day with powerful prayer and intercession" },
                { img: biblestudy, time: "6:00 PM", title: "Wednesday Bible Study", desc: "Deep dive into God's Word with practical applications" },
                { img: helpline, time: "10:00 AM - 12:00 PM", title: "Thursday Help Line", desc: "Prayer and counseling support for those in need" }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-500 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.img} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                          {service.time}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {service.desc}
                      </p>
                      <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center group">
                        <span className="mr-2">Learn More</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Friday Service */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Friday Service</h3>
              </div>

              {/* Friday Prayer Service */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-500 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={prayerservice} 
                      alt="Friday Prayer Service"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                        6:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      Friday Prayer Service
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Powerful corporate prayer meeting to end the week
                    </p>
                    <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center group">
                      <span className="mr-2">Learn More</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Service Times Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200/50 shadow-lg"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <HiOutlineClock className="w-6 h-6 text-blue-600 mr-3" />
                  Service Times Summary
                </h4>
                <ul className="space-y-4">
                  {[
                    { day: "Sunday", times: "6:30AM, 8:00AM, 10:40AM", color: "text-amber-600" },
                    { day: "Midweek Dawn", times: "5:30AM (Tue-Fri)", color: "text-blue-600" },
                    { day: "Wednesday", times: "6:00PM", color: "text-blue-600" },
                    { day: "Thursday", times: "10:00AM-12:00PM", color: "text-blue-600" },
                    { day: "Friday", times: "6:00PM", color: "text-purple-600" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
                        <span className="font-medium text-gray-700">{item.day}</span>
                      </div>
                      <span className={`font-semibold ${item.color}`}>{item.times}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link to="/visit">
                    <motion.button
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Plan Your Visit
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-blue-500/40 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPray className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-14 h-14 bg-white text-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaBible className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}