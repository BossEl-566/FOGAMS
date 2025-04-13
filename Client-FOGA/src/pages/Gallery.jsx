import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiHeart, FiShare2, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import BaptismImage from '../assets/Baptism.jpg'; // adjust the path as needed
import BaptismImage1 from '../assets/Baptism1.jpg'; // adjust the path as needed
import ChoirImage from '../assets/Choir.jpg'; // adjust the path as needed

// Sample images - replace with your actual image imports
const churchImages = [
  { id: 1, src: 'https://source.unsplash.com/random/800x600?church', alt: 'Church Family', category: 'Family', description: 'Our beautiful church family' },
  { id: 2, src: 'https://source.unsplash.com/random/800x600?worship', alt: 'Worship Service', category: 'Services', description: 'Sunday morning worship' },
  { id: 3, src: BaptismImage, alt: 'Baptism', category: 'Sacraments', description: 'Baptism service' },
  { id: 4, src: BaptismImage1, alt: 'Baptism', category: 'Sacraments', description: 'Holy Spirit Baptism' },
  { id: 5, src: ChoirImage, alt: 'Choir', category: 'Ministries', description: 'Church choir performance' },
  { id: 6, src: 'https://source.unsplash.com/random/800x600?bible', alt: 'Bible Study', category: 'Groups', description: 'Weekly bible study' },
  { id: 7, src: 'https://source.unsplash.com/random/800x600?wedding', alt: 'Wedding', category: 'Events', description: 'Church wedding ceremony' },
  { id: 8, src: 'https://source.unsplash.com/random/800x600?community', alt: 'Community', category: 'Outreach', description: 'Community service day' },
  { id: 9, src: 'https://source.unsplash.com/random/800x600?children', alt: 'Children', category: 'Ministries', description: 'Children\'s ministry' },
  { id: 10, src: 'https://source.unsplash.com/random/800x600?cross', alt: 'Cross', category: 'Symbols', description: 'Church cross' },
];

const GalleryCard = ({ image, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <img 
        src={image.src} 
        alt={image.alt} 
        className="w-full h-full object-cover transition-transform duration-500"
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded-full">
            {image.category}
          </span>
          <h3 className="text-white text-xl font-bold mt-2">{image.description}</h3>
        </div>
        <div className="flex justify-end space-x-3 mt-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${isLiked ? 'text-red-500 bg-white/30' : 'text-white bg-white/20'} backdrop-blur-sm`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <FiHeart />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <FiShare2 />
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiZoomIn className="text-white text-4xl drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
};

const AutoAdvancingCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef();

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [images.length, isPaused]);

  const goToNext = () => {
    clearInterval(intervalRef.current);
    setDirection(1);
    setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    // Restart auto-advance after manual navigation
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  const goToPrev = () => {
    clearInterval(intervalRef.current);
    setDirection(-1);
    setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    // Restart auto-advance after manual navigation
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  const goToIndex = (index) => {
    clearInterval(intervalRef.current);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    // Restart auto-advance after manual navigation
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div 
      className="relative h-96 sm:h-[32rem] w-full rounded-2xl overflow-hidden shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute inset-0"
        >
          <img 
            src={images[activeIndex].src} 
            alt={images[activeIndex].alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <span className="text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
              Featured
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">{images[activeIndex].description}</h2>
            <p className="text-white/90 mt-1">{images[activeIndex].category}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/50 transition-all z-10"
      >
        <FiChevronLeft size={24} />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/50 transition-all z-10"
      >
        <FiChevronRight size={24} />
      </button>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ImageModal = ({ image, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition-all"
      >
        <FiX size={24} />
      </button>
      
      <motion.div 
        className="relative max-w-6xl max-h-[90vh]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <img 
          src={image.src} 
          alt={image.alt}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <div className="text-white mt-4 text-center">
          <h3 className="text-2xl font-bold">{image.description}</h3>
          <p className="text-gray-300">{image.category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ChurchGallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'

  const filteredImages = activeCategory === 'All' 
    ? churchImages 
    : churchImages.filter(img => img.category === activeCategory);

  const featuredImages = churchImages.slice(0, 5);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Church Gallery
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Capturing moments of faith, fellowship, and worship in our church community
          </motion.p>
        </div>

        {/* Auto-Advancing Carousel */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <AutoAdvancingCarousel images={featuredImages} />
        </motion.div>

        {/* Gallery Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Services', 'Events', 'Ministries', 'Sacraments', 'Community', 'Family'].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-sm sm:text-base ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-800'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white p-1 rounded-full shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-800'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`px-4 py-2 rounded-full transition-all ${viewMode === 'masonry' ? 'bg-blue-600 text-white' : 'text-gray-800'}`}
            >
              Masonry
            </button>
          </div>
        </div>

        {/* Filtered Gallery */}
        {filteredImages.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <GalleryCard 
                  key={image.id} 
                  image={image} 
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredImages.map((image) => (
                <GalleryCard 
                  key={image.id} 
                  image={image} 
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category</p>
          </div>
        )}

        {/* Bible Verse Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-2xl font-serif italic mb-4">
            "Let everything that has breath praise the Lord. Praise the Lord."
          </blockquote>
          <p className="font-medium">Psalm 150:6</p>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChurchGallery;