import React, { useEffect, useState } from 'react';
import { FiCalendar, FiUser, FiMail, FiPhone, FiGift } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function DashBirthday() {
  const [celebrants, setCelebrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCelebrants = async () => {
      try {
        const res = await fetch('/api/membership/birthdays-today');
        const data = await res.json();
        setCelebrants(data);
      } catch (error) {
        toast.error("Error fetching birthdays. Please re-authenticate.");
        console.error("Error fetching birthdays:", error);
        window.location.href = '/re-authenticate';
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <FiGift className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Today's Birthdays
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Celebrating our members
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading birthdays...</p>
            </div>
          </div>
        ) : celebrants.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No birthdays today
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Check back tomorrow for birthday celebrations
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Celebration Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-center text-white">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FiGift className="w-6 h-6" />
                <h2 className="text-xl font-bold">
                  Celebrating {celebrants.length} {celebrants.length === 1 ? 'Birthday' : 'Birthdays'} Today
                </h2>
              </div>
              <p className="text-pink-100 text-sm">
                Wish them a happy birthday!
              </p>
            </div>

            {/* Birthday Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {celebrants.map((member) => (
                <div 
                  key={member._id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200"
                >
                  {/* Member Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                        {member.fullname}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-pink-600 dark:text-pink-400">
                        <FiGift className="w-4 h-4" />
                        <span>Birthday Today!</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    {member.contact && (
                      <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                        <FiPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm truncate">{member.contact}</span>
                      </div>
                    )}
                    
                    {member.email && (
                      <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                        <FiMail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm truncate">{member.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Birthday Message */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-600">
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-3 text-center">
                      <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
                        Happy Birthday! 🎂
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}