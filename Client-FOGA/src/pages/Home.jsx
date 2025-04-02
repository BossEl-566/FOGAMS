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
{/* Contact & Connect Section */}
<section className="w-full py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Contact Information Column */}
      <div className="bg-white rounded-xl shadow-md p-8 h-fit sticky top-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
        
        <div className="space-y-6">
          {/* Phone */}
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Phone Number</h3>
              <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-600 transition-colors">
                (+223) 24-629-0280
                (+223) 55-423-4824
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Email Address</h3>
              <a href="mailto:info@yourchurch.org" className="text-gray-600 hover:text-blue-600 transition-colors">
                agghfoga.pedu@gmail.com
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Social Media</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Church Address</h3>
              <p className="text-gray-600">P.O. BOX DL 192 Adisadel, Cape Coast</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Request & Newsletter Columns */}
      <div className="lg:col-span-2 space-y-8">
        {/* Prayer Request Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Prayer Request</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="request" className="block text-sm font-medium text-gray-700 mb-1">Prayer Request</label>
              <textarea 
                id="request" 
                rows={4} 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Please share your prayer need..."
              ></textarea>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="anonymous" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              Submit Prayer Request
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}