import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            toast.error('Comment cannot be empty');
            return;
        }
        if (comment.length > 200) {
            toast.error('Comment cannot exceed 200 characters');
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    content: comment,
                    postId,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment(''); // Reset the comment textarea
                setCommentError(null);
                setComments([data, ...comments]); // Update the comments list
                toast.success('Comment added successfully');
            } else {
                toast.error('Error submitting comment');
                console.error('Error submitting comment:', data.message);
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error:', error);
            setCommentError(error.message);
        }
    };
    
    useEffect(() => {
        const getComments = async () => {
            try {
               const res = await fetch(`/api/comment/getPostComment/${postId}`); 
               if (res.ok) {
                   const data = await res.json();
                   setComments(data);
               }
            } catch (error) {
               console.error('Error:', error); 
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
    
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) =>
                    comment._id === commentId
                        ? { ...comment, likes: data.likes, numberOfLikes: data.likes.length }
                        : comment
                ));
                toast.success('Comment liked');
            }
        } catch (error) {
            toast.error('Error liking comment');
            console.error('Error:', error);
        }
    };

    const handleEdit = async (comment, editedContent) => {
        setComments(comments.map((c) => (c._id === comment._id ? { ...c, content: editedContent } : c)));
        toast.success('Comment edited');
    };

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId));
                toast.success('Comment deleted successfully');
            }
        } catch (error) {
            toast.error('Error deleting comment');
            console.error('Error:', error);
        }
    };
  
    return (
        <div className="max-w-2xl mx-auto w-full p-2">
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-xs">
                    <p>Signed in as:</p>
                    <img
                        src={currentUser.profilePicture}
                        alt="profile"
                        className="h-5 w-5 object-cover rounded"
                    />
                    <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-500 hover:underline">
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-gray-600 my-5 flex gap-1">
                    <p>Sign in to comment</p>
                    <Link to={'/sign-in'} className="text-teal-500 hover:underline">
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={handleSubmit} className="border border-gray-400 rounded-md p-3">
                    <Textarea
                        placeholder="Leave a comment..."
                        className="w-full"
                        rows="3"
                        maxLength="200"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        aria-label="Comment Input"
                    />
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-gray-500 text-xs">{200 - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone="purpleToBlue" type="submit">
                            Submit
                        </Button>
                    </div>
                    {commentError && <Alert color='failure' className='mt-5'>{commentError}</Alert>}
                </form>
            )}
            {comments.length === 0 ? (
                <p className='text-sm my-5'>
                   No comment yet. Be the first to comment. 
                </p>
            ): (
                <>
                <div className="text-sm my-5 flex items-center gap-1">
                  <p>Comments</p> 
                  <div className="border border-gray-400 py-1 px-2 rounded-sm">
                    <p>
                    { comments.length }
                    </p>
                    </div> 
                </div>
                {
                    comments.map(
                      comment => (
                        <Comments key={comment._id}
                        comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={ 
                            (commentId) => {
                                setShowModal(true)
                                setCommentToDelete(commentId)
                            }
                        }/>  
                    ))
                }
                </>
            )}
            <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
                    <Modal.Header/>
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                          Are you sure you want to delete this comment?
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button color='failure' onClick={() =>handleDelete(commentToDelete)}>Yes I'm Sure</Button>
                          <Button color='gray' onClick={()=>setShowModal(false)}>Cancel</Button>
                        </div>
                      </div>
                      </Modal.Body>
                  </Modal>
        </div>
    );
}
