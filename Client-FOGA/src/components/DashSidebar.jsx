import React, { useEffect, useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocument, HiDocumentText, HiOutlineUserGroup, HiTable, HiUser, HiAnnotation, HiChartPie, HiFolderDownload } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../radux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function DashSidebar() {
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user);
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
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        toast.success('Successfully signed out!');  // Toast notification on successful sign-out
        // Redirect to login page or perform other actions here
      }
    } catch (error) {
      console.log(error.message);
      toast.error('An error occurred during sign out.');  // Toast notification for error
    }
  };

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        {currentUser && currentUser.isAdmin && (
          <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item active={tab === 'dash' || !tab} href="#" icon={HiChartPie} as='div'>
                Dashboard
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        )}
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} href="#" icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          {!currentUser.isMember && (
            <Link to='/dashboard?tab=join'>
              <Sidebar.Item active={tab === 'join'} href="#" icon={HiTable}>
                Join Church
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=daily-bible-message'>
              <Sidebar.Item active={tab === 'daily-bible-message'} href="#" icon={HiDocumentText} as='div'>
                Daily Message
              </Sidebar.Item>
            </Link>
          )}
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
              <Link to='/dashboard?tab=resources'>
                <Sidebar.Item
                  active={tab === 'resources'}
                  icon={HiFolderDownload}
                  as='div'
                >
                  Resources
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} as='div'>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
