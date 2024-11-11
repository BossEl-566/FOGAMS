import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import {useSelector} from 'react-redux';
import { HiLogout, HiViewGrid } from "react-icons/hi";

export default function Header() {
  const path = useLocation().pathname;
  const {currentUser} = useSelector(state => state.user);

  return (
    <Navbar className='border-b-2'>
      <Link to='/' className='self-center whitespace-nowrap'>
        <div className='flex items-center'>
          <img src='/src/assets/assembliesOfGodLogo.png' alt='Assemblies of God Logo' width='30' height='20' />
          <div className='w-px h-8 bg-blue-950 ml-1 dark:bg-white'></div>
          <div className='ml-1 hidden md:block md:text-sm lg:text-base font-semibold dark:text-white text-blue-950'>Fellowship of Grace A/G</div>
          <div className='ml-1 block md:hidden font-bold dark:text-white text-blue-950'>FOGA</div>
        </div>
      </Link>
      <form>
        <TextInput type='text' placeholder='Search...'
        rightIcon={AiOutlineSearch} className='hidden lg:inline' />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar alt='user' img={currentUser.profilePicture} rounded/>
          }>
           <Dropdown.Header>
        <span className="block text-sm">{currentUser.username}</span>
        <span className="block truncate text-sm font-medium">{currentUser.email}</span>
      </Dropdown.Header>
      <Link to={'/dashboard?tab=profile'}>
      <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>  
          </Dropdown>
        ):(
          <Link to='/sign-up'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse >
     
        <Link to='/'>
        <Navbar.Link active={path === "/"} as={'div'}>
          Home
          </Navbar.Link>
        </Link>
        
        
        <Link to='/about'>
        <Navbar.Link active={path === "/about"} as={'div'}>
        About
        </Navbar.Link>
          
        </Link>
        
        
        <Link to='/contact-us' >
        <Navbar.Link active={path === "/contact-us"} as={'div'}>
        Contact Us
        </Navbar.Link>
        </Link>
        
      
        <Link to='/project'>
        <Navbar.Link active={path === "/project"} as={'div'}>
        Project
        </Navbar.Link>
        </Link>

          
        <Link to='/ministries'>
        <Navbar.Link active={path === "/ministries"} as={'div'}>
        Ministries
        </Navbar.Link>
        </Link>
     </Navbar.Collapse>
    </Navbar>
  );
}
