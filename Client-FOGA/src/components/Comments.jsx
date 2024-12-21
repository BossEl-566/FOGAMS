import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {Button, Textarea} from 'flowbite-react';

export default function Comments({ comment, onLike, onEdit }) {
    const [user, setUser] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

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
        const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
        }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });

            if (res.ok) {

                setIsEditing(false);
                onEdit(comment, editedContent);
            } else {
                console.error('Error updating comment:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            
        }
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
                {isEditing ? (<>
                    <Textarea
                        className="mb-2"
                        onChange={(e) => setEditedContent(e.target.value)}
                        value={editedContent}
                    />
                    <div className="flex justify-end gap-2 text-xs">
                        <Button type='button' size='sm' gradientDuoTone='purpleToBlue' outline onClick={handleSave}>
                            Save
                        </Button>
                        <Button type='button' size='sm' gradientDuoTone='purpleToBlue' onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </div>
                </>
                  
                ) : (
                    <>
                    <p className="text-gray-500">{comment.content}</p>
                <div className='flex items-center pt-2 text-xs dark:border-gray-700 max-w-fit gap-2'>
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
                    {
                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <button className="text-gray-400 hover:text-blue-500" onClick={handleEdit}>
                                Edit
                            </button>
                        ) 
                    }
                </div>
                    </>
                )}
                
            </div>
        </div>
    );
}
