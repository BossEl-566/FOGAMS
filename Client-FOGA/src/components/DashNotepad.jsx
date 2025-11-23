import { Button, Card, Spinner, Tooltip } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function DashNotepad() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notepad/get');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        toast.error('Failed to fetch notes');
        console.error(error.message);
        window.location.href = '/re-authenticate';
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const toggleFavorite = async (noteId, currentStatus) => {
    try {
      const response = await fetch(`/api/notepad/patch/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !currentStatus })
      });
      
      if (response.ok) {
        setNotes(notes.map(note => 
          note._id === noteId ? { ...note, isFavorite: !currentStatus } : note
        ));
        toast.success(currentStatus ? 'Removed from favorites' : 'Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update note');
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteNotes = filteredNotes.filter(note => note.isFavorite);
  const regularNotes = filteredNotes.filter(note => !note.isFavorite);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Notepads</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Link to="/create/notepad" className="w-full sm:w-auto">
            <Button gradientDuoTone="purpleToBlue" className="w-full">
              <FaPlus className="mr-2" />
              Create New
            </Button>
          </Link>
        </div>
      </div>

      {favoriteNotes.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Favorite Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteNotes.map(note => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onToggleFavorite={toggleFavorite} 
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">All Notes</h2>
        {regularNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNotes.map(note => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onToggleFavorite={toggleFavorite} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? 'No matching notes found' : 'No notes yet. Create your first note!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function NoteCard({ note, onToggleFavorite }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="h-full flex flex-col transition-all hover:shadow-lg dark:bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
          {note.title}
        </h3>
        <Tooltip content={note.isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <button 
            onClick={() => onToggleFavorite(note._id, note.isFavorite)}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            {note.isFavorite ? (
              <FaStar className="text-yellow-400 text-lg" />
            ) : (
              <FaRegStar className={`text-lg ${isHovered ? 'text-gray-500' : 'text-gray-300'}`} />
            )}
          </button>
        </Tooltip>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 flex-grow line-clamp-4">
        {note.content}
      </p>
      
      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
        <Link to={`/notepad/${note._id}`} state={{ noteId: note._id }}>
          <Button size="xs" gradientDuoTone="purpleToBlue" >
            View
          </Button>
        </Link>
      </div>
    </Card>
  );
}