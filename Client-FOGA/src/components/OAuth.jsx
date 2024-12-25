import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'; 
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../radux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import React Hot Toast

export default function OAuth() {
  const auth = getAuth(app); // Initialize the auth object
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // Sign in with Google popup
      const resultFromGoogle = await signInWithPopup(auth, provider);
      
      // Send user data to backend
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });

      const data = await response.json();
      
      // Dispatch success action and navigate to home
      if (response.ok) {
        dispatch(signInSuccess(data));
        toast.success('Signed in successfully!'); // Show success toast
        navigate('/');
      } else {
        toast.error('Failed to sign in. Please try again.'); // Show error toast if response is not ok
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during sign-in. Please try again.'); // Show error toast if an error occurs
    }
  };

  return (
    <Button type="button" gradientDuoTone="purpleToBlue" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
