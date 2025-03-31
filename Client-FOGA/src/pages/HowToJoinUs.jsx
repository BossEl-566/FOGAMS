import React from 'react';
import { Link } from 'react-router-dom';
import assembliesOfGodLogo from '../assets/assembliesOfGodLogo.png';
import churchImage1 from '../assets/church-service.jpg'; // Add these images to your assets
import churchImage2 from '../assets/church-community.jpg';
import churchImage3 from '../assets/church-worship.jpg';

const HowToJoinUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 py-12">
      {/* Animated Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <img
            src={assembliesOfGodLogo}
            alt="Fellowship of Grace Assemblies of God Church, Pedu Logo"
            className="w-32 h-32 mx-auto mb-6 hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            Join Our Church Family
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Become part of our growing community of faith in Cape Coast
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="h-48 overflow-hidden">
              <img 
                src={churchImage1} 
                alt="Church Service" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Spiritual Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Grow in faith through our inspiring services and Bible studies
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="h-48 overflow-hidden">
              <img 
                src={churchImage2} 
                alt="Church Community" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Loving Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with caring people who will support you in your journey
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="h-48 overflow-hidden">
              <img 
                src={churchImage3} 
                alt="Church Worship" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Meaningful Worship</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience God's presence through our vibrant worship services
              </p>
            </div>
          </div>
        </div>

        {/* Join Process */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8">
              How to Become a Member
            </h2>
            
            {/* Not Signed In Section */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  New to Our Church Website?
                </h3>
              </div>
              
              <div className="space-y-6 pl-16">
                <div className="relative group">
                  <div className="absolute -left-10 top-0 h-full w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                  <div className="absolute -left-12 top-4 h-5 w-5 rounded-full bg-blue-500 border-4 border-blue-100 dark:border-blue-900"></div>
                  <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-xl hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                      <span className="mr-2">Step 1:</span> Create Your Account
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Start by creating your personal account to access all our church resources.
                    </p>
                    <Link
                      to="/sign-in"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                    >
                      Sign Up Now
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-10 top-0 h-full w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                  <div className="absolute -left-12 top-4 h-5 w-5 rounded-full bg-blue-500 border-4 border-blue-100 dark:border-blue-900"></div>
                  <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-xl hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                      <span className="mr-2">Step 2:</span> Complete Membership Form
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      After logging in, visit your dashboard to fill out our simple membership application.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Already Signed In Section */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Already Have an Account?
                </h3>
              </div>
              
              <div className="space-y-6 pl-16">
                <div className="relative group">
                  <div className="absolute -left-10 top-0 h-full w-0.5 bg-green-200 dark:bg-green-800"></div>
                  <div className="absolute -left-12 top-4 h-5 w-5 rounded-full bg-green-500 border-4 border-green-100 dark:border-green-900"></div>
                  <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-xl hover:bg-green-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <h4 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                      <span className="mr-2">Step 1:</span> Access Your Profile
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Click on your profile icon in the top right corner of the screen.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-10 top-0 h-full w-0.5 bg-green-200 dark:bg-green-800"></div>
                  <div className="absolute -left-12 top-4 h-5 w-5 rounded-full bg-green-500 border-4 border-green-100 dark:border-green-900"></div>
                  <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-xl hover:bg-green-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <h4 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                      <span className="mr-2">Step 2:</span> Visit Your Dashboard
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Select "Go to Dashboard" from the dropdown menu to access membership options.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -left-10 top-0 h-full w-0.5 bg-green-200 dark:bg-green-800"></div>
                  <div className="absolute -left-12 top-4 h-5 w-5 rounded-full bg-green-500 border-4 border-green-100 dark:border-green-900"></div>
                  <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-xl hover:bg-green-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <h4 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                      <span className="mr-2">Step 3:</span> Complete Membership
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Fill out the membership form in the "Join Our Church" section of your dashboard.
                    </p>
                    <Link
                      to='/dashboard?tab=join'
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                      Go to Dashboard
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16 animate-pulse-slow">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ready to Join Us?</h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We can't wait to welcome you into our church family!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/sign-in"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Create Your Account
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200 dark:border-gray-600"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToJoinUs;