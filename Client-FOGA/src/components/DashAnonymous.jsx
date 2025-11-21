import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiSend, FiUser, FiEye, FiEyeOff, FiTrash2, FiX, FiMessageCircle, FiClock, FiShield } from 'react-icons/fi';

export default function DashAnonymous() {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [showUsername, setShowUsername] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch messages for pastor
  useEffect(() => {
    if (currentUser?.isPastor) {
      const fetchMessages = async () => {
        try {
          const response = await fetch('/api/anonymous/get');
          if (!response.ok) throw new Error('Failed to fetch messages');
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMessages();
    }
  }, [currentUser?.isPastor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/anonymous/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message.trim(),
          username: currentUser.username,
          isShowUsername: showUsername 
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      toast.success(showUsername 
        ? 'Message sent with your username!' 
        : 'Message sent anonymously!');
      setMessage('');
      setShowUsername(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/anonymous/delete/${messageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete message');

      toast.success('Message deleted successfully');
      setMessages(messages.filter(msg => msg._id !== messageId));
      setSelectedMessage(null);
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = (message) => {
    setSelectedMessage(message);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMessage(null);
  };

  // Format date for mobile
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Member View
  if (!currentUser?.isPastor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 w-full">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 pt-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <FiMessageCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {showUsername ? 'Confidential Message' : 'Anonymous Message'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {showUsername 
                ? 'Your message will include your username' 
                : 'Your identity will remain completely private'}
            </p>
          </div>

          {/* Message Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-4 text-base border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Type your confidential message here..."
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.length}/1000 characters
                    </span>
                  </div>
                </div>

                {/* Privacy Toggle */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${showUsername ? 'bg-indigo-100 dark:bg-indigo-900' : 'bg-gray-200 dark:bg-gray-600'}`}>
                        {showUsername ? (
                          <FiEye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        ) : (
                          <FiEyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {showUsername ? 'Show my identity' : 'Stay anonymous'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {showUsername 
                            ? 'Pastor will see your username' 
                            : 'Your identity will be hidden'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowUsername(!showUsername)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        showUsername ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          showUsername ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-xl transition-all duration-200 disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      <span>
                        {showUsername ? 'Send with My Name' : 'Send Anonymously'}
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Privacy Notice */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <FiShield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Your privacy is protected
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      {showUsername 
                        ? 'Only the pastor will see your identity. Your message is confidential.'
                        : 'Your identity is completely hidden. The pastor will only see your message.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pastor View
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
              <FiMessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Anonymous Messages
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Confidential messages from members
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Delete Message?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This action cannot be undone. The message will be permanently deleted.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteMessage(selectedMessage._id)}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <FiTrash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading messages...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Anonymous messages from members will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Message List */}
            <div className="space-y-3">
              {messages.map((msg) => (
                <div 
                  key={msg._id} 
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4 ${
                    selectedMessage?._id === msg._id 
                      ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-20' 
                      : 'border-transparent'
                  } transition-all duration-200 cursor-pointer hover:shadow-md`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <FiClock className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                      {msg.isShowUsername && (
                        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full flex items-center space-x-1">
                          <FiUser className="w-3 h-3" />
                          <span>{msg.username}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 line-clamp-3 text-sm leading-relaxed">
                      {msg.message}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {msg.message.length > 200 ? 'Tap to read more' : 'Tap to view'}
                      </span>
                      {!msg.isShowUsername && (
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center space-x-1">
                          <FiEyeOff className="w-3 h-3" />
                          <span>Anonymous</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Detail View */}
            {selectedMessage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-40">
                <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-transform">
                  {/* Header */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Message Details
                    </h2>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="overflow-y-auto p-4 space-y-4">
                    {/* Metadata */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <FiClock className="w-4 h-4" />
                          <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message Content */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </div>

                    {/* Sender Info if Available */}
                    {selectedMessage.isShowUsername && (
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiUser className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                            Sent by:
                          </h3>
                        </div>
                        <p className="text-indigo-700 dark:text-indigo-300 font-medium">
                          {selectedMessage.username}
                        </p>
                      </div>
                    )}

                    {/* Delete Button */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => openDeleteModal(selectedMessage)}
                        className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span>Delete Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}