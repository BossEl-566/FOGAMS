import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { HiLogout, HiViewGrid, HiChevronDown } from "react-icons/hi";
import { toggleTheme } from '../radux/theme/themeSlice.js';
import { signoutSuccess } from '../radux/user/userSlice.js';
import toast from 'react-hot-toast';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMinistriesOpen, setIsMinistriesOpen] = useState(false);
  const ministriesRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ministriesRef.current && !ministriesRef.current.contains(event.target)) {
        setIsMinistriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMinistriesOpen(false);
  }, [path]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });

      if (!res.ok) {
        toast.error('Failed to sign out. Please try again.');
      } else {
        dispatch(signoutSuccess());
        toast.success('Signed out successfully!');
        navigate('/sign-in');
      }
    } catch (error) {
      toast.error('An error occurred during sign-out. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setIsSearchVisible(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleMinistries = () => {
    setIsMinistriesOpen(!isMinistriesOpen);
  };

  return (
    <Navbar className='border-b-2 print:hidden sticky top-0 z-50'>
      {/* Logo Section */}
      <div className='flex items-center justify-between w-full md:w-auto'>
        <Link to='/' className='self-center whitespace-nowrap'>
          <div className='flex items-center'>
            <img src='/src/assets/assembliesOfGodLogo.png' alt='Assemblies of God Logo' width='30' height='20' />
            <div className='w-px h-8 bg-gradient-to-b from-blue-500 to-blue-700 ml-2 dark:from-gray-300 dark:to-gray-100'></div>
            <div className='ml-2 hidden md:block md:text-sm lg:text-base font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-300 dark:to-blue-100'>Fellowship of Grace A/G</div>
            <div className='ml-1 block md:hidden font-bold dark:text-white text-blue-950'>FOGA</div>
          </div>
        </Link>

        {/* Mobile Search Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            className='w-10 h-10' 
            color='gray' 
            pill 
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </Button>
          
          <Button className='w-10 h-10' color='gray' pill onClick={toggleSearch}>
            {isSearchVisible ? <AiOutlineClose /> : <AiOutlineSearch />}
          </Button>
          
          {/* Mobile Profile/Hamburger Menu */}
          {currentUser && (
            <Dropdown 
              arrowIcon={false} 
              inline 
              label={
                <div className="md:hidden">
                  {currentUser.profilePicture ? (
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                  ) : (
                    <FaBars className="text-gray-600 dark:text-gray-300 text-xl" />
                  )}
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item icon={HiLogout} onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </div>

      {/* Search Form - Desktop */}
      <form onSubmit={handleSubmit} className="hidden md:flex">
        <TextInput 
          type='text' 
          placeholder='Search...' 
          rightIcon={AiOutlineSearch} 
          className='w-full lg:w-64' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </form>

      {/* Search Form - Mobile (when toggled) */}
      {isSearchVisible && (
        <form onSubmit={handleSubmit} className="absolute top-16 left-0 right-0 px-4 md:hidden bg-white dark:bg-gray-800 py-2">
          <div className="flex gap-2">
            <TextInput 
              type='text' 
              placeholder='Search...' 
              className='flex-1' 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Button type="submit" className='h-10'>
              <AiOutlineSearch />
            </Button>
          </div>
        </form>
      )}

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 md:order-2">
        {/* Theme Toggle - Desktop */}
        <Button
          className='w-10 h-10 hidden md:inline'
          color='gray'
          pill
          onClick={() => {
            dispatch(toggleTheme());
            toast.success(`Theme switched to ${theme === 'light' ? 'dark' : 'light'}.`);
          }}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {/* User Dropdown - Desktop */}
        {currentUser ? (
          <Dropdown 
            arrowIcon={false} 
            inline 
            label={
              <div className="hidden md:block">
                <Avatar alt='user' img={currentUser.profilePicture} rounded />
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={handleSignout} className='text-red-600 hover:bg-red-50 dark:hover:bg-gray-700'>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        
        <Navbar.Toggle />
      </div>

      {/* Navigation Links */}
      <Navbar.Collapse>
        <Link to='/'>
          <Navbar.Link active={path === "/"} as={'div'}>Home</Navbar.Link>
        </Link>
        <Link to='/about'>
          <Navbar.Link active={path === "/about"} as={'div'}>About</Navbar.Link>
        </Link>
        <Link to='/contact-us'>
          <Navbar.Link active={path === "/contact-us"} as={'div'}>Contact Us</Navbar.Link>
        </Link>
        <Link to='/project'>
          <Navbar.Link active={path === "/project"} as={'div'}>Project</Navbar.Link>
        </Link>
        
        {/* Ministries Dropdown - Click Activated */}
        <div className="relative" ref={ministriesRef}>
          <button 
            className={`flex items-center justify-between w-full py-2 pr-4 pl-3 md:p-0 ${path.startsWith("/ministries") ? 'text-blue-700 dark:text-blue-500' : 'text-gray-700 dark:text-gray-400'} hover:text-blue-700 dark:hover:text-blue-500`}
            onClick={toggleMinistries}
          >
            Ministries
            <HiChevronDown className={`ml-1 transition-transform ${isMinistriesOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isMinistriesOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
              <Link
                to="/ministries/children"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMinistriesOpen(false)}
              >
                Children
              </Link>
              <Link
                to="/ministries/youth"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMinistriesOpen(false)}
              >
                Youth
              </Link>
              <Link
                to="/ministries/women"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMinistriesOpen(false)}
              >
                Women
              </Link>
              <Link
                to="/ministries/men"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMinistriesOpen(false)}
              >
                Men
              </Link>
            </div>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}