import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, TextInput } from "flowbite-react";
import { Client, Storage } from 'appwrite';
import { updateStart, updateSuccess, updateFailure, deleteUserFailure, deleteUserSuccess, deleteUserStart, signoutSuccess } from '../radux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';  // Importing toast

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Sets file information
      setImageFileUrl(URL.createObjectURL(file)); // Generates a local preview URL
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT) // API Endpoint
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);   // Project ID

    const storage = new Storage(client);

    try {
      const response = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID, // Replace with your actual bucket ID
        "unique()",  // Generate a unique file ID
        imageFile    // File to upload
      );
      setUploadImageError(null);
      const imageUrl = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        response.$id // File ID returned from the upload response
      ).href;

      setImageFileUrl(imageUrl); // Update state to show the image
      setFormData({ ...formData, profilePicture: imageUrl });
      setImageFileUploading(false);
    } catch (error) {
      setUploadImageError('Image upload failed. Image should be less than 5MB.');
      toast.error('Image upload failed. Image should be less than 5MB.'); // Use toast for error
      setImageFile(null);
      setImageFileUrl(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      toast.error('No changes made');  // Use toast for error
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image upload to complete');
      toast.error('Please wait for image upload to complete');  // Use toast for error
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setUpdateUserError(data.message);
        dispatch(updateFailure(data.message));
        toast.error(data.message);  // Use toast for error
        return;
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('Profile updated successfully');
        toast.success('Profile updated successfully');  // Use toast for success
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
      toast.error(error.message);  // Use toast for error
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);  // Use toast for error
      } else {
        dispatch(deleteUserSuccess(data));
        toast.success('Account deleted successfully');  // Use toast for success
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);  // Use toast for error
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('api/user/signout', {
        method: 'POST',
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message);  // Use toast for error
      } else {
        dispatch(signoutSuccess());
        toast.success('Signed out successfully');  // Use toast for success
      }
    } catch (error) {
      toast.error(error.message);  // Use toast for error
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full mb-20'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="file"
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className='rounded-full w-full object-cover h-full border-4 border-[lightgray]'
          />
        </div>
        {uploadImageError && toast.error(uploadImageError)} {/* Use toast for error */}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <div className="relative">
          <TextInput
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
        <Button type='submit' outline gradientDuoTone="purpleToBlue" disabled={loading || imageFileUploading}>
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer hover:underline' onClick={()=>setShowModal(true)}>
          Delete Account
        </span>
        <span onClick={handleSignout} className='cursor-pointer hover:underline'>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && toast.success(updateUserSuccess)} {/* Use toast for success */}
      {updateUserError && toast.error(updateUserError)} {/* Use toast for error */}
      {error && toast.error(error)} {/* Use toast for error */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account? 
            </h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeleteUser}>Yes I'm Sure</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
