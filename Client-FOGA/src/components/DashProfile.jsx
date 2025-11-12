import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, TextInput } from 'flowbite-react';
import { Client, Storage } from 'appwrite';
import { updateStart, updateSuccess, updateFailure, signoutSuccess, signInSuccess } from '../radux/user/userSlice';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function DashProfile() {
  const { currentUser, loading } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadImageError, setUploadImageError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
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
      .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    const storage = new Storage(client);

    try {
      const response = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        "unique()",
        imageFile
      );
      
      const imageUrl = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        response.$id
      ).href;
      console.log(imageUrl);

      setImageFileUrl(imageUrl);
      setFormData({ ...formData, profilePicture: imageUrl });
      setUploadImageError(null);
      dispatch(updateSuccess({ ...currentUser, profilePicture: imageUrl }));
      toast.success('Profile picture uploaded successfully');
    } catch (error) {
      setUploadImageError('Image upload failed. Image should be less than 5MB.');
      toast.error('Image upload failed. Image should be less than 5MB.');
      setImageFile(null);
      setImageFileUrl(null);
    } finally {
      setImageFileUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      toast.error('No changes made');
      return;
    }
    if (imageFileUploading) {
      toast.error('Please wait for image upload to complete');
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
        throw new Error(data.message);
      }
      console.log(data);
      dispatch(updateSuccess(data));
      dispatch(signInSuccess(data)); // Update local storage user data as well
      toast.success('Profile updated successfully');
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('api/user/signout', {
        method: 'POST',
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      
      dispatch(signoutSuccess());
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="rounded-xl shadow-lg w-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center md:w-1/3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            <div
              className="w-40 h-40 cursor-pointer relative group"
              onClick={() => filePickerRef.current.click()}
            >
              <img
                src={imageFileUrl || currentUser.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-gray-200 dark:border-gray-600"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">Change Photo</span>
              </div>
            </div>
            {imageFileUploading && (
              <p className="mt-2 text-sm text-blue-600">Uploading image...</p>
            )}
            {uploadImageError && (
              <p className="mt-2 text-sm text-red-600">{uploadImageError}</p>
            )}
          </div>

          {/* Profile Form Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile Settings</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <TextInput
                  id="username"
                  defaultValue={currentUser.username}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <TextInput
                  type="email"
                  id="email"
                  defaultValue={currentUser.email}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <TextInput
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="w-full"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Leave blank to keep current password</p>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  color="light"
                  onClick={handleSignout}
                  className="px-6"
                >
                  Sign Out
                </Button>
                <Button
                  type="submit"
                  gradientDuoTone="purpleToBlue"
                  disabled={loading || imageFileUploading}
                  className=""
                outline>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}