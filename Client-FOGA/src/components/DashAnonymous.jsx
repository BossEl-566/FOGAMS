import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function DashAnonymous() {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [showUsername, setShowUsername] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/anonymous/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
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
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Member View
  if (!currentUser?.isPastor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 w-full">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {showUsername ? 'Confidential Message' : 'Anonymous Message'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {showUsername 
                    ? 'Your message will include your username' 
                    : 'Your identity will not be shared'}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Type your message here..."
                    required
                  />
                </div>

                <div className="flex items-center mb-6">
                  <input
                    id="show-username"
                    type="checkbox"
                    checked={showUsername}
                    onChange={(e) => setShowUsername(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="show-username" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Show my username to pastor
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    showUsername ? 'Send with My Name' : 'Send Anonymously'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>{showUsername 
                  ? 'Pastor will see your username with this message' 
                  : 'Your identity will remain confidential'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pastor View
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Anonymous Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Confidential messages from church members
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No anonymous messages yet
            </p>
          </div>
        ) : (
          <>
            {/* Message List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {messages.map((msg) => (
                <div 
                  key={msg._id} 
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer border-l-4 ${selectedMessage?._id === msg._id ? 'border-indigo-500' : 'border-transparent'}`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-indigo-600 dark:text-indigo-400">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                      {msg.isShowUsername && (
                        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
                          {msg.username}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 line-clamp-3">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Detail View */}
            {selectedMessage && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Message Details
                    </h2>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {selectedMessage.isShowUsername && (
                    <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                      <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200 mb-1">
                        Member who sent this message:
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-300 font-medium">
                        {selectedMessage.username}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage._id)}
                      disabled={isDeleting}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isDeleting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}