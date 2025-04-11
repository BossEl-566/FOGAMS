import React, { useState } from 'react';
import { Carousel } from 'flowbite-react';
import { motion } from 'framer-motion';
import { FiZoomIn, FiHeart, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const churchImages = [
  { id: 1, src: 'https://source.unsplash.com/random/800x600?church', alt: 'Church Building', category: 'Architecture', description: 'Our beautiful sanctuary' },
  { id: 2, src: 'https://source.unsplash.com/random/800x600?worship', alt: 'Worship Service', category: 'Services', description: 'Sunday morning worship' },
  { id: 3, src: 'https://source.unsplash.com/random/800x600?baptism', alt: 'Baptism', category: 'Sacraments', description: 'Baptism service' },
  { id: 4, src: 'https://source.unsplash.com/random/800x600?choir', alt: 'Choir', category: 'Music', description: 'Church choir performance' },
  { id: 5, src: 'https://source.unsplash.com/random/800x600?bible', alt: 'Bible Study', category: 'Groups', description: 'Weekly bible study' },
  { id: 6, src: 'https://source.unsplash.com/random/800x600?wedding', alt: 'Wedding', category: 'Events', description: 'Church wedding ceremony' },
  { id: 7, src: 'https://source.unsplash.com/random/800x600?community', alt: 'Community', category: 'Outreach', description: 'Community service day' },
  { id: 8, src: 'https://source.unsplash.com/random/800x600?children', alt: 'Children', category: 'Ministries', description: 'Children\'s ministry' },
  { id: 9, src: 'https://source.unsplash.com/random/800x600?cross', alt: 'Cross', category: 'Symbols', description: 'Church cross' },
];

const GalleryCard = ({ image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden shadow-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
            onClick={() => setIsLiked(!isLiked)}
          >
            <FiHeart />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
          >
            <FiShare2 />
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiZoomIn className="text-white text-4xl drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
};

const ChurchGallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredImages = activeCategory === 'All' 
    ? churchImages 
    : churchImages.filter(img => img.category === activeCategory);

  const featuredImages = churchImages.slice(0, 5);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleCarouselNav = (direction) => {
    setCarouselIndex(prev => {
      if (direction === 'next') {
        return prev === featuredImages.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? featuredImages.length - 1 : prev - 1;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Church Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Capturing moments of faith, fellowship, and worship in our church community
          </p>
        </div>

        {/* Enhanced Carousel with Controls */}
        <div className="relative h-96 sm:h-[32rem] mb-16 rounded-2xl overflow-hidden shadow-xl">
          <Carousel 
            slide={false} 
            activeIndex={carouselIndex}
            onSlideChange={setCarouselIndex}
            indicators={false}
          >
            {featuredImages.map((image) => (
              <div key={image.id} className="relative h-full w-full">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <h2 className="text-3xl font-bold text-white mt-2">{image.description}</h2>
                </div>
              </div>
            ))}
          </Carousel>
          
          {/* Custom Carousel Controls */}
          <button 
            onClick={() => handleCarouselNav('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/50 transition-all"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            onClick={() => handleCarouselNav('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/50 transition-all"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Functional Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All', 'Services', 'Events', 'Ministries', 'Sacraments', 'Community'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all ${
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

        {/* Filtered Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image) => (
              <GalleryCard key={image.id} image={image} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category</p>
          </div>
        )}

        {/* Bible Verse Section */}
        <motion.div 
          className="bg-blue-600 text-white p-8 rounded-2xl mt-16 text-center"
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
    </div>
  );
};

export default ChurchGallery;