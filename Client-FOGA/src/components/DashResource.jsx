import React, { useState, useEffect } from 'react'; 
import { Button, Card, Modal } from 'flowbite-react';
import { FaFileUpload, FaFilePdf, FaFileImage, FaFileAlt, FaTrashAlt } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import ResourcePopover from './ResourcePopover';
import { toast } from 'react-hot-toast';

export default function DashResource() {
  const { currentUser } = useSelector((state) => state.user);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // Change to dynamically determine admin status
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 9; // Number of items to fetch per page

  const handleButtonClick = () => {
    setPopoverVisible((prev) => !prev);
  };

  const handleClose = () => setPopoverVisible(false);

  // Fetch resources from the API
  const fetchResources = async (page = 0) => {
    try {
      const response = await fetch(`/api/resource/get?page=${page}&size=${pageSize}`); // Adjust API endpoint for pagination
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();

      if (page === 0) {
        setResources(data.resources);
      } else {
        setResources((prevResources) => [...prevResources, ...data.resources]);
      }

      setShowMore(data.resources.length === pageSize); // Show "Show More" if more items exist
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Determine the file type icon
  const getFileIcon = (url) => {
    if (url.endsWith('.pdf')) return <FaFilePdf className="text-red-600 text-6xl" />;
    if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')) return <FaFileImage className="text-green-600 text-6xl" />;
    return <FaFileAlt className="text-gray-600 text-6xl" />;
  };

  // Open modal for delete confirmation
  const handleDeleteModal = (resourceId) => {
    setCommentToDelete(resourceId);
    setShowModal(true);
  };

  // Delete a resource
  const handleDelete = async (resourceId) => {
    try {
      const response = await fetch(`/api/resource/delete/${resourceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }
      setResources((prevResources) => prevResources.filter((resource) => resource._id !== resourceId));
      toast.success('Resource deleted successfully');
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    } finally {
      setShowModal(false);
    }
  };

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchResources(nextPage);
  };

  return (
    <div className="p-4">
      {/* Add New File Button */}
      {currentUser.isAdmin && (<div className="flex justify-end items-start mb-4">
        <Button
          type="button"
          className="w-auto flex items-center gap-2"
          outline
          gradientDuoTone="purpleToBlue"
          onClick={handleButtonClick}
        >
          <FaFileUpload className="text-lg mr-2" />
          Add New File
        </Button>

        {isPopoverVisible && <ResourcePopover onClose={handleClose} />}
      </div>)}

      {/* Display Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-full text-2xl font-bold text-gray-700 dark:text-gray-300 animate-bounce">Loading resources...</p>
        ) : resources.length === 0 ? (
          <p className="text-center col-span-full text-2xl font-bold text-gray-700 dark:text-gray-300 animate-bounce">No resources available.</p>
        ) : (
          resources.map((resource) => (
            <Card
              key={resource._id}
              className="max-w-sm mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{getFileIcon(resource.fileUrl)}</div>
              <h5 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                {resource.title || 'Untitled'}
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-400 text-center">
                {resource.description || 'No description available.'}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href={resource.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Download File
                </a>
                {currentUser.isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDeleteModal(resource._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Delete
                  </button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Show More Button */}
      {showMore && (
        <button
          className="w-full text-teal-500 self-center text-sm py-7"
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this resource?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(commentToDelete)}>
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
