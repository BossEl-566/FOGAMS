import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocument, HiDocumentText, HiOutlineUserGroup, HiTable, HiUser, HiAnnotation } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../radux/user/userSlice';
import { useDispatch } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


export default function DashSidebar() {
    const location = useLocation();
    const  {currentUser} = useSelector(state => state.user);
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
      <Sidebar.ItemGroup className='flex flex-col gap-1'>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab === 'profile'} href="#" icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
          Profile
        </Sidebar.Item>
        </Link>{
          !currentUser.isMember && (
            <Link to='/dashboard?tab=join'>
        <Sidebar.Item active={tab === 'join'} href="#" icon={HiTable}>
          Join Church
        </Sidebar.Item>

        </Link>
          ) 
        }
        {
          currentUser.isAdmin && (
            <Link to='/dashboard?tab=daily-bible-message'>
            <Sidebar.Item active={tab === 'daily-bible-message'} href="#" icon={HiDocumentText} as='div'>
              Daily Message
            </Sidebar.Item>
            </Link>
            
          )

        }
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}

        <Sidebar.Item  onClick={handleSignout} icon={HiArrowSmRight} as='div'>
          Sign Out
        </Sidebar.Item>
        
      </Sidebar.ItemGroup>
      
    </Sidebar.Items>
  </Sidebar>
  )
}
