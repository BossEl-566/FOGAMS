import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiStar, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { Button, Textarea, TextInput } from 'flowbite-react';

export default function ViewNotepad() {
    const location = useLocation();
    const navigate = useNavigate();
    const notepadId = location.state?.noteId;
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({
        title: '',
        content: '',
        isFavorite: false
    });

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`/api/notepad/get/${notepadId}`);
                if (!response.ok) throw new Error('Failed to fetch note');
                const data = await response.json();
                setNote(data);
                setIsFavorite(data.isFavorite);
                setEditForm({
                    title: data.title,
                    content: data.content,
                    isFavorite: data.isFavorite
                });
            } catch (error) {
                toast.error(error.message);
                navigate('/notepads');
            } finally {
                setLoading(false);
            }
        };

        if (notepadId) fetchNote();
    }, [notepadId, navigate]);

    const toggleFavorite = async () => {
        try {
            const response = await fetch(`/api/notepad/patch/${notepadId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isFavorite: !isFavorite })
            });
            
            if (response.ok) {
                setIsFavorite(!isFavorite);
                setEditForm(prev => ({ ...prev, isFavorite: !isFavorite }));
                toast.success(!isFavorite ? 'Added to favorites' : 'Removed from favorites');
            }
        } catch (error) {
            toast.error('Failed to update favorite status');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/notepad/delete/${notepadId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                toast.success('Note deleted successfully');
                navigate('/dashboard?tab=notepad');
            }
        } catch (error) {
            toast.error('Failed to delete note');
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/notepad/update/${notepadId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            
            if (response.ok) {
                const updatedNote = await response.json();
                setNote(updatedNote);
                setIsFavorite(updatedNote.isFavorite);
                toast.success('Note updated successfully');
                setShowEditModal(false);
            }
        } catch (error) {
            toast.error('Failed to update note');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center p-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Note Not Found</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    The note you're looking for doesn't exist or may have been deleted.
                </p>
                <Button onClick={() => navigate('/dashboard?tab=notepad')} gradientDuoTone="purpleToBlue">
                    Back to Notepads
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                Delete Note
                            </h3>
                            <button 
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Are you sure you want to delete this note? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <Button 
                                onClick={() => setShowDeleteModal(false)}
                                color="gray"
                                className="hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleDelete}
                                color="failure"
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Note Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                Edit Note
                            </h3>
                            <button 
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="edit-title" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <TextInput
                                    id="edit-title"
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                    required
                                    className="w-full"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="edit-content" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Content
                                </label>
                                <Textarea
                                    id="edit-content"
                                    rows={8}
                                    value={editForm.content}
                                    onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                                    required
                                    className="w-full"
                                />
                            </div>
                            
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setEditForm({...editForm, isFavorite: !editForm.isFavorite})}
                                    className="mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    aria-label={editForm.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    {editForm.isFavorite ? (
                                        <FaStar className="text-yellow-400 text-xl" />
                                    ) : (
                                        <FiStar className="text-gray-400 dark:text-gray-500 text-xl" />
                                    )}
                                </button>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {editForm.isFavorite ? 'Favorite' : 'Add to favorites'}
                                </span>
                            </div>
                            
                            <div className="flex justify-end space-x-3 pt-4">
                                <Button 
                                    onClick={() => setShowEditModal(false)}
                                    color="gray"
                                    className="hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit"
                                    gradientDuoTone="purpleToBlue"
                                    className="flex items-center"
                                >
                                    <FiSave className="mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate('/dashboard?tab=notepad')}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-4"
                    >
                        <FiArrowLeft className="text-gray-700 dark:text-gray-300 text-xl" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">View Note</h1>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* Note Header */}
                    <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white break-words">
                                {note.title}
                            </h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={toggleFavorite}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    {isFavorite ? (
                                        <FaStar className="text-yellow-400 text-xl" />
                                    ) : (
                                        <FiStar className="text-gray-400 dark:text-gray-500 text-xl" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    aria-label="Edit note"
                                >
                                    <FiEdit2 className="text-gray-700 dark:text-gray-300 text-xl" />
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    aria-label="Delete note"
                                >
                                    <FiTrash2 className="text-gray-700 dark:text-gray-300 text-xl" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Last updated: {new Date(note.updatedAt).toLocaleString()}
                        </div>
                    </div>

                    {/* Note Content */}
                    <div className="p-6">
                        <div className="prose dark:prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">
                                {note.content}
                            </pre>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex justify-end space-x-3">
                            <Button 
                                onClick={() => navigate('/dashboard?tab=notepad')} 
                                color="gray"
                                className="hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                                Back to List
                            </Button>
                            <Button 
                                onClick={() => setShowEditModal(true)}
                                gradientDuoTone="purpleToBlue"
                            >
                                Edit Note
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}