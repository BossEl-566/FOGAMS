import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { CiCalendarDate } from 'react-icons/ci';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Timeline } from 'flowbite-react';
import toast from 'react-hot-toast';
import { HiArrowNarrowRight } from 'react-icons/hi';

export default function DashEvents() {
  const { currentUser } = useSelector((state) => state.user);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event/get'); // Adjust the API endpoint if necessary
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched events:', data);
        setEvents(data.data); // Adjust based on your API response structure
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle delete confirmation modal
  const handleDeleteModal = (eventId) => {
    setEventToDelete(eventId);
    setShowModal(true);
  };

  // Handle delete event
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`/api/event/delete/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      const data = await response.json();
      console.log('Event deleted:', data);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      toast.success('Event deleted successfully!');
      setShowModal(false); // Close modal after deletion
    } catch (err) {
      console.error('Error deleting event:', err);
      toast.error('An error occurred while deleting the event');
    }
  };

  if (loading) {
    return <div className="p-4">Loading events...</div>;
  }

  if (error) {
    return <div className="p-4">Error fetching events: {error.message}</div>;
  }

  return (
    <div className="p-4">
      {/* Add New Event Button */}
      {currentUser?.isAdmin && (
        <Link to="/add-event">
          <div className="flex justify-end items-start mb-4 gap-2">
            <Button
              type="button"
              className="w-auto flex items-center gap-2"
              outline
              gradientDuoTone="purpleToBlue"
            >
              <CiCalendarDate className="text-xl mr-2" />
              Add New Event
            </Button>
          </div>
        </Link>
      )}

      {/* Timeline */}
      <Timeline>
        {events.length > 0 ? (
          events.map((event) => (
            <Timeline.Item key={event._id}>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>{new Date(event.date).toLocaleDateString()}</Timeline.Time>
                <Timeline.Title>{event.title}</Timeline.Title>
                <Timeline.Body>{event.description}</Timeline.Body>
                {currentUser.isAdmin && (
                  <Button color="red" onClick={() => handleDeleteModal(event._id)}>
                    Delete
                  </Button>
                )}
              </Timeline.Content>
            </Timeline.Item>
          ))
        ) : (
          <div>No events available</div>
        )}
      </Timeline>

      {/* Delete Confirmation Modal */}
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
