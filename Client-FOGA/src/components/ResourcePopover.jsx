import React, { useState, useEffect } from 'react'; 
import { Button, TextInput, FileInput } from 'flowbite-react'; 
import { AiOutlineClose } from 'react-icons/ai'; 
import { toast } from 'react-hot-toast'; // Ensure you have this installed 
import { Spinner } from 'flowbite-react'; // Import Flowbite's Spinner component 
import { Client, Storage } from 'appwrite'; // Import Appwrite SDK for file upload

export default function ResourcePopover({ onClose }) {
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true); // State to manage popup visibility

  const handleUploadFile = async () => {
    const { file } = formData;

    // Check if a file is selected
    if (!file) {
      setImageUploadError('Please select a file');
      toast.error('Please select a file');
      return;
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit!');
      return;
    }

    try {
      setImageUploadError(null);
      setIsUploading(true);
      
      // Initialize Appwrite client
      const client = new Client();
      const storage = new Storage(client);

      client
        .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT) // Appwrite endpoint
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

      const response = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID, // Replace with your bucket ID
        'unique()', // File ID (use 'unique()' for auto-generation)
        file // The file to upload
      );

      const fileUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID, response.$id);
      setFormData((prevData) => ({ ...prevData, fileUrl: fileUrl.href })); // Update the form data with the file URL
      toast.success('File uploaded successfully!');
      console.log('File URL:', fileUrl.href);
      console.log('Form Data:', formData);
    } catch (error) {
      setFormData({ ...formData, fileUrl: '' }); // Reset the file URL in case of error
      setImageUploadError('An error occurred while uploading the file');
      console.error('Error uploading file:', error);
      toast.error('An error occurred while uploading the file');
    } finally {
      setIsUploading(false); // Reset uploading status
    }
  };

  useEffect(() => {
    if (formData.fileUrl) {
      console.log('Form Data Updated:', formData); // Log updated form data
    }
  }, [formData.fileUrl]); // This runs whenever fileUrl changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); // Set saving state to true
  
    // Prepare the data you're going to send
    const requestData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      fileUrl: formData.fileUrl, // Only sending fileUrl
    };
  
    // Log the data you're sending
    console.log("Data being sent to the server:", requestData);
  
    try {
      const res = await fetch('/api/resource/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData), // Send the data
      });
  
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        toast.error(data.message);  // Display toast error
      }
      if (res.ok) {
        toast.success('Message published successfully!');  // Display toast success
        setIsPopupOpen(false); // Close the popup by setting state to false
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form');  // Display toast error
      setPublishError('An error occurred while submitting the form');
    } finally {
      setIsSaving(false); // Reset saving status
    }
  };

  if (!isPopupOpen) return null; // If popup is closed, return null to hide it

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg relative max-w-3xl w-full dark:text-white overflow-y-auto max-h-[80vh]">
        <button
          onClick={() => setIsPopupOpen(false)} // Close the popover on button click
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
        >
          <AiOutlineClose className="text-2xl" />
        </button>
        <div className="p-3">
          <h1 className="text-center font-semibold text-3xl my-7">Upload Resource</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
              <TextInput
                type="text"
                placeholder="Title"
                required
                id="title"
                className="flex-1"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <TextInput
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            
            <textarea
              placeholder="Description"
              rows={4}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>

            <div className="flex gap-4 items-center justify-between border-[1px] border-blue-900 p-3">
              <FileInput
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setFormData({ ...formData, file: selectedFile });
                  }
                }}
                accept="image/*,application/pdf,application/msword,application/vnd.ms-excel" // Allow image, pdf, word, excel files
              />
              <Button
                type="button"
                gradientDuoTone="purpleToBlue"
                size="sm"
                outline
                onClick={handleUploadFile} // Upload only on button click
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload File'}
              </Button>
            </div>
            {imageUploadError && toast.error(imageUploadError)}
            {formData.file && (
              <div className="mt-4">
                <p className="text-center">{formData.file.name}</p>
                <p className="text-center text-sm text-gray-600">{`Size: ${(formData.file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
              </div>
            )}
            <Button type="submit" gradientDuoTone="purpleToBlue" disabled={isSaving}>
              {isSaving ? (
                <Spinner aria-label="Saving..." size="sm" />
              ) : (
                'Save Resource'
              )}
            </Button>
            {publishError && toast.error(publishError)}
          </form>
        </div>
      </div>
    </div>
  );
}
