import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import available images
import DrShibu from '../assets/Dr-Shibu.jpg';
import Clarissa from '../assets/CLARISSA.jpg';
import Khadija from '../assets/Khadija.jpg';
import MrsAidoo from '../assets/mrs-Aidoo.jpg';
import Stella from '../assets/Stella.jpg';
import JustinaBaidoo from '../assets/justina-baidoo.jpg';
import PastorAidoo from '../assets/Pastor-Aidoo.jpg';
// import Linus from '../assets/Linus.jpg';
// import Anthony from '../assets/Anthony.jpg';
import MrAddison from '../assets/Mr-Addison.jpg';
import MrManu from '../assets/Mr-Manu.jpg';
import PastorEric from '../assets/pastor-Eric.jpg';
import MrsAdomako from '../assets/Mrs-Adomako.jpg';
import SundaySchoolTeachers from '../assets/Sunday_school-Teachers.jpg';
import veronique from '../assets/Veronique.jpg';

export default function SundaySchoolMin() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

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

  const leadership = [
    {
      name: "DR. SHIABU ADAMS",
      role: "SUNDAY SCHOOL SUPERINTENDENT",
      image: DrShibu
    },
    {
      name: "MAD. CLARISSA BOADI MENDS",
      role: "SECRETARY",
      image: Clarissa
    },
    {
      name: "MAD KHADIJA",
      role: "SECRETARY",
      image: Khadija
    },
    {
      name: "MRS. BETTY OFORI AIDOO",
      role: "TREASURER",
      image: MrsAidoo
    }
  ];

  const teachers = {
    english: [
      {
        name: "Teacher Stella",
        role: "English Class Teacher",
        image: Stella,
        bio: "Teaching Sunday School for 5 years with a passion for making Bible stories come alive"
      },
      {
        name: "Teacher Justina",
        role: "English Class Teacher",
        image: JustinaBaidoo,
        bio: "Specializes in creative teaching methods for all age groups"
      },
      {
        name: "Teacher Clarissa",
        role: "English Class Teacher",
        image: Clarissa,
        bio: "Dedicated to nurturing faith through engaging lessons and activities"
      },
      {
        name: "Teacher Veronique",
        role: "English Class Teacher",
        image: veronique,
        bio: "Committed to helping students grow spiritually and academically"
      }
    ],
    akan: [
      {
        name: "Teacher Betty",
        role: "Akan Class Teacher",
        image: MrsAidoo,
        bio: "Bringing cultural heritage and faith together through language"
      },
      {
        name: "Teacher Geoge",
        role: "Akan Class Teacher",
        image: PastorAidoo,
        bio: "Dedicated to preserving our traditions while teaching God's word"
      }
    ],
    youth: [
      {
        name: "Teacher Linus",
        role: "Youth Class Teacher",
        image: null,
        bio: "Connecting with teenagers through relevant Bible teachings"
      },
      {
        name: "Teacher Anthony",
        role: "Youth Class Teacher",
        image: null,
        bio: "Mentoring young adults in their faith journey"
      },
      {
        name: "Teacher Khadija",
        role: "Youth Class Teacher",
        image: Khadija,
        bio: "Passionate about youth ministry and spiritual growth"
      }
    ],
    adult: [
      {
        name: "Teacher Shibu",
        role: "Adult Class Teacher",
        image: DrShibu,
        bio: "Deep Bible study for mature believers"
      },
      {
        name: "Teacher Addison",
        role: "Adult Class Teacher",
        image: MrAddison,
        bio: "Practical applications of Scripture for daily living"
      }
    ]
  };

  const classes = [
    {
      name: "English Class",
      description: "Biblical teachings in English for all age groups - children, youth, and adults",
      image: DrShibu,
      time: "Saturday 5:00 PM"
    },
    {
      name: "Akan Class",
      description: "Traditional language instruction connecting faith with cultural heritage for all generations",
      image: MrManu,
      time: "Saturday 5:00 PM"
    },
    {
      name: "Youth Class",
      description: "Engaging Bible study and discussions tailored for teenagers and young adults",
      image: PastorEric,
      time: "Saturday 5:00 PM"
    },
    {
      name: "Adult Class",
      description: "In-depth Bible study and discussion for mature believers",
      image: MrsAdomako,
      time: "Saturday 5:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative py-20 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1 
            variants={slideUp}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Sunday School Ministry
          </motion.h1>
          <motion.p 
            variants={slideUp}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Spiritual growth for all ages - Children, Youth, and Adults
          </motion.p>
          <motion.div variants={slideUp}>
            <button className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join Us This Sunday
            </button>
          </motion.div>
        </div>
        
        {/* Floating animated elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* About Sunday School Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-800">About Our Sunday School</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Our Sunday School Ministry serves the entire church family - from young children to adults. 
                We believe spiritual growth is a lifelong journey, and we provide age-appropriate teaching 
                for every stage of life.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Every Saturday, our dedicated teachers gather for preparatory sessions to plan and pray for 
                the Sunday lessons, ensuring everyone receives meaningful biblical instruction tailored to 
                their needs.
              </p>
              <p className="text-lg text-gray-700">
                We offer classes in both English and Akan to accommodate all members of our church family, 
                with specialized groups for children, youth, and adults.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src={SundaySchoolTeachers}
                alt="Sunday School for all ages"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Classes Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-800"
          >
            Our Sunday School Classes
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {classes.map((cls, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={slideUp}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={cls.image} 
                    alt={cls.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                    {cls.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{cls.description}</p>
                  <p className="text-sm font-medium text-blue-600">
                    <span className="font-bold">Meeting Time:</span> {cls.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          variants={slideUp}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-800"
        >
          Meet Our Dedicated Teachers
        </motion.h2>

        {/* English Teachers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-blue-600 border-b-2 border-blue-200 pb-2">
            English Class Teachers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teachers.english.map((teacher, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-48 md:h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h4 className="text-xl font-bold text-gray-800">{teacher.name}</h4>
                    <p className="text-blue-600 font-medium mb-3">{teacher.role}</p>
                    <p className="text-gray-700">{teacher.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Akan Teachers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-green-600 border-b-2 border-green-200 pb-2">
            Akan Class Teachers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teachers.akan.map((teacher, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-48 md:h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h4 className="text-xl font-bold text-gray-800">{teacher.name}</h4>
                    <p className="text-green-600 font-medium mb-3">{teacher.role}</p>
                    <p className="text-gray-700">{teacher.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Youth Teachers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-purple-600 border-b-2 border-purple-200 pb-2">
            Youth Class Teachers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teachers.youth.map((teacher, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-48 md:h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h4 className="text-xl font-bold text-gray-800">{teacher.name}</h4>
                    <p className="text-purple-600 font-medium mb-3">{teacher.role}</p>
                    <p className="text-gray-700">{teacher.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Adult Teachers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-orange-600 border-b-2 border-orange-200 pb-2">
            Adult Class Teachers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teachers.adult.map((teacher, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-48 md:h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h4 className="text-xl font-bold text-gray-800">{teacher.name}</h4>
                    <p className="text-orange-600 font-medium mb-3">{teacher.role}</p>
                    <p className="text-gray-700">{teacher.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-white">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          variants={slideUp}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-800"
        >
          Our Leadership Team
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((person, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={slideUp}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-64 bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden relative">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{person.name}</h3>
                <p className="text-purple-600 font-medium mt-2">{person.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Preparation Time Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 md:p-12 shadow-xl"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Teacher Preparation Time</h2>
            <p className="text-xl mb-6">
              Our dedicated teachers meet every <span className="font-bold">Saturday from 3:00PM to 5:00PM</span> to prepare for Sunday's lessons.
            </p>
            <p className="text-xl mb-8">
              During this time, they study the curriculum, plan engaging activities for all age groups, and pray for their students.
            </p>
            <Link to="/contact-us" className="inline-block mb-4">
              <button className="bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:bg-purple-100 transition-all duration-300 transform hover:scale-105">
                Interested in Teaching? Join Us
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}