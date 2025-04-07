import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-4 border border-teal-200 bg-white dark:bg-gray-800 dark:border-gray-700 justify-center items-center rounded-lg shadow-sm hover:shadow-md transition-shadow'>
      <div className="flex-1 justify-center flex flex-col space-y-3">
        <h2 className='text-xl sm:text-2xl font-medium text-gray-800 dark:text-white'>
          Grow With Our Faith Community
        </h2>
        <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
          Join us in worship, fellowship, and serving our community through Christ's love.
        </p>
        <div className="mt-3">
          <Link to="/how-to-join-us">
            <Button 
              gradientDuoTone="tealToBlue"
              className='px-5 py-2 rounded-md font-medium transition-all hover:scale-105 dark:hover:bg-blue-600'
            >
              Join Us Today
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden sm:block p-4 flex-1">
        <img 
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop" 
          alt="Church community" 
          className="rounded-lg w-full max-w-xs object-cover h-40 dark:opacity-90" 
        />
      </div>
    </div>
  );
}