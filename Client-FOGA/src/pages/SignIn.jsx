import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; 
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../radux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user); // Fixed typo
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('All fields are required'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
        {/* left */}
        <div className="flex-1">
          <Link to='/'>
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
            Welcome to the Fellowship of Grace Assemblies of God Management System. You can sign in to access your account or sign up if you don't have an account.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="">
              <Label value='Enter your email' />
              <TextInput type='email' placeholder='example@example.com' id='email' onChange={handleChange} />
            </div>
            <div className="">
              <Label value='Enter password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-950 dark:text-white font-bold'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}



