import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Client, Storage } from 'appwrite';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { set } from 'mongoose';
import { useSelector } from 'react-redux';

export default function UpdateDailyBibleMessage() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(''); // To store the file URL
  const [formData, setFormData] = useState({});
    const currentUser = useSelector((state) => state.user.currentUser);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [publishError, setPublishError] = useState(null);
 const { dailyBibleMessageId } = useParams();
 const navigate = useNavigate();
 console.log(dailyBibleMessageId);
 console.log(formData);

    useEffect(() => {
        try {
            const fetchDailyBibleMessage = async () => {
          const res = await fetch(`/api/get-daily-bible-message?dailyBibleMessageId=${dailyBibleMessageId}`);
          const data = await res.json(); 
            if(!res.ok) {
                console.error(data.message);
                setPublishError(data.message);
                return;
            }
            if(res.ok) {
                setPublishError(null);
                setFormData(data.dailyBibleMessage[0]);
            } 
        }
            fetchDailyBibleMessage();
        } catch (error) {
            console.error('Error fetching daily bible message:', error);
            alert('An error occurred while fetching the daily bible message');
            
        }
    }, [dailyBibleMessageId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
     }
      setImageUploadError(null);
      setIsUploading(true);
      const client = new Client();
      const storage = new Storage(client);

      client
        .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT) // Your Appwrite endpoint
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

      const response = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID, // Replace with your bucket ID
        'unique()', // File ID (use 'unique()' for auto-generation)
        file // The file to upload
      );

      

      // Get the file URL after successful upload
      const fileUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID, response.$id);
      setFileUrl(fileUrl.href); // Save the URL to state
      setFormData({ ...formData, image: fileUrl.href }); // Update the form data
     
    
    } catch (error) {
        setFormData({ ...formData, image: '' }); // Reset the image URL
      setImageUploadError('An error occurred while uploading the image');
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the image');
    }finally {
        setIsUploading(false); // Reset uploading status
      }
  };
  useEffect(() => {
    if (fileUrl) {
      setFormData((prevData) => ({ ...prevData, image: fileUrl }));
      console.log('Form Data Updated:', formData); // Log updated form data
    }
  }, [fileUrl]); // This runs whenever fileUrl changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/update-daily-bible-message/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok) {
        setPublishError(data.message)
      }
      if (res.ok) {
       
        navigate(`/daily-bible-message/${data.slug}`);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
      setPublishError('An error occurred while submitting the form');
      
    }
  }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen mb-20'>
      <h1 className='text-center font-semibold text-3xl my-7'>Update Daily Bible Message</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => setFormData({...formData, title: e.target.value})}
            value={formData.title} />
            
          <Select
          onChange={(e) => setFormData({...formData, category: e.target.value})} // Update the form data on change
            value={formData.category} // Set the value of the select input
          >
            <option value='uncategorized'>Select a category</option>
            <option value='Faith and Hope'>Faith and Hope</option>
            <option value='Love and Forgiveness'>Love and Forgiveness</option>
            <option value='Prayer and Spiritual Growth'>Prayer and Spiritual Growth</option>
            <option value='Wisdom and Guidance'>Wisdom and Guidance</option>
            <option value='Salvation and Thanksgiving'>Salvation and Thanksgiving</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-[1px] border-blue-900 p-3">
          <FileInput type="file" onChange={(e) => setFile(e.target.files[0])} accept='image/*'/>
          <Button 
            type='button' 
            gradientDuoTone='purpleToBlue' 
            size='sm' 
            outline 
            onClick={handleUploadImage} // Upload only on button click
            disabled={isUploading || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>   
        </div>
        {imageUploadError && (
                <Alert color='failure' >
                    {imageUploadError}
                </Alert>
            )}
            {formData.image && (
                <img src={formData.image} alt='Uploaded Image' className='w-full h-72 mx-auto mt-4 object-cover' />
            )}
        <ReactQuill theme="snow" placeholder='Write your inspiring message here...' className='h-72 mb-12' required onChange={(value)=>{
          setFormData({...formData, content: value});
        }} value={formData.content}/>
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
        {publishError && (
                <Alert className='mt-5' color='failure' >
                    {publishError}  
                </Alert>  
            )}
      </form>
    </div>
  );
}
