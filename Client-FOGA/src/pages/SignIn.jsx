import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../radux/user/userSlice";
import { connectSocket } from "../radux/socket/socketSlice";
import { Eye, EyeOff } from "lucide-react";
import OAuth from "../components/OAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return dispatch(signInFailure("All fields are required"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        dispatch(connectSocket());
        navigate("/");
        toast.success("Successfully signed in");
      } else {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen dark:from-gray-700 dark:to-gray-800 bg-slate-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Branding */}
            <motion.div 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full md:w-1/2 bg-gradient-to-br from-yellow-50 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-12 flex flex-col justify-center text-gray-800 dark:text-white"
            >
              <Link to="/" className="mb-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center"
                >
                  <img
                    className="w-24 h-24 object-contain"
                    src="/src/assets/assembliesOfGodLogo.png"
                    alt="Assemblies of God Logo"
                  />
                  <div className="ml-4">
                    <h1 className="lg:text-4xl text-3xl font-bold font-['Poppins']">Fellowship of Grace</h1>
                    <p className="text-blue-900 dark:text-blue-300 text-lg mt-1 font-['Poppins']">
                      Assemblies of God Church-Pedu
                    </p>
                  </div>
                </motion.div>
              </Link>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 font-['Poppins']">Welcome Back!</h2>
                <p className="text-gray-600 dark:text-blue-200 leading-relaxed">
                  Sign in to access the Fellowship of Grace Assemblies of God Management System and connect with your spiritual community.
                </p>
              </div>
              
              <div className="mt-auto pt-8">
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

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white font-['Poppins']">Sign In</h2>
                <p className="text-yellow-500 dark:text-gray-400 mt-2">
                  Access your account to continue your journey
                </p>
              </motion.div>

              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-6" 
                onSubmit={handleSubmit}
              >
                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.9 }}
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Label 
                    value="Password" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-['Inter']" 
                  />
                  <div className="relative">
                    <TextInput
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      id="password"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 font-['Inter']">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium font-['Inter']">
                    Forgot password?
                  </Link>
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
                    className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md"
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Signing in...</span>
                      </>
                    ) : (
                      <span className="font-['Inter']">Sign In</span>
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
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-['Inter']">
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
                className="mt-6 text-center"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
                  Don't have an account?{' '}
                  <Link 
                    to="/sign-up" 
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sign up
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