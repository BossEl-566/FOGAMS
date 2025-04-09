import React, { useEffect, useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocument, HiDocumentText, HiOutlineUserGroup, HiTable, HiUser, HiAnnotation, HiChartPie, HiFolderDownload } from "react-icons/hi";
import { BiMessageRounded, BiChat } from "react-icons/bi";
import { FaBookBible } from "react-icons/fa6";
import { BsCalendarCheck } from "react-icons/bs"; 
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaPray } from "react-icons/fa";
import { FaPollH } from "react-icons/fa";
import { MdEventAvailable, MdOutlineAttachMoney } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../radux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaUserPlus } from "react-icons/fa";

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
          {currentUser.isMember && (
            <>
            <Link to='/dashboard?tab=message'>
              <Sidebar.Item active={tab === 'message'} href="#" icon={BiChat} as='div'>
                Chat
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=tithe'>
              <Sidebar.Item active={tab === 'tithe'} href="#" icon={ MdOutlineAttachMoney } as='div'>
                Account
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=baptism'>
              <Sidebar.Item active={tab === 'baptism'} href="#" icon={FaPray} as='div'>
                Baptism
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=poll'>
              <Sidebar.Item active={tab === 'poll'} href="#" icon={FaPollH} as='div'>
                Poll
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=book'>
              <Sidebar.Item active={tab === 'book'} href="#" icon={BsCalendarCheck} as='div'>
                Book Appointment
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=anonymous'>
              <Sidebar.Item active={tab === 'anonymous'} href="#" icon={BiMessageRounded} as='div'>
              Message Box
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=bible'>
              <Sidebar.Item active={tab === 'bible'} href="#" icon={FaBookBible} as='div'>
              Bible
              </Sidebar.Item>
            </Link>

            </>
          )}
          {!currentUser.isMember && (
            <Link to='/dashboard?tab=join'>
              <Sidebar.Item active={tab === 'join'} href="#" icon={HiTable}>
                Join Church
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=daily-bible-message'>
              <Sidebar.Item active={tab === 'daily-bible-message'} href="#" icon={HiDocumentText} as='div'>
                Daily Message
              </Sidebar.Item>
            </Link>
            
            </>
            
          )}
          {currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=account'>
              <Sidebar.Item active={tab === 'account'} href="#" icon={ FaMoneyBillTransfer } as='div'>
               Church Account
              </Sidebar.Item>
            </Link>
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
              <Link to='/dashboard?tab=events'>
                <Sidebar.Item
                  active={tab === 'events'}
                  icon={MdEventAvailable}
                  as='div'
                >
                  Upcoming Events
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=membership'>
                <Sidebar.Item
                  active={tab === 'membership'}
                  icon={FaUserPlus}
                  as='div'
                >
                  Member Requests
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
