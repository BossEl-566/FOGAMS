import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Badge } from 'flowbite-react';
import { CiCalendarDate, CiEdit } from 'react-icons/ci';
import { HiOutlineExclamationCircle, HiPlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiArrowNarrowRight, HiLocationMarker, HiClock } from 'react-icons/hi';
import { format } from 'date-fns';

export default function DashEvents() {
  const { currentUser } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event/get');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteModal = (eventId) => {
    setEventToDelete(eventId);
    setShowModal(true);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`/api/event/delete/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      const data = await response.json();
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      toast.success('Event deleted successfully!');
      setShowModal(false);
    } catch (err) {
      console.error('Error deleting event:', err);
      toast.error('An error occurred while deleting the event');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error fetching events: {error.message}
      </div>
    );
  }

  // Group events by month
  const groupedEvents = events.reduce((acc, event) => {
    const monthYear = format(new Date(event.date), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Upcoming Events</h1>
        {currentUser?.isAdmin && (
          <Link to="/add-event">
            <Button gradientDuoTone="purpleToBlue" className="flex items-center gap-2">
              <HiPlus className="text-lg" />
              Add Event
            </Button>
          </Link>
        )}
      </div>

      {Object.keys(groupedEvents).length > 0 ? (
        Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
          <div key={monthYear} className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 border-b pb-2">
              {monthYear}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthEvents.map((event) => (
                <Card key={event._id} className="hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">
                        <CiCalendarDate className="text-purple-600 dark:text-purple-300 text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {format(new Date(event.date), 'EEEE, MMMM do')}
                        </p>
                      </div>
                    </div>
                    {new Date(event.date) > new Date() && (
                      <Badge color="success" className="ml-2">
                        Upcoming
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">{event.description}</p>

                  <div className="space-y-2">
                    {event.location && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <HiLocationMarker className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.time && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <HiClock className="mr-2" />
                        <span>{event.time}</span>
                      </div>
                    )}
                  </div>

                  {currentUser?.isAdmin && (
                    <div className="flex justify-end space-x-2 mt-4">
                      <Link to={`/edit-event/${event._id}`}>
                        <Button size="xs" gradientDuoTone="cyanToBlue">
                          <CiEdit className="mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        size="xs"
                        color="failure"
                        onClick={() => handleDeleteModal(event._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <CiCalendarDate className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
            No events scheduled
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Check back later or add a new event
          </p>
          {currentUser?.isAdmin && (
            <Link to="/add-event">
              <Button gradientDuoTone="purpleToBlue" className="flex items-center gap-2 mx-auto">
                <HiPlus className="text-lg" />
                Add Your First Event
              </Button>
            </Link>
          )}
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this event?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(eventToDelete)}>
                Yes, I'm Sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}