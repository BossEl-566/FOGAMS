import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            return alert('Comment cannot be empty');
        }
        if (comment.length > 200) {
            return alert('Comment cannot exceed 200 characters');
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
                setComment('');
                setCommentError(null);
            } else {
                console.error('Error submitting comment:', data.message);
                alert('Error submitting comment');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again.');
            setCommentError(error.message);
        }
    };

    // Properly return the JSX here
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
        </div>
    );
}
