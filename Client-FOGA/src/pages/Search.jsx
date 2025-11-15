import { Button, Select, TextInput, Spinner, Badge, Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiSearch, HiFilter, HiRefresh } from 'react-icons/hi';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState('');
  const [resultsCount, setResultsCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // Available categories
  const categories = [
    { value: 'uncategorized', label: 'All Categories' },
    { value: 'Faith and Hope', label: 'Faith and Hope' },
    { value: 'Love and Forgiveness', label: 'Love and Forgiveness' },
    { value: 'Prayer and Spiritual Growth', label: 'Prayer and Spiritual Growth' },
    { value: 'Wisdom and Guidance', label: 'Wisdom and Guidance' },
    { value: 'Salvation and Thanksgiving', label: 'Salvation and Thanksgiving' },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
      });
    }

    fetchPosts();
  }, [location.search]);

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    
    try {
      const urlParams = new URLSearchParams(location.search);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/get-daily-bible-message?${searchQuery}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await res.json();
      setPosts(data.dailyBibleMessage || []);
      setResultsCount(data.dailyBibleMessage?.length || 0);
      
      if (data.dailyBibleMessage?.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    
    if (sidebarData.searchTerm) {
      urlParams.set('searchTerm', sidebarData.searchTerm);
    }
    if (sidebarData.sort && sidebarData.sort !== 'desc') {
      urlParams.set('sort', sidebarData.sort);
    }
    if (sidebarData.category && sidebarData.category !== 'uncategorized') {
      urlParams.set('category', sidebarData.category);
    }
    
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleReset = () => {
    setSidebarData({
      searchTerm: '',
      sort: 'desc',
      category: 'uncategorized',
    });
    navigate('/search');
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    
    try {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('startIndex', startIndex);
      const searchQuery = urlParams.toString();
      
      const res = await fetch(`/api/get-daily-bible-message?${searchQuery}`);
      
      if (!res.ok) {
        throw new Error('Failed to load more posts');
      }
      
      const data = await res.json();
      setPosts(prev => [...prev, ...data.dailyBibleMessage]);
      
      if (data.dailyBibleMessage.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } catch (err) {
      setError('Failed to load more posts. Please try again.');
    }
  };

  const hasActiveFilters = () => {
    return sidebarData.searchTerm || 
           sidebarData.sort !== 'desc' || 
           sidebarData.category !== 'uncategorized';
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Sidebar Filters */}
      <div className='p-6 border-b md:border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 md:w-80 md:min-h-screen'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2'>
            <HiFilter className='text-blue-600' />
            Filters
          </h2>
          {hasActiveFilters() && (
            <Button size="xs" color="light" onClick={handleReset}>
              <HiRefresh className='mr-1' />
              Reset
            </Button>
          )}
        </div>
        
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          {/* Search Term */}
          <div>
            <label htmlFor='searchTerm' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Search Messages
            </label>
            <TextInput
              id='searchTerm'
              type='text'
              placeholder='Search by title or content...'
              value={sidebarData.searchTerm}
              onChange={handleChange}
              icon={HiSearch}
            />
          </div>

          {/* Sort */}
          <div>
            <label htmlFor='sort' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Sort By
            </label>
            <Select
              id='sort'
              value={sidebarData.sort}
              onChange={handleChange}
            >
              <option value='desc'>Newest First</option>
              <option value='asc'>Oldest First</option>
            </Select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Category
            </label>
            <Select
              id='category'
              value={sidebarData.category}
              onChange={handleChange}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>
          </div>

          <Button 
            type='submit' 
            gradientDuoTone='purpleToBlue' 
            className='w-full'
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size='sm' className='mr-2' />
                Applying...
              </>
            ) : (
              <>
                <HiSearch className='mr-2' />
                Apply Filters
              </>
            )}
          </Button>
        </form>

        {/* Active Filters Summary */}
        {hasActiveFilters() && (
          <Card className='mt-6'>
            <h3 className='text-sm font-semibold text-gray-800 dark:text-white mb-2'>
              Active Filters:
            </h3>
            <div className='flex flex-wrap gap-2'>
              {sidebarData.searchTerm && (
                <Badge color='info' className='text-xs'>
                  Search: {sidebarData.searchTerm}
                </Badge>
              )}
              {sidebarData.sort !== 'desc' && (
                <Badge color='warning' className='text-xs'>
                  Sort: {sidebarData.sort === 'asc' ? 'Oldest' : 'Newest'}
                </Badge>
              )}
              {sidebarData.category !== 'uncategorized' && (
                <Badge color='success' className='text-xs'>
                  Category: {categories.find(c => c.value === sidebarData.category)?.label}
                </Badge>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Main Content */}
      <div className='flex-1 p-6'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>
              Daily Bible Messages
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-1'>
              {loading ? 'Searching...' : `Found ${resultsCount} message${resultsCount !== 1 ? 's' : ''}`}
            </p>
          </div>
          
          {hasActiveFilters() && (
            <Button color='light' size='sm' onClick={handleReset} className='mt-2 sm:mt-0'>
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
            <p className='text-red-800 dark:text-red-200 flex items-center'>
              <HiRefresh className='mr-2' />
              {error}
            </p>
            <Button color='failure' size='xs' onClick={fetchPosts} className='mt-2'>
              Try Again
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className='flex justify-center items-center py-12'>
            <div className='text-center'>
              <Spinner size='xl' className='mb-4' />
              <p className='text-gray-600 dark:text-gray-400'>Searching messages...</p>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && posts.length === 0 && !error && (
          <div className='text-center py-12'>
            <HiSearch className='mx-auto text-4xl text-gray-400 mb-4' />
            <h3 className='text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2'>
              No messages found
            </h3>
            <p className='text-gray-500 dark:text-gray-500 mb-4'>
              {hasActiveFilters() 
                ? 'Try adjusting your search filters' 
                : 'No daily bible messages available yet'
              }
            </p>
            {hasActiveFilters() && (
              <Button onClick={handleReset}>
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Results Grid */}
        {!loading && posts.length > 0 && (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Show More Button */}
            {showMore && (
              <div className='flex justify-center mt-8'>
                <Button
                  onClick={handleShowMore}
                  gradientDuoTone='purpleToBlue'
                  outline
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size='sm' className='mr-2' />
                      Loading...
                    </>
                  ) : (
                    'Load More Messages'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}