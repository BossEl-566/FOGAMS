import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function Announcement() {
  // Access user data from Redux state
  const { currentUser } = useSelector(state => state.user);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate user data exists
    if (!currentUser?._id || !currentUser?.username) {
      toast.error('User information is missing');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date),
        userId: currentUser._id,       // Using _id from user object
        username: currentUser.username // Using username from user object
      };

      console.log('Submission payload:', payload); // Debug log

      const response = await fetch('/api/announcement/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create announcement');
      }

      toast.success('Announcement created successfully!');
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });

    } catch (err) {
      console.error('Error creating announcement:', err);
      toast.error(err.message || 'Failed to create announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create New Announcement</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Share important updates with your community</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 transition-colors duration-200">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                placeholder="Enter announcement title"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                placeholder="Provide details about your announcement"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Announcement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}