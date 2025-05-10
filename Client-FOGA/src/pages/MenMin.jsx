import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChurch, FaCalendarAlt, FaHandsHelping, FaUsers, FaPrayingHands } from 'react-icons/fa';

export default function MenMin() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHero, setCurrentHero] = useState(0);

  // Image paths - replace with your actual images
  const heroImages = [
    "/src/assets/Men_ministry.jpg",
    "/src/assets/Men-friends.jpg",
    "/src/assets/action.jpg",
    "/src/assets/singing-men.jpg"
  ];

  const galleryImages = [
    "/images/men-event1.jpg", "/images/men-event2.jpg", "/images/men-event3.jpg",
    "/images/men-event4.jpg", "/images/men-event5.jpg", "/images/men-event6.jpg"
  ];

  const leadership = [
    {
      name: "Mr. Andy Kojo Addison",
      position: "President",
      image: "/src/assets/Mr-Addison.jpg"
    },
    {
      name: "L.P. Patrick Offei",
      position: "Vice President",
      image: "/src/assets/mr-offie.jpg"
    }, 
    {
      name: "Mr. Bright Abeka Mensah",
      position: "Secretary",
      image: "/src/assets/bright-mensah.jpg"
    },
    {
      name: "Mr. Emmanuel Arthur",
      position: "Treasurer",
      image: "/src/assets/emmanuel-arthur.jpg"
    }
  ];

  // Auto-rotate hero images and gallery slides
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const galleryInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (galleryImages.length - 3));
    }, 4000);

    return () => {
      clearInterval(heroInterval);
      clearInterval(galleryInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[400px] overflow-hidden">
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentHero ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url(${img})`,
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
              
              
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                  MEN'S MINISTRY
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-6">
                  Building godly men through discipleship, accountability, and service
                </p>
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
                  MEN.. <span className="text-red-500">ACTION!!!</span>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mission Statement */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">STRONGER TOGETHER IN CHRIST</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Our Men's Ministry exists to challenge and equip men to live with biblical integrity, 
            to grow in spiritual leadership, and to impact their families, workplaces, and communities 
            for the glory of God.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">OUR CORE VALUES</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-700">
              <div className="text-blue-700 text-4xl mb-4 flex justify-center">
                <FaPrayingHands />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">SPIRITUAL GROWTH</h3>
              <p className="text-gray-600 text-center">
                Committed to deepening our relationship with Christ through prayer, Bible study, and discipleship.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-700">
              <div className="text-blue-700 text-4xl mb-4 flex justify-center">
                <FaHandsHelping />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">ACCOUNTABILITY</h3>
              <p className="text-gray-600 text-center">
                Building authentic relationships where we challenge and encourage one another in our faith journeys.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-700">
              <div className="text-blue-700 text-4xl mb-4 flex justify-center">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">SERVICE</h3>
              <p className="text-gray-600 text-center">
                Using our God-given talents to serve our church, families, and community with excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">OUR LEADERSHIP TEAM</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((leader, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                <p className="text-blue-700 font-medium mt-1">{leader.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meeting Times */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">MEETING SCHEDULE</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-300 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Weekly Bible Study</h3>
              </div>
              <p className="text-blue-100">Tuesdays</p>
              <p className="text-blue-300 font-medium">7:00 PM - 8:30 PM</p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-300 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Men's Breakfast</h3>
              </div>
              <p className="text-blue-100">Second Saturday</p>
              <p className="text-blue-300 font-medium">8:00 AM - 10:00 AM</p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-300 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Prayer Meeting</h3>
              </div>
              <p className="text-blue-100">First Fridays</p>
              <p className="text-blue-300 font-medium">6:00 AM - 7:00 AM</p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-300 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Annual Retreat</h3>
              </div>
              <p className="text-blue-100">October 18-20</p>
              <p className="text-blue-300 font-medium">Weekend Event</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">LATEST EVENTS</h2>
          
          <div className="relative overflow-hidden h-64 md:h-96">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
            >
              {galleryImages.map((img, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/4 px-2">
                  <div className="h-64 md:h-96 rounded-lg overflow-hidden shadow-md border-4 border-white">
                    <img 
                      src={img} 
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {galleryImages.slice(0, galleryImages.length - 3).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-700' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FaQuoteLeft className="text-4xl text-blue-400 mx-auto mb-6" />
          <p className="text-xl md:text-2xl italic mb-8">
            "This men's ministry has been instrumental in my walk with Christ. The brotherhood, 
            accountability, and biblical teaching have transformed me into a better husband, father, 
            and follower of Jesus."
          </p>
          <p className="font-bold">- Brother Kwame Asante</p>
          <p className="text-blue-400">Member since 2019</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 text-white flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">READY TO JOIN US?</h2>
              <p className="mb-6">
                Whether you're looking to grow spiritually, build authentic friendships, 
                or serve alongside other men of God, we'd love to connect with you.
              </p>
              <div className="bg-white text-blue-800 font-bold py-3 px-6 rounded-md inline-block hover:bg-gray-100 transition-colors duration-300 self-start shadow-md">
                GET CONNECTED TODAY
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/src/assets/Men_ministry.jpg" 
                alt="Men's Ministry Group"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}