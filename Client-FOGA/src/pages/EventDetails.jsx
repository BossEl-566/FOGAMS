import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = location.state || {};
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/event/get/${eventId}`);
        if (!response.ok) throw new Error('Event not found');
        const eventData = await response.json();
        setEvent(eventData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    } else {
      setError('No event ID provided');
      setLoading(false);
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Event</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <div className="text-gray-500 text-2xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-4">The requested event could not be found</p>
          <button 
            onClick={() => navigate('/events')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse All Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const isPastEvent = eventDate < new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to events
        </button>

        {/* Event header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isPastEvent 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {isPastEvent ? 'Past Event' : 'Upcoming Event'}
            </span>
            {event.category && (
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {event.category}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <FiCalendar className="mr-2 text-blue-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2 text-blue-500" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-2 text-blue-500" />
              <span>{event.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Event content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          {event.imageUrl && (
            <div className="h-64 sm:h-96 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6 sm:p-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
              <p className="text-gray-700 mb-6">{event.description}</p>
              
              {event.additionalDetails && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Additional Information</h3>
                  <p className="text-gray-700 whitespace-pre-line">{event.additionalDetails}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {isPastEvent ? 'Missed this event?' : 'Want to join us for this event?'}
          </h2>
          <p className="text-gray-700 mb-4">
            {isPastEvent 
              ? 'Check our upcoming events schedule for similar gatherings'
              : 'Contact us for more information or to register'}
          </p>
          <button
            onClick={() => navigate(isPastEvent ? '/events' : '/contact')}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isPastEvent ? 'View Upcoming Events' : 'Contact Our Team'}
          </button>
        </div>
      </div>
    </div>
  );
}