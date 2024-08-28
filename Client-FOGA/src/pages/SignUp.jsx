import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file
import { Button, Label, TextInput } from 'flowbite-react';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
        {/* left */}
        <div className="flex-1">
          <Link to='/' >
            <div className='flex items-center'>
              <img className='w-20 h-15 sm:w-20 sm:h-15 md:w-24 md:h-18 lg:w-40 lg:h-40' src='/src/assets/assembliesOfGodLogo.png' alt='Assemblies of God Logo' />
              <div className='w-px h-30 bg-black ml-1 dark:bg-slate-400 sm:h-30'></div>
              <div className='ml-1 hidden md:block md:text-2xl lg:text-3xl font-bold dark:text-white text-blue-950'>
                Fellowship of Grace <br /> Assemblies of God
              </div>
              <div className='ml-1 block md:hidden font-bold dark:text-white sm:text-2xl text-2xl text-blue-950'>Fellowship of Grace <br /> Assemblies of God</div>
            </div>
          </Link>
          <p className='text-sm mt-5'>
          Welcome to the Fellowship of Grace Assemblies of God Management System. Please fill in the form below to create an account.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div className="">
              <Label value='Enter your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div className="">
              <Label value='Enter your email' />
              <TextInput type='text' placeholder='example@example.com' id='email' />
            </div>
            <div className="">
              <Label value='Enter password' />
              <TextInput type='password' placeholder='Password' id='password' />
            </div>
            <Button gradientDuoTone='purpleToBlue' >
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account? </span>
            <Link to='/sign-in' className='text-blue-950 dark:text-white font-bold'>
              Sign In here 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


