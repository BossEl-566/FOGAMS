import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiTable, HiUser } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../radux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);
    const handleSignout = async () => {
      try {
        const res = await fetch('api/user/signout', {
          method: 'POST',
        });
        if(!res.ok) {
          console.log(data.message);
        }else {
          dispatch(signoutSuccess());
          // Redirect to login page
        }
      } catch (error) {
        console.log(error.message)
      }
    };
  return (
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab === 'profile'} href="#" icon={HiUser} label={'User'} labelColor='dark' as='div'>
          Profile
        </Sidebar.Item>
        </Link>
        <Link to='/dashboard?tab=join'>
        <Sidebar.Item active={tab === 'join'} href="#" icon={HiTable}>
          Join Church
        </Sidebar.Item>
        </Link>
        <Sidebar.Item  onClick={handleSignout} icon={HiArrowSmRight}>
          Sign Out
        </Sidebar.Item>
        
      </Sidebar.ItemGroup>
      
    </Sidebar.Items>
  </Sidebar>
  )
}
