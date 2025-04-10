import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaEnvelope, FaUser, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function DashContact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/contact/get');
        const data = await response.json();
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Filter messages based on search term
  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete confirmation
  const confirmDelete = (message) => {
    setMessageToDelete(message);
    setShowDeleteModal(true);
  };

  // Delete a message
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/contact/delete/${messageToDelete._id}`, { method: 'DELETE' });
  
      if (!response.ok) {
        toast.error('Failed to delete message');
        return;
      }
  
      toast.success('Message deleted successfully');
      setMessages(messages.filter(message => message._id !== messageToDelete._id));
      setShowDeleteModal(false);
    } catch (error) {
      toast.error('Failed to delete message');
      setShowDeleteModal(false);
      console.error('Error deleting message:', error);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center w-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 w-full transition-colors duration-200">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Delete Message</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this message from {messageToDelete?.name}?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Contact Messages</h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96 mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white transition-colors"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Messages List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              {messages.length === 0 ? 'No messages yet' : 'No messages match your search'}
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMessages.map((message) => (
                <li key={message._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                          <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white">{message.subject}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <FaUser className="mr-1" /> {message.name} &middot; {message.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => confirmDelete(message)}
                          className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                          title="Delete message"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 pl-16">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{message.message}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}