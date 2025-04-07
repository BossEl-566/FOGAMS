import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiFilter, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Event() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    month: 'all',
    status: 'upcoming'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/event/get');
        if (!response.ok) throw new Error('Failed to fetch events');
        const { data } = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on selected filters
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    
    // Status filter
    if (filters.status === 'upcoming' && eventDate < now) return false;
    if (filters.status === 'past' && eventDate >= now) return false;
    
    // Month filter
    if (filters.month !== 'all') {
      const eventMonth = eventDate.getMonth();
      return eventMonth === parseInt(filters.month);
    }
    
    return true;
  });

  // Group events by month
  const eventsByMonth = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

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
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Events</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4"
          >
            Church Events
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for worship, fellowship, and spiritual growth
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
              {filteredEvents.length} Events Found
            </h2>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiFilter className="mr-2" />
                Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Status
                </label>
                <select
                  id="status"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="upcoming">Upcoming Events</option>
                  <option value="past">Past Events</option>
                  <option value="all">All Events</option>
                </select>
              </div>

              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                  Month
                </label>
                <select
                  id="month"
                  value={filters.month}
                  onChange={(e) => setFilters({...filters, month: e.target.value})}
                  className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Months</option>
                  {[...Array(12).keys()].map(month => (
                    <option key={month} value={month}>
                      {new Date(0, month).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Events List */}
        {Object.keys(eventsByMonth).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(eventsByMonth).map(([monthYear, monthEvents]) => (
              <div key={monthYear}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {monthYear}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {monthEvents.map(event => {
                    const eventDate = new Date(event.date);
                    const formattedDate = eventDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    });
                    const formattedTime = eventDate.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    const isPast = eventDate < new Date();

                    return (
                      <motion.div
                        key={event._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                      >
                        {event.imageUrl && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isPast ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {isPast ? 'Past Event' : 'Upcoming'}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-600">
                              <FiCalendar className="mr-2 text-blue-500" />
                              <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FiClock className="mr-2 text-blue-500" />
                              <span>{formattedTime}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FiMapPin className="mr-2 text-blue-500" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <Link 
                            to={`/events/${event._id}`}
                            state={{ eventId: event._id }}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            View Details <FiArrowRight className="ml-1" />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your filters or check back later</p>
            <div className="mt-6">
              <button
                onClick={() => setFilters({ month: 'all', status: 'upcoming' })}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}