import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Badge, TextInput, Textarea, FileInput, Spinner } from 'flowbite-react';
import { CiCalendarDate, CiEdit, CiViewList } from 'react-icons/ci';
import { HiOutlineExclamationCircle, HiPlus, HiX } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiLocationMarker, HiClock } from 'react-icons/hi';
import { format } from 'date-fns';
import { Client, Storage } from 'appwrite';

export default function DashEvents() {
  const { currentUser } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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
        window.location.href = '/re-authenticate';
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteModal = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
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
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting event:', err);
      toast.error('An error occurred while deleting the event');

    }
  };

  const handleEditModal = (event) => {
    setEventToEdit(event._id);
    setEditFormData({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      time: event.time || '',
      location: event.location || '',
      imageUrl: event.imageUrl || ''
    });
    setSelectedFile(null);
    setShowEditModal(true);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
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
        selectedFile
      );

      const imageUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID, response.$id);

      setEditFormData(prev => ({ ...prev, imageUrl: imageUrl.href }));
      toast.success('Image uploaded successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred while uploading the image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/event/update/${eventToEdit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      
      const data = await response.json();
      
      // Update the events list
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event._id === eventToEdit ? { ...event, ...editFormData } : event
        )
      );
      
      toast.success('Event updated successfully!');
      setShowEditModal(false);
      setEventToEdit(null);
      setSelectedFile(null);
    } catch (err) {
      console.error('Error updating event:', err);
      toast.error('An error occurred while updating the event');
      window.location.href = '/re-authenticate';
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
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
    <div className="p-3 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Upcoming Events</h1>
        {currentUser?.isAdmin && (
          <Link to="/add-event" className="w-full sm:w-auto">
            <Button gradientDuoTone="purpleToBlue" className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <HiPlus className="text-lg" />
              Add Event
            </Button>
          </Link>
        )}
      </div>

      {Object.keys(groupedEvents).length > 0 ? (
        Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
          <div key={monthYear} className="mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 border-b pb-2">
              {monthYear}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {monthEvents.map((event) => (
                <Card key={event._id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                  {/* Event Image */}
                  {event.imageUrl && (
                    <div className="h-40 sm:h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start flex-grow">
                        <div className="bg-purple-100 dark:bg-purple-900 p-2 sm:p-3 rounded-lg mr-3 flex-shrink-0">
                          <CiCalendarDate className="text-purple-600 dark:text-purple-300 text-xl sm:text-2xl" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {format(new Date(event.date), 'EEEE, MMMM do')}
                          </p>
                        </div>
                      </div>
                      {new Date(event.date) > new Date() && (
                        <Badge color="success" className="ml-2 flex-shrink-0">
                          Upcoming
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {event.location && (
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <HiLocationMarker className="mr-2 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <HiClock className="mr-2 flex-shrink-0" />
                          <span>{event.time}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                      <Link 
                        to={`/events/${event._id}`} 
                        state={{ eventId: event._id }}
                        className="flex items-center text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        <CiViewList className="mr-1 text-lg" />
                        View Details
                      </Link>
                      
                      {currentUser?.isAdmin && (
                        <div className="flex space-x-2">
                          <Button
                            size="xs"
                            gradientDuoTone="cyanToBlue"
                            onClick={() => handleEditModal(event)}
                            className="flex items-center"
                          >
                            <CiEdit className="mr-1" />
                            <span className="hidden xs:inline">Edit</span>
                          </Button>
                          <Button
                            size="xs"
                            color="failure"
                            onClick={() => handleDeleteModal(event._id)}
                          >
                            <span className="hidden xs:inline">Delete</span>
                            <HiX className="xs:hidden" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 sm:py-12">
          <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <CiCalendarDate className="text-2xl sm:text-3xl text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
            No events scheduled
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} popup size="sm">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-12 w-12 sm:h-14 sm:w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-4 text-base sm:text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this event?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button color="failure" onClick={() => handleDelete(eventToDelete)} className="w-full sm:w-auto">
                Yes, I'm Sure
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Event Modal */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} size="lg">
        <Modal.Header>Edit Event</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Title
              </label>
              <TextInput
                id="title"
                name="title"
                value={editFormData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter event description"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <TextInput
                  id="date"
                  name="date"
                  type="date"
                  value={editFormData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time
                </label>
                <TextInput
                  id="time"
                  name="time"
                  value={editFormData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 2:00 PM"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <TextInput
                id="location"
                name="location"
                value={editFormData.location}
                onChange={handleInputChange}
                placeholder="Enter event location"
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Image
              </label>
              
              {/* Current Image Preview */}
              {editFormData.imageUrl && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Image:</p>
                  <div className="h-32 overflow-hidden rounded-lg border">
                    <img
                      src={editFormData.imageUrl}
                      alt="Current event"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* File Upload */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                <div className="flex-grow">
                  <FileInput
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full"
                  />
                  {selectedFile && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  outline
                  onClick={handleFileUpload}
                  disabled={isUploading || !selectedFile}
                  className="w-full sm:w-auto"
                >
                  {isUploading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Uploading...
                    </>
                  ) : (
                    'Upload Image'
                  )}
                </Button>
              </div>

              {/* Image URL Display */}
              {editFormData.imageUrl && (
                <div className="mt-2">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL
                  </label>
                  <TextInput
                    id="imageUrl"
                    name="imageUrl"
                    value={editFormData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL will appear here after upload"
                    readOnly
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button 
                color="gray" 
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedFile(null);
                }} 
                className="w-full sm:w-auto"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                gradientDuoTone="purpleToBlue" 
                className="w-full sm:w-auto"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Updating...
                  </>
                ) : (
                  'Update Event'
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}