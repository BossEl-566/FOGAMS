import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Comments({ comment, onLike }) {
    const [user, setUser] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUser();
    }, [comment]);

    useEffect(() => {
        // Check if the current user has liked the comment
        if (currentUser && comment.likes.includes(currentUser._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [currentUser, comment]);

    const handleLike = () => {
        setIsLiked(!isLiked); // Optimistically update the UI
        onLike(comment._id); // Trigger the like function
    };

    return (
        <div className="flex p-4 dark:border-gray-600 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-10 h-10 rounded-full bg-gray-200"
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs truncate">
                        {user ? `@${user.username}` : 'anonymous user'}
                    </span>
                    <span className="text-gray-500 text-xs">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                <p className="text-gray-500">{comment.content}</p>
                <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                    <button
                        type="button"
                        onClick={handleLike}
                        className={`text-gray-400 hover:text-blue-500 ${
                            isLiked && '!text-blue-500'
                        }`}
                    >
                        <FaThumbsUp className="text-sm" />
                    </button>
                    <p className='text-gray-400'>
                        {comment.numberOfLikes > 0 && comment.numberOfLikes + " " 
                        + (comment.numberOfLikes === 1 ? "like" : "likes")} 
                    </p>
                </div>
            </div>
        </div>
    );
}
