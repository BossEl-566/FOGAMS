import React, { useEffect } from 'react';
import { FaChurch, FaHeart, FaQuoteLeft, FaCross, FaBullhorn, FaPray } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaPrayingHands, FaHandHoldingHeart, FaPhone } from 'react-icons/fa';
import { FaUsers, FaBusinessTime, FaMapMarkerAlt } from 'react-icons/fa';
import { FaSeedling, FaGraduationCap, FaHandsHelping, FaBroadcastTower, 
  FaClinicMedical, FaHandHoldingUsd, FaDoorOpen, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Import all images
import PastorImage from '../assets/pastor.jpg';
import CharlesAtia from '../assets/charles-atia.jpg';
import JustinaBaidoo from '../assets/justina-baidoo.jpg';
import DeaconBoateng from '../assets/Deacon-Boateng.jpg';
import DeaconTwentoh from '../assets/Deacon-Twentoh.jpg';
import DeaconAnsong from '../assets/Deacon-Ansong.jpg';
import MrsAdomako from '../assets/Mrs-Adomako.jpg';
import FrancisDorduno from '../assets/francis-dorduno.jpg';
import MaryOpoku from '../assets/Mary-foga.jpg';
import KwekuAsiedu from '../assets/kweku-Asiedu.jpg';
import MrOffie from '../assets/mr-offie.jpg';
import PastorEric from '../assets/pastor-Eric.jpg';
import PastorAidoo from '../assets/Pastor-Aidoo.jpg';
import MrAddison from '../assets/Mr-Addison.jpg';
import MaaJosephine from '../assets/maa-Josephine.jpg';
import Hawa from '../assets/Hawa.jpg';
import JoyceTwentoh from '../assets/Joyce-twentoh.jpg';
import FrancisAnsah from '../assets/Francis-Ansah.jpg';
import DrShibu from '../assets/Dr-Shibu.jpg';
import ChurchExterior from '../assets/church-exterior.jpg';
import Board from '../assets/Board.jpg';
import AsaafoMaamePastor from '../assets/AsaafoMaame-Pastor.jpg';
import CommunityEvent from '../assets/community-event.jpg';
import CongregationWorship from '../assets/congregation-worship.jpg';
import RevKoomson from '../assets/rev-koomson.jpg';
import MrAurthur from "../assets/aurthur.png"

export default function About() {
  const leadershipCategories = [
      {
        title: "Senior Pastor",
        members: [
          {
            name: "Reverend Charles Atia",
            role: "Senior Pastor",
            bio: "Rev. Charles Atia is the Senior Pastor of Fellowship of Grace Assemblies of God, Pedu, Cape Coast. He is gifted in preaching and inspiring revival, and has impacted churches and youth groups across Ghana. He also serves as Sunday School Director for Central Region A and teaches at the Assemblies of God Theological Seminary. He holds degrees from Global University and UCC. Rev. Atia is married to Lydia Atia, a Scripture Union officer, and they have two children, Wineloyah and Winepanga",
            image: CharlesAtia
          }
        ]
      },
      {
      title: "Deacons & Deaconesses",
      members: [
        {
          name: "Deaconess Justina Baidoo",
          role: "Church Secretary & FESA Committee Chair",
          bio: "Professional teacher with 20 years experience teaching English Language. Committed member of FOGA for 10 years.",
          image: JustinaBaidoo
        },
        {
          name: "Deacon Dr. Justice G.K.A. Boateng",
          role: "Departmental Liaison Officer & Anniversary Committee Chair",
          bio: "Senior Assistant Registrar at University of Cape Coast. Active in mentoring, discipleship programs, and church welfare initiatives.",
          image: DeaconBoateng
        },
        {
          name: "Deacon Dr. Nana Abekah Twentoh",
          role: "Community Impact Fund Chair",
          bio: "Pharmacist with 32 years civil service experience. Founding member of FOGA with passion for Sunday School ministry.",
          image: DeaconTwentoh
        },
        {
          name: "Deacon Joseph Arthur",
          role: "Project Committee Chair",
          bio: "Accomplished auditor and Regional Manager at EGNL. Founding member of FOGA with expertise in church projects.",
          image: MrAurthur // This one wasn't imported
        },
        {
          name: "Deacon Prof. Abraham Ansong",
          role: "Finance Committee Chair",
          bio: "Professor of Management and Leadership at University of Cape Coast. Expert in organizational management and corporate governance.",
          image: DeaconAnsong
        },
        {
          name: "Deaconess Felicia Adomako",
          role: "Treasurer",
          bio: "District Representative of Cape Coast North District Women Ministry. Passionate about evangelism and prison ministry.",
          image: MrsAdomako
        }
      ]
    },
    {
      title: "Lay Pastors",
      members: [
        {
          name: "Lay Pastor Samuel Nuwameh",
          role: "Prayer Ministry",
          image: "/images/samuel-nuwameh.jpg" // This one wasn't imported
        },
        {
          name: "Lay Pastor Francis Dorduno",
          role: "Missions Ministry",
          image: FrancisDorduno
        },
        {
          name: "Lay Pastor Mary Opoku",
          role: "Missions Ministry",
          image: MaryOpoku
        },
        {
          name: "Lay Pastor Asiedu Ompong",
          role: "School Ministry",
          image: KwekuAsiedu
        },
        {
          name: "Lay Pastor Patrick Offei",
          role: "School Ministry",
          image: MrOffie
        },
        {
          name: "Pastor Eric Botchwey",
          role: "Youth Ministry",
          image: PastorEric
        },
        {
          name: "Student Pastor George Ofori Aidoo",
          role: "Operations (Executive Pastor)",
          image: PastorAidoo
        }
      ]
    },
    {
      title: "Ministry Leaders",
      members: [
        {
          name: "Mr. Andy Kojo Addison",
          role: "Men's Ministry President",
          image: MrAddison
        },
        {
          name: "Mad. Josephine Yawson",
          role: "Women's Ministry President",
          image: MaaJosephine
        },
        {
          name: "Miss Hawawu Kassim",
          role: "Youth Ministry President",
          image: Hawa
        },
        {
          name: "Mrs Joyce Baaba Twentoh",
          role: "Children Ministry President",
          image: JoyceTwentoh
        },
        {
          name: "Mr. Francis Ansah",
          role: "Creative Arts President",
          image: FrancisAnsah
        },
        {
          name: "Dr. Shiabu Adams",
          role: "Sunday School Superintendent",
          image: DrShibu
        }
      ]
    }
  ];
  
  const images = [
    ChurchExterior,
    Board,
    AsaafoMaamePastor,
    CommunityEvent,
    CongregationWorship,
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Core Values Data
  const coreValues = [
    {
      icon: <FaHeart className="text-4xl text-white" />,
      title: "Love",
      description: "Love for God"
    },
    {
      icon: <FaCross className="text-4xl text-white" />,
      title: "Faith",
      description: "Trusting God in every circumstance"
    },
    {
      icon: <FaPray className="text-4xl text-white" />,
      title: "Worship",
      description: "Honoring God with our whole lives"
    },
    {
      icon: <FaBullhorn className="text-4xl text-white" />,
      title: "Evangelism",
      description: "Sharing the Gospel with our community"
    },
    {
      icon: <FaUsers className="text-4xl text-white" />,
      title: "Community",
      description: "Building authentic relationships"
    },
    {
      icon: <FaHandsHelping className="text-4xl text-white" />,
      title: "Service",
      description: "Meeting needs with compassion"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel Section */}
      <div className="relative h-80 md:h-96 max-h-[600px] overflow-hidden">
        {/* Carousel Images */}
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 ${index === currentSlide ? 'z-10' : 'z-0'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Content */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="container px-6">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              About Fellowship of Grace A/G
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto text-white"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            >
              Discover who we are and what we believe
            </motion.p>
          </div>
        </motion.div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-2xl" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Message with Pastor */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div className="md:w-1/3 flex justify-center" variants={item}>
            <div className="relative">
              <motion.img 
                src={PastorImage} 
                alt="Pastor John Doe" 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
                <FaQuoteLeft className="text-blue-600 text-2xl" />
              </div>
            </div>
          </motion.div>
          <motion.div className="md:w-2/3" variants={item}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome from Our Pastor
            </h2>
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md relative"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <p className="text-lg text-gray-700 mb-4 italic">
                "We're so glad you're here! At Fellowship of Grace Assemblies of God Church, we strive to be a place where 
                anyone can encounter God's love and grow in faith. Whether you're new to faith or have 
                been walking with Jesus for years, there's a place for you here."
              </p>
              <p className="text-gray-600">
                Our doors are always open to anyone looking for hope, healing, and community. 
                We believe in the transforming power of God's love and are committed to serving 
                our neighborhood with compassion and grace.
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-800">Reverend Charles Atia</p>
                <p className="text-blue-600">Senior Pastor</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Mission, Vision & Core Values Section */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-blue-50 to-purple-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Guiding Principles</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Mission Statement */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <FaBullhorn className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 pl-16">
                "As an agency of the Lord, FOGA is committed to helping people from all walks of life know the love of God, and to demonstrate it in the same way that Christ did."
              </p>
            </motion.div>

            {/* Vision Statement */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-purple-600 p-3 rounded-full mr-4">
                  <FaCross className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 pl-16">
                "To be a centre for building energized community of Christians who respond to God's heartbeat by influencing and touching the lives of people groups."
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Our Core Values</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do as a church family
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                variants={item}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 
                  ${index % 3 === 0 ? 'bg-blue-600' : 
                    index % 3 === 1 ? 'bg-purple-600' : 'bg-pink-600'}`}
                >
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Church History Section */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-blue-50 to-purple-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaChurch className="text-4xl text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800">Our Rich History</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4"></div>
          </motion.div>

          {/* Founder Section */}
          <motion.div 
            className="flex flex-col lg:flex-row gap-12 items-center mb-20 bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-1/3">
              <img 
                src={RevKoomson} 
                alt="Rev. Dr. Isaac Koomson - Founder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-2/3 p-8">
              <div className="flex items-center mb-4">
                <FaSeedling className="text-2xl text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Our Humble Beginnings</h3>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                On <span className="font-semibold text-blue-600">22nd November 1998</span>, under the visionary leadership of <span className="font-semibold">Rev. Dr. Isaac Koomson</span>, 
                Fellowship of Grace Assembly–Pedu was birthed. From that humble beginning, this local assembly has become 
                a spiritual family worth belonging to.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="italic text-gray-700">
                  "The Scripture enjoins us in 1 John 3:16 to love as Jesus did. The desire to love like Jesus informs all we do in FOGA, both within and without."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ministry Impact */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Ministry Impact</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaGraduationCap className="text-4xl text-blue-600" />,
                  title: "Education Support",
                  description: "Scholarship fund supporting 11 students and annual quiz competition for local schools"
                },
                {
                  icon: <FaHandsHelping className="text-4xl text-purple-600" />,
                  title: "Prison & Hospital Ministry",
                  description: "Regular missions to Ankaful Prisons and Cape Coast Teaching Hospital"
                },
                {
                  icon: <FaBroadcastTower className="text-4xl text-pink-600" />,
                  title: "Radio Ministry",
                  description: "Community radio outreach spreading the Gospel"
                },
                {
                  icon: <FaClinicMedical className="text-4xl text-green-600" />,
                  title: "Medical Outreach",
                  description: "Annual medical outreach serving the Abura Pedu community"
                },
                {
                  icon: <FaHandHoldingUsd className="text-4xl text-orange-600" />,
                  title: "Mission Support",
                  description: "Monthly financial support for Great Commission Movement and Child Evangelism Fellowship"
                },
                {
                  icon: <FaDoorOpen className="text-4xl text-red-600" />,
                  title: "Open Doors",
                  description: "Our auditorium hosts para-church groups like AGCM, CEF, and Scripture Union"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-center text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-center">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">What We Treasure Most</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  "The exaltation of Jesus Christ in the local assembly",
                  "The teaching of His Word and obedience to it",
                  "The continual love for each other within the FOGA family",
                  "The desire for the Lord to reach, teach, keep, and deploy the world around us",
                  "The future we are building together by the grace of God"
                ].map((value, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FaCheckCircle className="text-green-500 text-xl mt-1 mr-3 flex-shrink-0" />
                    <p className="text-lg text-gray-700">{value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <p className="text-lg text-gray-700 mb-6">
                  We call on all family members to contribute their quota to make FOGA the family we all want to belong to and to build the future the Lord has placed within our hearts.
                </p>
                <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold px-8 py-4 rounded-full shadow-lg">
                  FOGA…loving the Jesus Way!
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.div 
        className="max-w-4xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        
      </motion.div>

      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Leadership</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Meet the dedicated team serving our church community
            </p>
          </motion.div>

          {/* Leadership Categories */}
          <div className="space-y-20">
            {leadershipCategories.map((category, index) => (
              <motion.div 
                key={index}
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-gray-800 mb-8 flex items-center"
                  variants={item}
                >
                  {index === 0 && <FaUsers className="text-blue-600 mr-3" />}
                  {index === 1 && <FaPrayingHands className="text-purple-600 mr-3" />}
                  {index === 2 && <FaHandHoldingHeart className="text-pink-600 mr-3" />}
                  {category.title}
                </motion.h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.members.map((member, memberIndex) => (
                    <motion.div 
                      key={memberIndex}
                      className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      variants={item}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-96 overflow-hidden">
                        <img  
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h4 className="text-xl font-bold text-white">{member.name}</h4>
                          <p className="text-blue-200">{member.role}</p>
                        </div>
                      </div>
                      {member.bio && (
                        <div className="p-6">
                          <p className="text-gray-600">{member.bio}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Committee Section */}
          <motion.div 
            className="mt-20 bg-blue-800 rounded-xl p-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                <FaBusinessTime className="text-6xl text-white opacity-80" />
              </div>
              <div className="md:w-3/4">
                <h3 className="text-2xl font-bold mb-4">Church Committees</h3>
                <p className="opacity-90">
                  Our church operates through various committees that oversee different aspects of ministry and administration.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Finance & Fundraising", chair: "Prof. Abraham Ansong" },
                { name: "Anniversary Committee", chair: "Dr. Justice Boateng" },
                { name: "Guest Experience", chair: "Dr. Nana Twentoh & Mrs. Felicia Adomako" },
                { name: "Counseling & Visitation", chair: "Her Ladyship Veronique Praba Tetteh" },
                { name: "Projects Committee", chair: "Mr. Joseph Arthur" },
                { name: "Community Impact Fund", chair: "Dr. Nana Twentoh" }
              ].map((committee, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-bold text-lg mb-2">{committee.name}</h4>
                  <p className="opacity-80">Chair: {committee.chair}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
