import React, { useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import your images
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpg';
import { Link } from 'react-router-dom';

export default function Home() {
  const sliderRef = useRef(null);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  const handleSlideClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const slides = [
    {
      image: slide1,
      title: "Welcome to Our Community",
      text: "Join us in worship and fellowship every Sunday"
    },
    {
      image: slide2,
      title: "Deepen Your Faith",
      text: "Weekly Bible study groups for all ages"
    },
    {
      image: slide3,
      title: "Serve With Purpose",
      text: "Find your place in our ministry teams"
    },
    {
      image: slide4,
      title: "Children's Ministry",
      text: "A safe and fun environment for kids"
    }
  ];

  return (
    <div className="w-full h-screen overflow-hidden relative font-['Poppins']">
      <Slider 
        {...settings} 
        className="w-full h-full" 
        ref={sliderRef}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            {/* Clickable image area with darker overlay */}
            <div 
              className="relative w-full h-full cursor-pointer"
              onClick={handleSlideClick}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60" />
            </div>
            
            {/* Content with hover zoom effect */}
            <motion.div 
              className="absolute bottom-1/4 left-10 max-w-xl pointer-events-none"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 0.98 }} // Zoom out effect on hover
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {slide.title}
              </h2>
              <p className="text-2xl md:text-3xl text-white mb-8 font-light">
                {slide.text}
              </p>
              <Link to="/how-to-join-us">
              <motion.button
                className="px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl text-xl font-semibold shadow-lg hover:shadow-yellow-400/40 transition-colors pointer-events-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Church
              </motion.button>
              </Link>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
}