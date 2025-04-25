import { Modal, Button, Badge, Avatar, Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle, HiOutlineTrash, HiChevronDown, HiOutlineClock } from 'react-icons/hi';
import { FaRegThumbsUp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function DashComment() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        toast.error('Failed to fetch comments');
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      toast.error('Failed to load more comments');
      console.error(error.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        toast.success('Comment deleted successfully');
        setShowModal(false);
      } else {
        toast.error(data.message || 'Failed to delete comment');
      }
    } catch (error) {
      toast.error('Failed to delete comment');
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, length = 100) => {
    if (!content) return '';
    return content.length > length 
      ? `${content.substring(0, length)}...` 
      : content;
  };

  return (
    <div className="mx-auto px-2 sm:px-4 lg:px-8 py-4 w-full max-w-7xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-3 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
            Comments Management
          </h2>
          <Badge color="indigo" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
            {comments.length} total
          </Badge>
        </div>

        {isLoading ? (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : currentUser.isAdmin && comments.length > 0 ? (
          <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comments.map((comment) => (
                <Card key={comment._id} className="hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        img={comment.userProfilePicture || 'https://via.placeholder.com/40'}
                        rounded
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {comment.username}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <HiOutlineClock className="mr-1" />
                          <span>{formatDate(comment.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      color="failure"
                      size="xs"
                      pill
                      className="ml-2"
                    >
                      <HiOutlineTrash />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {truncateContent(comment.content)}
                  </p>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Badge color="purple" className="text-xs">
                      Post: {comment.postId.slice(-6)}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <FaRegThumbsUp className="text-gray-500 dark:text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {comment.numberOfLikes}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {showMore && (
              <div className="px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                <Button
                  onClick={handleShowMore}
                  color="light"
                  className="flex items-center text-xs sm:text-sm"
                >
                  Load more
                  <HiChevronDown className="ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="p-6 text-center">
            <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              {currentUser.isAdmin ? 'No comments found' : 'You need admin privileges to view comments'}
            </div>
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        dismissible
      >
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700" />
        <Modal.Body>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
              <HiOutlineExclamationCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Delete comment
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete this comment? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                color="failure"
                onClick={handleDeleteComment}
                className="px-4 py-2 text-sm"
              >
                Delete
              </Button>
              <Button
                color="light"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}