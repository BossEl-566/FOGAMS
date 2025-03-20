import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { HiLogout, HiViewGrid } from "react-icons/hi";
import { toggleTheme } from '../radux/theme/themeSlice.js';
import { signoutSuccess } from '../radux/user/userSlice.js';
import toast from 'react-hot-toast'; // Import React Hot Toast

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('api/user/signout', {
        method: 'POST',
      });

      if (!res.ok) {
        toast.error('Failed to sign out. Please try again.');
      } else {
        dispatch(signoutSuccess());
        toast.success('Signed out successfully!'); // Show success toast on sign-out
        navigate('/sign-in');
      }
    } catch (error) {
      toast.error('An error occurred during sign-out. Please try again.');
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2 print:hidden'> {/* Add print:hidden here */}
      <Link to='/' className='self-center whitespace-nowrap'>
        <div className='flex items-center'>
          <img src='/src/assets/assembliesOfGodLogo.png' alt='Assemblies of God Logo' width='30' height='20' />
          <div className='w-px h-8 bg-blue-950 ml-1 dark:bg-white'></div>
          <div className='ml-1 hidden md:block md:text-sm lg:text-base font-semibold dark:text-white text-blue-950'>Fellowship of Grace A/G</div>
          <div className='ml-1 block md:hidden font-bold dark:text-white text-blue-950'>FOGA</div>
        </div>
      </Link>
      <form onSubmit={handlesubmit}>
        <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => {
            dispatch(toggleTheme());
            toast.success(`Theme switched to ${theme === 'light' ? 'dark' : 'light'}.`); // Show toast for theme switch
          }}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar alt='user' img={currentUser.profilePicture} rounded />
          }>
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
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
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
        <Link to='/ministries'>
          <Navbar.Link active={path === "/ministries"} as={'div'}>Ministries</Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}