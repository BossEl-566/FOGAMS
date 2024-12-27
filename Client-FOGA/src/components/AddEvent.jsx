import { Button, Spinner, TextInput, FileInput } from 'flowbite-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Client, Storage } from 'appwrite'; // Assuming Appwrite SDK is installed

export default function AddEvent() {
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  console.log(formData);

  const handleUploadFile = async () => {
    if (!formData.file) {
      setImageUploadError('Please select a file');
      toast.error('Please select a file');
      return;
    }

    if (formData.file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit!');
      return;
    }

    setIsUploading(true);

    try {
      const client = new Client();
      const storage = new Storage(client);

      client
        .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

      const response = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        'unique()',
        formData.file
      );

      const imageUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID, response.$id);

      setFormData((prevData) => ({ ...prevData, imageUrl: imageUrl.href }));
      toast.success('File uploaded successfully!');
    } catch (error) {
      setImageUploadError('An error occurred while uploading the file');
      toast.error('An error occurred while uploading the file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const requestData = {
        title: formData.title,
        location: formData.location,
        date: formData.date,
        description: formData.description,
        imageUrl: formData.imageUrl,
        };

    console.log('Data being sent to the server:', requestData);

    try {
      const res = await fetch('/api/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      console.log('Data being sent to the server:', requestData);
      const data = await res.json();
      ;

      if (!res.ok) {
        throw new Error(data.message || 'Failed to save event');
      }

      toast.success('Event saved successfully!');
      setFormData({}); // Reset the form data
    } catch (error) {
      setPublishError(error.message);
      toast.error(error.message || 'An error occurred while saving the event');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 pt-4 pb-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-3xl w-full dark:text-white">
        <h1 className="text-center font-semibold text-3xl my-7">Add Events</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
          value={formData.title || ''}
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <TextInput
            type="text"
            value={formData.location || ''}
            placeholder="Location"
            required
            id="location"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select Date"
            className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-1 w-full"
            required
          />

          <textarea
            placeholder="Description"
            rows={4}
            className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>

          <div className="flex gap-4 items-center justify-between border p-3 rounded">
            <FileInput
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              accept="image/*"
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleUploadFile}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </div>

          {formData.file && (
            <div className="mt-4 text-center">
              <p>{formData.file.name}</p>
              <p className="text-sm text-gray-600">
                Size: {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}

          <Button type="submit" gradientDuoTone="purpleToBlue" disabled={isSaving}>
            {isSaving ? <Spinner aria-label="Saving..." size="sm" /> : 'Save Event'}
          </Button>
        </form>
      </div>
    </div>
  );
}
