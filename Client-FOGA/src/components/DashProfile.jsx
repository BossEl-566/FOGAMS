import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, TextInput } from "flowbite-react";
import { Client, Storage } from 'appwrite';
import { updateStart, updateSuccess, updateFailure } from '../radux/user/userSlice';
import { useDispatch } from 'react-redux';
import { set } from 'mongoose';

export default function DashProfile() {
  const { currentUser } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
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
         // Get file preview URL (or use getFileView for original file URL)
    const imageUrl = storage.getFilePreview(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      response.$id // File ID returned from the upload response
    ).href;

    setImageFileUrl(imageUrl); // Update state to show the image
      // console.log('Image uploaded successfully:', response);
      setFormData({ ...formData, profilePicture: imageUrl });
      setImageFileUploading(false);
    } catch (error) {
      setUploadImageError('Image upload failed. Image should be less than 5MB.');
      setImageFile(null);
      setImageFileUrl(null);
      // console.log('Image upload failed:', error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
 const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image upload to complete');
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
      if(!res.ok) {
        setUpdateUserError(data.message);
        dispatch(updateFailure(data.message));
        return;
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('Profile updated successfully');
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
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
        {uploadImageError && <Alert color='failure'>{uploadImageError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/>
        <Button type='submit' outline gradientDuoTone="purpleToBlue">Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer hover:underline'>
          Delete Account
        </span>
        <span className='cursor-pointer hover:underline'>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (<Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>)}
      {updateUserError && (<Alert color='failure' className='mt-5'>{updateUserError}</Alert>)}
    </div>
  );
}
