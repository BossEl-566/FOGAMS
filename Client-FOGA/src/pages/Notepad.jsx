import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function Notepad() {
    const { currentUser } = useSelector((state) => state.user);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error('Please fill in both title and content');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/notepad/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    title,
                    content,
                    isFavorite
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save note');
            }

            setTitle('');
            setContent('');
            setIsFavorite(false);
            toast.success('Note saved successfully!', {
                
            });
        } catch (err) {
            toast.error(err.message || 'Failed to save note', {
                
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Header with glass effect */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-700 p-6 relative">
                        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm"></div>
                        <div className="relative z-10 flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-white">New Note</h1>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="p-2 rounded-full hover:bg-white/20 transition-colors group relative"
                                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 ${isFavorite ? 'text-yellow-300 fill-yellow-300' : 'text-white/70'}`}
                                        viewBox="0 0 20 20"
                                        stroke="currentColor"
                                        strokeWidth={isFavorite ? 0 : 1}
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-full py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {isFavorite ? 'Remove favorite' : 'Add to favorites'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 text-xl font-medium bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                                    placeholder="Note title"
                                    required
                                />
                                <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300" style={{ width: `${(title.length / 50) * 100}%`, maxWidth: '100%' }}></div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="relative h-full">
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={12}
                                    className="w-full px-4 py-3 bg-transparent resize-none focus:outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="Start writing your thoughts here..."
                                    required
                                />
                                <div className="absolute inset-0 border border-gray-200 dark:border-gray-700 rounded-lg pointer-events-none -z-10"></div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-95 flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                        </svg>
                                        Save Note
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}