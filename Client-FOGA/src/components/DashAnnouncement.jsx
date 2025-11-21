import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Badge, Spinner, Tooltip, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiTrash2, FiClock, FiUser, FiCalendar, FiPlus } from 'react-icons/fi';

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

  // Mobile-friendly date format
  const formatDateMobile = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Spinner size="xl" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            <FiTrash2 className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Delete Announcement?
            </h3>
            <p className="mb-6 text-gray-500 dark:text-gray-400 text-sm">
              This action cannot be undone. The announcement will be permanently removed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                color="failure" 
                onClick={handleDelete}
                className="flex-1 sm:flex-none"
              >
                Delete
              </Button>
              <Button 
                color="gray" 
                onClick={closeDeleteModal}
                className="flex-1 sm:flex-none"
              >
                Cancel
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
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-blue-500" />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              {currentAnnouncement?.title || 'Announcement Details'}
            </span>
          </div>
        </Modal.Header>
        <Modal.Body className="py-6">
          {currentAnnouncement && (
            <div className="space-y-6">
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-base">
                {currentAnnouncement.description}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiClock className="mr-2" />
                  {formatDateTime(currentAnnouncement.createdAt)}
                </div>
                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                  <FiUser className="mr-2" />
                  {currentAnnouncement.username || 'Unknown'}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <Button 
            onClick={closeAnnouncementModal}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Announcements</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Stay updated with the latest news
              </p>
            </div>
            {currentUser.isAdmin && (
              <Link to="/announcement/create" className="w-full sm:w-auto">
                <Button 
                  gradientDuoTone="purpleToBlue" 
                  className="w-full sm:w-auto flex items-center justify-center"
                >
                  <FiPlus className="mr-2" />
                  New Announcement
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {Object.entries(groupedAnnouncements).length === 0 ? (
          <Card className="text-center py-12 mx-auto max-w-md">
            <div className="flex flex-col items-center space-y-4">
              <FiCalendar className="h-12 w-12 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                No announcements yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Be the first to share important updates with the team.
              </p>
              {currentUser.isAdmin && (
                <Link to="/announcement/create" className="w-full mt-4">
                  <Button gradientDuoTone="purpleToBlue" className="w-full">
                    <FiPlus className="mr-2" />
                    Create Announcement
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedAnnouncements).map(([weekRange, weekAnnouncements]) => (
              <div key={weekRange} className="space-y-4">
                {/* Week Header */}
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {weekRange}
                    </h2>
                  </div>
                  <Badge color="blue" className="px-3 py-1">
                    {weekAnnouncements.length}
                  </Badge>
                </div>

                {/* Announcements Grid */}
                <div className="space-y-4">
                  {weekAnnouncements.map(announcement => (
                    <Card 
                      key={announcement._id} 
                      className="group hover:shadow-lg transition-all duration-200 dark:bg-gray-800 relative cursor-pointer border border-gray-200 dark:border-gray-700"
                      onClick={() => fetchAnnouncementDetails(announcement._id)}
                    >
                      {/* Delete Button */}
                      {hasDeletePermission() && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Tooltip content="Delete announcement">
                            <Button 
                              size="xs" 
                              color="failure" 
                              pill
                              onClick={(e) => openDeleteModal(announcement._id, e)}
                              className="shadow-lg"
                            >
                              <FiTrash2 className="w-3 h-3" />
                            </Button>
                          </Tooltip>
                        </div>
                      )}

                      {/* Content */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between space-x-3">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2 flex-1">
                            {announcement.title}
                          </h3>
                          <Badge color="gray" className="flex-shrink-0 text-xs">
                            {formatDateMobile(announcement.createdAt)}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">
                          {announcement.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <FiClock className="mr-1" />
                            {formatDateTime(announcement.createdAt)}
                          </div>
                          <div className="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400">
                            <FiUser className="mr-1" />
                            {announcement.username || 'Unknown'}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      {currentUser.isAdmin && (
        <div className="fixed bottom-6 right-6 sm:hidden z-20">
          <Link to="/announcement/create">
            <Button 
              gradientDuoTone="purpleToBlue" 
              pill 
              size="lg"
              className="shadow-lg w-14 h-14 flex items-center justify-center"
            >
              <FiPlus className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}