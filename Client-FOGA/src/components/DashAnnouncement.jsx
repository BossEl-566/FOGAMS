import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Badge, Spinner, Tooltip, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiTrash2, FiClock } from 'react-icons/fi';

export default function DashAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const {currentUser} = useSelector(state => state.user);

  // Admin check with explicit role verification
  const hasDeletePermission = () => {
    if (!currentUser) return false;
    return currentUser.isAdmin === true || currentUser.isDeptHead === true;
  };

  // Group announcements by week of creation (using createdAt)
  const groupByWeek = (announcements) => {
    const grouped = {};
    
    announcements.forEach(announcement => {
      const createdAt = new Date(announcement.createdAt);
      const weekStart = new Date(createdAt);
      weekStart.setDate(createdAt.getDate() - createdAt.getDay() + (createdAt.getDay() === 0 ? -6 : 1)); // Monday
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); // Sunday
      
      const weekKey = `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      
      if (!grouped[weekKey]) {
        grouped[weekKey] = [];
      }
      grouped[weekKey].push(announcement);
    });
    
    return grouped;
  };

  // Format date and time nicely
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fetch all announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcement/get');
        const data = await response.json();
        if (response.ok) {
          // Sort by createdAt date (newest first)
          const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAnnouncements(sorted);
        } else {
          throw new Error(data.message || 'Failed to fetch announcements');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, []);

  // Fetch single announcement details
  const fetchAnnouncementDetails = async (id) => {
    try {
      const response = await fetch(`/api/announcement/get/${id}`);
      const data = await response.json();
      if (response.ok) {
        setCurrentAnnouncement(data);
        setShowAnnouncementModal(true);
      } else {
        throw new Error(data.message || 'Failed to fetch announcement details');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (id, e) => {
    e.stopPropagation(); // Prevent triggering the card click
    setAnnouncementToDelete(id);
    setShowDeleteModal(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setAnnouncementToDelete(null);
  };

  // Close announcement details modal
  const closeAnnouncementModal = () => {
    setShowAnnouncementModal(false);
    setCurrentAnnouncement(null);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!announcementToDelete) return;
    
    try {
      const response = await fetch(`/api/announcement/delete/${announcementToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        toast.success('Announcement deleted successfully');
        setAnnouncements(prev => prev.filter(a => a._id !== announcementToDelete));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete announcement');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeDeleteModal();
    }
  };

  const groupedAnnouncements = groupByWeek(announcements);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        size="md"
        onClose={closeDeleteModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FiTrash2 className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this announcement?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={closeDeleteModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Announcement Details Modal */}
      <Modal
        show={showAnnouncementModal}
        size="xl"
        onClose={closeAnnouncementModal}
      >
        <Modal.Header>
          {currentAnnouncement?.title || 'Announcement Details'}
        </Modal.Header>
        <Modal.Body>
          {currentAnnouncement && (
            <div className="space-y-4">
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {currentAnnouncement.description}
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <FiClock className="mr-1" />
                  {formatDateTime(currentAnnouncement.createdAt)}
                </div>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {currentAnnouncement.username || 'Unknown'}
                </span>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeAnnouncementModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Announcements</h1>
        <Link to="/announcement/create">
          <Button gradientDuoTone="purpleToBlue">+ New Announcement</Button>
        </Link>
      </div>

      {Object.entries(groupedAnnouncements).length === 0 ? (
        <Card className="text-center py-12">
          <h3 className="text-xl text-gray-500">No announcements yet</h3>
          <Link to="/announcement/create">
            <Button color="light" className="mt-4">Create your first announcement</Button>
          </Link>
        </Card>
      ) : (
        Object.entries(groupedAnnouncements).map(([weekRange, weekAnnouncements]) => (
          <div key={weekRange} className="mb-12">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {weekRange}
              </h2>
              <Badge color="gray" className="ml-2">{weekAnnouncements.length} announcements</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weekAnnouncements.map(announcement => (
                <Card 
                  key={announcement._id} 
                  className="group hover:shadow-lg transition-shadow dark:bg-gray-800 relative cursor-pointer"
                  onClick={() => fetchAnnouncementDetails(announcement._id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
                      {announcement.title}
                    </h3>
                    {hasDeletePermission() && (
                      <Tooltip content="Delete announcement">
                        <Button 
                          size="xs" 
                          color="failure" 
                          pill
                          onClick={(e) => openDeleteModal(announcement._id, e)}
                          className="transition-opacity absolute top-2 right-2"
                        >
                          <FiTrash2 />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {announcement.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <FiClock className="mr-1" />
                      {formatDateTime(announcement.createdAt)}
                    </div>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {announcement.username || 'Unknown'}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}