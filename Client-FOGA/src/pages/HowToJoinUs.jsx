import React from 'react';
import { Link } from 'react-router-dom';
import assembliesOfGodLogo from '../assets/assembliesOfGodLogo.png'; // Replace with the correct path to your logo

const HowToJoinUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="text-center mb-10">
          <img
            src={assembliesOfGodLogo}
            alt="Fellowship of Grace Assemblies of God Church, Pedu Logo"
            className="w-24 h-24 mx-auto mb-1"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-blue-900 dark:text-white mb-4">
            To Join Fellowship of Grace Assemblies of God Church, Pedu - Cape Coast
          </h1>
          <hr className="border-t-2 border-gray-300 dark:border-gray-600 mb-8" />

          {/* If the user is not signed in */}
          <div className="mb-12 text-justify">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-7">
              If you haven’t signed up or logged in:
            </h2>
            <div className="space-y-6">
              <div className="text-gray-600 dark:text-gray-200">
                <h3 className="font-semibold text-lg mb-2">Step 1: Log in or Sign up</h3>
                <p className="mb-4">
                  If you haven’t logged in or signed up, please do so using the link below.
                </p>
                <Link
                  to="/sign-in"
                  className="text-blue-400 hover:underline hover:text-blue-900 font-bold transition-all"
                >
                  Login/Signup
                </Link>
              </div>
              <div className="text-gray-600 dark:text-gray-200">
                <h3 className="font-semibold text-lg mb-2">Step 2: Fill out the membership form</h3>
                <p>Once logged in, go to your dashboard and fill out the membership form.</p>
              </div>
              <div className="text-center mt-8">
                <Link
                  to='/dashboard?tab=join'
                  className="text-blue-500 hover:underline font-bold hover:text-blue-950 transition-all"
                >
                  Click here to go to your Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* If the user is already signed in */}
          <div className="text-justify">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-7">
              If you’re already signed in:
            </h2>
            <div className="space-y-6">
              <div className="text-gray-600 dark:text-gray-200">
                <h3 className="font-semibold text-lg mb-2">Step 1: Click on your Profile</h3>
                <p>On the top right corner of the navbar, click on your profile icon.</p>
              </div>
              <div className="text-gray-600 dark:text-gray-200">
                <h3 className="font-semibold text-lg mb-2">Step 2: Go to your Dashboard</h3>
                <p>
                  A popup will appear where you can select "Go to Dashboard." This will take you to
                  the section where you can join the church.
                </p>
              </div>
              <div className="text-gray-600 dark:text-gray-200">
                <h3 className="font-semibold text-lg mb-2">Step 3: Complete the Membership Form</h3>
                <p>Fill out the form in the dashboard to request membership.</p>
              </div>
              <div className="text-center mt-8">
                <Link
                  to='/dashboard?tab=join'
                  className="text-blue-500 hover:underline font-bold hover:text-blue-950 transition-all"
                >
                  Click here to visit your Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToJoinUs;
