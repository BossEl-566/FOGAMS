import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Eye, EyeOff } from 'lucide-react';
import OAuth from '../components/OAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Import your logo
import assembliesOfGodLogo from '../assets/assembliesOfGodLogo.png';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      if (res.ok) {
        toast.success('Sign up successful! Redirecting to Sign In...');
        navigate('/sign-in');
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="w-full max-w-6xl mx-auto px-4 py-8 lg:py-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Branding (Hidden on mobile) */}
            <motion.div 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-yellow-50 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-8 lg:p-12 flex-col justify-center text-gray-800 dark:text-white"
            >
              <Link to="/" className="mb-6 lg:mb-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center"
                >
                  <img
                    className="w-16 h-16 lg:w-24 lg:h-24 object-contain"
                    src={assembliesOfGodLogo}
                    alt="Assemblies of God Logo"
                    onError={(e) => {
                      e.target.src = "/src/assets/assembliesOfGodLogo.png";
                    }}
                  />
                  <div className="ml-4">
                    <h1 className="text-2xl lg:text-4xl font-bold font-['Poppins']">Fellowship of Grace</h1>
                    <p className="text-blue-900 dark:text-blue-300 text-sm lg:text-lg mt-1 font-['Poppins']">
                      Assemblies of God Church
                    </p>
                  </div>
                </motion.div>
              </Link>
              
              <div className="mt-6 lg:mt-8">
                <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 font-['Poppins']">Join Our Community</h2>
                <p className="text-gray-600 dark:text-blue-200 leading-relaxed text-sm lg:text-base">
                  Create an account to access the Fellowship of Grace Assemblies of God Management System and connect with your spiritual family.
                </p>
              </div>
              
              <div className="mt-auto pt-6 lg:pt-8">
                <div className="flex items-center">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '2.5rem' }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="h-1 bg-blue-400 rounded-full"
                  ></motion.div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '5rem' }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="h-1 bg-blue-300 rounded-full ml-2"
                  ></motion.div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '2.5rem' }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="h-1 bg-blue-200 rounded-full ml-2"
                  ></motion.div>
                </div>
              </div>
            </motion.div>

            {/* Mobile Header (Only shown on mobile) */}
            <div className="lg:hidden bg-gradient-to-br from-yellow-50 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-6 text-center">
              <Link to="/" className="inline-block">
                <div className="flex items-center justify-center">
                  <img
                    className="w-12 h-12 object-contain"
                    src={assembliesOfGodLogo}
                    alt="Assemblies of God Logo"
                    onError={(e) => {
                      e.target.src = "/src/assets/assembliesOfGodLogo.png";
                    }}
                  />
                  <div className="ml-3">
                    <h1 className="text-xl font-bold font-['Poppins'] text-gray-800 dark:text-white">Fellowship of Grace</h1>
                    <p className="text-blue-900 dark:text-blue-300 text-xs font-['Poppins']">
                      Assemblies of God Church
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-6 lg:mb-8"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white font-['Poppins']">Sign Up</h2>
                <p className="text-yellow-500 dark:text-gray-400 mt-2 text-sm lg:text-base">
                  Create your account to begin your journey
                </p>
              </motion.div>

              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4 lg:space-y-6" 
                onSubmit={handleSubmit}
              >
                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Label 
                    value="Username" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-['Inter']" 
                  />
                  <TextInput 
                    type="text" 
                    placeholder="Choose a username" 
                    id="username" 
                    onChange={handleChange}
                    className="w-full px-3 py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Label 
                    value="Email" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-['Inter']" 
                  />
                  <TextInput 
                    type="email" 
                    placeholder="your@email.com" 
                    id="email" 
                    onChange={handleChange}
                    className="w-full px-3 py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Label 
                    value="Password" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-['Inter']" 
                  />
                  <div className="relative">
                    <TextInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      id="password"
                      onChange={handleChange}
                      className="w-full px-3 py-2 lg:px-4 lg:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-10 lg:pr-12 text-sm lg:text-base"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Button 
                    gradientDuoTone="purpleToBlue" 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-2 lg:py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md text-sm lg:text-base"
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-2 lg:pl-3">Creating account...</span>
                      </>
                    ) : (
                      <span className="font-['Inter']">Sign Up</span>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="relative"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-['Inter'] text-xs lg:text-sm">
                      Or continue with
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <OAuth />
                </motion.div>
              </motion.form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="mt-4 lg:mt-6 text-center"
              >
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
                  Already have an account?{' '}
                  <Link 
                    to="/sign-in" 
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}