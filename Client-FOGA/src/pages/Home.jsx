import React, { useRef, useState } from 'react';
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
  const [expandedCard, setExpandedCard] = useState(null);

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

  const truths = [
    {
      title: "The Scriptures Inspired",
      summary: "The Bible is the inspired Word of God, the product of holy men who spoke as they were moved by the Holy Spirit.",
      scripture: "2 Timothy 3:16-17 - 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.'"
    },
    {
      title: "The One True God",
      summary: "There is one true God revealed as Father, Son, and Holy Spirit.",
      scripture: "Deuteronomy 6:4 - 'Hear, O Israel: The Lord our God, the Lord is one.' Matthew 28:19 - 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.'"
    },
    {
      title: "The Deity of the Lord Jesus Christ",
      summary: "The Lord Jesus Christ is the eternal Son of God who became man without ceasing to be God.",
      scripture: "John 1:1,14 - 'In the beginning was the Word, and the Word was with God, and the Word was God... The Word became flesh and made his dwelling among us.' Philippians 2:6-7 - 'Who, being in very nature God, did not consider equality with God something to be used to his own advantage; rather, he made himself nothing by taking the very nature of a servant.'"
    },
    {
      title: "The Fall of Man",
      summary: "Man was created good and upright but fell into sin through voluntary disobedience.",
      scripture: "Genesis 1:26-27 - 'Then God said, Let us make mankind in our image, in our likeness... Genesis 3:6 - 'When the woman saw that the fruit of the tree was good for food and pleasing to the eye, and also desirable for gaining wisdom, she took some and ate it.'"
    },
    {
      title: "The Salvation of Man",
      summary: "Man's only hope of redemption is through the shed blood of Jesus Christ.",
      scripture: "Ephesians 2:8-9 - 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.' Romans 10:9 - 'If you declare with your mouth, Jesus is Lord, and believe in your heart that God raised him from the dead, you will be saved.'"
    },
    {
      title: "The Ordinances of the Church",
      summary: "Water baptism and Holy Communion are ordinances to be observed by the Church.",
      scripture: "Matthew 28:19 - 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.' 1 Corinthians 11:26 - 'For whenever you eat this bread and drink this cup, you proclaim the Lord's death until he comes.'"
    },
    {
      title: "The Baptism in the Holy Spirit",
      summary: "All believers are entitled to the baptism in the Holy Spirit with the initial sign of speaking in tongues.",
      scripture: "Acts 2:4 - 'All of them were filled with the Holy Spirit and began to speak in other tongues as the Spirit enabled them.' Acts 1:8 - 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses.'"
    },
    {
      title: "The Initial Physical Evidence",
      summary: "The baptism of believers in the Holy Spirit is witnessed by the initial physical sign of speaking in tongues.",
      scripture: "Acts 10:45-46 - 'The circumcised believers who had come with Peter were astonished that the gift of the Holy Spirit had been poured out even on Gentiles. For they heard them speaking in tongues and praising God.' Acts 19:6 - 'When Paul placed his hands on them, the Holy Spirit came on them, and they spoke in tongues and prophesied.'"
    },
    {
      title: "Sanctification",
      summary: "Sanctification is an act of separation from evil and dedication to God.",
      scripture: "1 Thessalonians 4:3 - 'It is God's will that you should be sanctified: that you should avoid sexual immorality.' Hebrews 12:14 - 'Make every effort to live in peace with everyone and to be holy; without holiness no one will see the Lord.'"
    },
    {
      title: "The Church and Its Mission",
      summary: "The Church is the Body of Christ with a divine mission to reach the lost.",
      scripture: "Ephesians 1:22-23 - 'And God placed all things under his feet and appointed him to be head over everything for the church, which is his body.' Matthew 28:19-20 - 'Therefore go and make disciples of all nations...teaching them to obey everything I have commanded you.'"
    },
    {
      title: "The Ministry",
      summary: "A divinely called and scripturally ordained ministry serves the Church.",
      scripture: "Ephesians 4:11-12 - 'So Christ himself gave the apostles, the prophets, the evangelists, the pastors and teachers, to equip his people for works of service.' 1 Timothy 3:1 - 'Here is a trustworthy saying: Whoever aspires to be an overseer desires a noble task.'"
    },
    {
      title: "Divine Healing",
      summary: "Deliverance from sickness is provided for in the atonement.",
      scripture: "Isaiah 53:4-5 - 'Surely he took up our pain and bore our suffering...by his wounds we are healed.' James 5:14-15 - 'Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord.'"
    },
    {
      title: "The Blessed Hope",
      summary: "The resurrection of those who have fallen asleep in Christ and their rapture is the imminent blessed hope.",
      scripture: "1 Thessalonians 4:16-17 - 'For the Lord himself will come down from heaven...and the dead in Christ will rise first. After that, we who are still alive will be caught up together with them in the clouds to meet the Lord in the air.' Titus 2:13 - 'While we wait for the blessed hope—the appearing of the glory of our great God and Savior, Jesus Christ.'"
    },
    {
      title: "The Millennial Reign",
      summary: "The second coming of Christ includes the rapture and a millennial reign on earth.",
      scripture: "Revelation 20:6 - 'Blessed and holy are those who share in the first resurrection...they will reign with him a thousand years.' Zechariah 14:9 - 'The Lord will be king over the whole earth. On that day there will be one Lord, and his name the only name.'"
    },
    {
      title: "The Final Judgment",
      summary: "There will be a final judgment in which the wicked will be raised and judged.",
      scripture: "Revelation 20:12-13 - 'And I saw the dead, great and small, standing before the throne, and books were opened...The dead were judged according to what they had done.' Matthew 25:46 - 'Then they will go away to eternal punishment, but the righteous to eternal life.'"
    },
    {
      title: "The New Heavens and New Earth",
      summary: "We look forward to the new heavens and new earth where righteousness dwells.",
      scripture: "2 Peter 3:13 - 'But in keeping with his promise we are looking forward to a new heaven and a new earth, where righteousness dwells.' Revelation 21:1 - 'Then I saw a new heaven and a new earth, for the first heaven and the first earth had passed away.'"
    }
  ];
  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="w-full overflow-hidden relative font-['Poppins']">
      {/* Hero Carousel Section */}
      <div className="h-screen">
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
                whileHover={{ scale: 0.98 }}
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

      {/* Fundamental Truths Section */}
      <section className="w-full py-16 bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Fundamental Truths
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The 16 foundational beliefs that guide our faith and practice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {truths.map((truth, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden transition-all duration-300 ${expandedCard === index ? 'lg:col-span-2' : ''}`}
                onClick={() => toggleCard(index)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-6 cursor-pointer">
                  <div className="flex items-start">
                    <div className="text-yellow-400 text-2xl font-bold mr-4">{index + 1}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">{truth.title}</h3>
                      <p className="text-white/80">{truth.summary}</p>
                    </div>
                  </div>
                </div>
                
                {/* Scripture Reference - shown when expanded */}
                {expandedCard === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 p-6 border-t border-white/10"
                  >
                    <div className="flex items-start">
                      <div className="text-yellow-400 text-xl mr-4 mt-1">✝</div>
                      <div>
                        <h4 className="text-lg font-medium text-yellow-300 mb-2">Scripture Reference</h4>
                        <p className="text-white/90 italic">{truth.scripture}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a 
  href="https://ag.org/beliefs/statement-of-fundamental-truths" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-blue-200 font-semibold rounded-lg transition-colors">
    Learn More About Our Beliefs
  </button>
</a>

          </motion.div>
        </div>
      </section>
      {/* Theme of the Year Section */}
{/* Theme of the Year Section */}
<section className="w-full py-20 bg-white">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col lg:flex-row items-center gap-12"
    >
      {/* Flier Image */}
      <div className="w-full lg:w-1/2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-100"
        >
          <img 
            src="/src/assets/theme-flier.jpg" // Replace with your actual image path
            alt="2025 Church Theme: Pray Without Ceasing"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>
      </div>

      {/* Theme Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <div className="text-blue-600 font-bold mb-4 tracking-wider">OUR 2025 THEME</div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Pray Without Ceasing <br />
          <span className="text-2xl md:text-3xl text-blue-700">For Supernatural Manifestation</span>
        </h2>
        
        <div className="relative inline-block mb-8">
          <div className="text-xl text-gray-700 italic bg-blue-50 px-6 py-4 rounded-lg">
            "Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you."
            <div className="text-right text-blue-600 mt-2 font-medium">1 Thessalonians 5:16-17</div>
          </div>
          <div className="absolute -bottom-3 right-0 w-24 h-1 bg-blue-500"></div>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          This year, we're committing to a lifestyle of persistent prayer that unlocks God's supernatural power in our lives, families, and community. Join us as we seek God's face continually and expect miraculous manifestations of His presence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/prayer-groups">
            <motion.button
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Prayer Groups
            </motion.button>
          </Link>
          <Link to="/prayer-resources">
            <motion.button
              className="px-8 py-3 bg-white border-2 border-yellow-300 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Prayer Resources
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
</section>
{/* Upcoming Events & Daily Bible Message Section */}
<section className="w-full py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Upcoming Events Column */}
      <div className="lg:col-span-2">
        <div className="text-center lg:text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto lg:mx-0 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
            Join us for these special gatherings and experience God's presence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Card 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 mr-4">
                  <div className="font-bold text-2xl">24</div>
                  <div className="text-xs">JUNE</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Night of Worship</h3>
                  <p className="text-blue-600">6:30 PM - Sanctuary</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                An evening of powerful worship and prophetic ministry with our worship team
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Learn More →
              </button>
            </div>
          </motion.div>

          {/* Event Card 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 mr-4">
                  <div className="font-bold text-2xl">30</div>
                  <div className="text-xs">JUNE</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Youth Conference</h3>
                  <p className="text-blue-600">9:00 AM - Fellowship Hall</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Annual youth gathering with guest speaker Pastor Michael Johnson
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Learn More →
              </button>
            </div>
          </motion.div>

          {/* Event Card 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 mr-4">
                  <div className="font-bold text-2xl">07</div>
                  <div className="text-xs">JULY</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Baptism Service</h3>
                  <p className="text-blue-600">2:00 PM - Baptismal Pool</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Celebration of new believers taking this important step of faith
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Learn More →
              </button>
            </div>
          </motion.div>

          {/* View All Events Button */}
          <div className="md:col-span-2 text-center mt-6">
            <Link to="/events">
              <motion.button
                className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Upcoming Events
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Bible Message Column */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-fit sticky top-6">
        <div className="relative">
          <img 
            src="/src/assets/daily-bible.jpg" // Replace with your image
            alt="Daily Bible Message"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-white">Daily Bible Message</h3>
            <p className="text-white/90">Today's Spiritual Nourishment</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-800 rounded-lg px-3 py-1 mr-3">
              <div className="font-medium text-sm">JUNE 20</div>
            </div>
            <div className="text-gray-500 text-sm">Psalm 119:105</div>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-3">God's Word Illuminates</h4>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            "Your word is a lamp for my feet, a light on my path." In times of uncertainty, 
            God's Word provides clarity and direction. Just as a lamp illuminates a dark path, 
            Scripture guides us through life's challenges...
          </p>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Pastor David Thompson</span>
            <Link to="/daily-devotional/june-20-2024">
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                Read Full Message <span className="ml-1">→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Weekly Services Section */}
{/* Weekly Services Section */}
<section className="w-full py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Our Weekly Services
      </h2>
      <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Join us as we worship, grow, and experience God's presence together
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Sunday Services */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
          <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Sunday Services
        </h3>
        
        {/* Dawn Service */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="relative h-48">
            <img 
              src="/src/assets/dawn-service.jpg" 
              alt="Dawn Service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                6:30 AM
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Glory Service</h4>
            <p className="text-gray-600 mb-4">
              Early morning worship for those who seek God at sunrise
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Learn More →
            </button>
          </div>
        </motion.div>

        {/* Family Service */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="relative h-48">
            <img 
              src="/src/assets/family-service.jpg" 
              alt="Family Service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                8:00 AM
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Family Service</h4>
            <p className="text-gray-600 mb-4">
              Worship and teaching for all ages with children's ministry
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Learn More →
            </button>
          </div>
        </motion.div>

        {/* Youth Service */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="relative h-48">
            <img 
              src="/src/assets/youth-service.jpg" 
              alt="Youth & Teens Service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                10:40 AM
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Youth & Teens Service</h4>
            <p className="text-gray-600 mb-4">
              Energetic worship and relevant teaching for young people
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Learn More →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Midweek Services - Left Column */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
          <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Midweek Services
        </h3>

        {/* Midweek Dawn Prayers */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="relative h-48">
            <img 
              src="/src/assets/dawn-prayers.jpg" 
              alt="Midweek Dawn Prayers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                4:00 AM (Wen)
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Midweek Dawn Prayers</h4>
            <p className="text-gray-600 mb-4">
              Start your day with powerful prayer and intercession
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Learn More →
            </button>
          </div>
        </motion.div>

        {/* Wednesday Bible Study */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="relative h-48">
            <img 
              src="/src/assets/bible-study.jpg" 
              alt="Bible Study"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                6:00 PM
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Wednesday Bible Study</h4>
            <p className="text-gray-600 mb-4">
              Deep dive into God's Word with practical applications
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Learn More →
            </button>
          </div>
        </motion.div>

        {/* Thursday Help Line */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="relative h-48">
            <img 
              src="/src/assets/help-line.jpg" 
              alt="Help Line"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                10:00 AM - 12:00 PM
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Thursday Help Line</h4>
            <p className="text-gray-600 mb-4">
              Prayer and counseling support for those in need
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Learn More →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Friday Prayer Service - Right Column */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
          <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Friday Service
        </h3>

        {/* Friday Prayer Service */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="relative h-48">
            <img 
              src="/src/assets/prayer-service.jpg" 
              alt="Friday Prayer Service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                6:00 PM
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Friday Prayer Service</h4>
            <p className="text-gray-600 mb-4">
              Powerful corporate prayer meeting to end the week
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Learn More →
            </button>
          </div>
        </motion.div>

        {/* Service Times Summary */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h4 className="text-lg font-bold text-blue-800 mb-4">Service Times Summary</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong>Sunday:</strong> 6:30AM, 8:00AM, 10:40AM</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong>Midweek Dawn:</strong> 5:30AM (Tue-Fri)</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong>Wednesday:</strong> 6:00PM</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong>Thursday:</strong> 10:00AM-12:00PM</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700"><strong>Friday:</strong> 6:00PM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}