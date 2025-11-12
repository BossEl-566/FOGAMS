import React, { useEffect, useState, useRef } from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocument, HiDocumentText, HiOutlineUserGroup, HiTable, HiUser, HiAnnotation, HiChartPie, HiFolderDownload, HiX } from "react-icons/hi";
import { BiMessageRounded, BiChat } from "react-icons/bi";
import { FaBookBible } from "react-icons/fa6";
import { BsCalendarCheck } from "react-icons/bs"; 
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaPray } from "react-icons/fa";
import { MdOutlineContactSupport } from "react-icons/md";
import { FaPollH } from "react-icons/fa";
import { MdEventAvailable, MdOutlineAttachMoney } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../radux/user/userSlice';
import { FaBullhorn } from "react-icons/fa";
import { BiNotepad } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaUserPlus } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { TfiAnnouncement } from "react-icons/tfi";

export default function DashSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user);
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSignout = async () => {
    try {
      const res = await fetch('api/user/signout', {
        method: 'POST',
      });
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        toast.success('Successfully signed out!');
        onClose();
      }
    } catch (error) {
      console.log(error.message);
      toast.error('An error occurred during sign out.');
    }
  };

  // Wrapper function for sidebar items that closes the sidebar
  const SidebarLink = ({ to, tabValue, children, ...props }) => (
    <Link 
      to={to} 
      onClick={() => {
        setTab(tabValue);
        onClose();
      }}
      {...props}
    >
      {children}
    </Link>
  );

  return (
    <div 
      ref={sidebarRef}
      className={`fixed md:relative z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}
      style={{ height: 'calc(100vh - 60px)', overflowY: 'auto' }}
    >
      <Sidebar className='w-64 md:w-56'>
        <Sidebar.Items>
          {currentUser && currentUser.isAdmin && (
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              <SidebarLink to='/dashboard?tab=dash' tabValue='dash'>
                <Sidebar.Item active={tab === 'dash' || !tab} href="#" icon={HiChartPie} as='div'>
                  Dashboard
                </Sidebar.Item>
              </SidebarLink>
            </Sidebar.ItemGroup>
          )}
          <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <SidebarLink to='/dashboard?tab=profile' tabValue='profile'>
              <Sidebar.Item active={tab === 'profile'} href="#" icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                Profile
              </Sidebar.Item>
            </SidebarLink>
            {currentUser.isMember && (
              <>
              <SidebarLink to='/dashboard?tab=announcement' tabValue='announcement'>
                <Sidebar.Item active={tab === 'announcement'} href="#" icon={TfiAnnouncement} as='div'>
                  Announcement
                </Sidebar.Item>
              </SidebarLink>
              <SidebarLink to='/dashboard?tab=baptism' tabValue='baptism'>
                <Sidebar.Item active={tab === 'baptism'} href="#" icon={FaPray} as='div'>
                  Baptism
                </Sidebar.Item>
              </SidebarLink>
              <SidebarLink to='/dashboard?tab=poll' tabValue='poll'>
                <Sidebar.Item active={tab === 'poll'} href="#" icon={FaPollH} as='div'>
                  Poll
                </Sidebar.Item>
              </SidebarLink>
              <SidebarLink to='/dashboard?tab=book' tabValue='book'>
                <Sidebar.Item active={tab === 'book'} href="#" icon={BsCalendarCheck} as='div'>
                Appointments
                </Sidebar.Item>
              </SidebarLink>
              <SidebarLink to='/dashboard?tab=anonymous' tabValue='anonymous'>
                <Sidebar.Item active={tab === 'anonymous'} href="#" icon={BiMessageRounded} as='div'>
                Message Box
                </Sidebar.Item>
              </SidebarLink>
              <SidebarLink to='/dashboard?tab=events' tabValue='events'>
                  <Sidebar.Item
                    active={tab === 'events'}
                    icon={MdEventAvailable}
                    as='div'
                  >
                    Events
                  </Sidebar.Item>
                </SidebarLink>
                <SidebarLink to='/dashboard?tab=resources' tabValue='resources'>
                  <Sidebar.Item
                    active={tab === 'resources'}
                    icon={HiFolderDownload}
                    as='div'
                  >
                    Resources
                  </Sidebar.Item>
                </SidebarLink>
              <SidebarLink to='/dashboard?tab=bible' tabValue='bible'>
                <Sidebar.Item active={tab === 'bible'} href="#" icon={FaBookBible} as='div'>
                Bible
                </Sidebar.Item>
              </SidebarLink>
              <SidebarLink to='/dashboard?tab=notepad' tabValue='notepad'>
                <Sidebar.Item active={tab === 'notepad'} href="#" icon={BiNotepad} as='div'>
                Notepad
                </Sidebar.Item>
              </SidebarLink>
              </>
            )}
            {!currentUser.isMember && (
              <SidebarLink to='/dashboard?tab=join' tabValue='join'>
                <Sidebar.Item active={tab === 'join'} href="#" icon={HiTable}>
                  Join Church
                </Sidebar.Item>
              </SidebarLink>
            )}
            {currentUser.isAdmin && (
              <>
              <SidebarLink to='/dashboard?tab=daily-bible-message' tabValue='daily-bible-message'>
                <Sidebar.Item active={tab === 'daily-bible-message'} href="#" icon={HiDocumentText} as='div'>
                  Daily Message
                </Sidebar.Item>
              </SidebarLink>
              </>
            )}
            {currentUser.isAdmin && (
              <>
                <SidebarLink to='/dashboard?tab=users' tabValue='users'>
                  <Sidebar.Item
                    active={tab === 'users'}
                    icon={HiOutlineUserGroup}
                    as='div'
                  >
                    Users
                  </Sidebar.Item>
                </SidebarLink>
                <SidebarLink to='/dashboard?tab=birthday' tabValue='birthday'>
                  <Sidebar.Item
                    active={tab === 'birthday'}
                    icon={FaBirthdayCake}
                    as='div'
                  >
                    Birthday  
                </Sidebar.Item>
                </SidebarLink>
                <SidebarLink to='/dashboard?tab=comments' tabValue='comments'>
                  <Sidebar.Item
                    active={tab === 'comments'}
                    icon={HiAnnotation}
                    as='div'
                  >
                    Comments
                  </Sidebar.Item>
                </SidebarLink>
                <SidebarLink to='/dashboard?tab=membership' tabValue='membership'>
                  <Sidebar.Item
                    active={tab === 'membership'}
                    icon={FaUserPlus}
                    as='div'
                  >
                    Requests
                  </Sidebar.Item>
                </SidebarLink>
                <SidebarLink to='/dashboard?tab=contact' tabValue='contact'>
                  <Sidebar.Item
                    active={tab === 'contact'}
                    icon={MdOutlineContactSupport}
                    as='div'
                  >
                    Contact
                  </Sidebar.Item>
                </SidebarLink>
                <SidebarLink to='/dashboard?tab=broadcast' tabValue='broadcast'>
                  <Sidebar.Item
                    active={tab === 'broadcast'}
                    icon={FaBullhorn}
                    as='div'
                  >
                    Broadcast
                  </Sidebar.Item>
                </SidebarLink>
              </>
            )}
            <Sidebar.Item 
              onClick={() => {
                handleSignout();
                onClose();
              }} 
              icon={HiArrowSmRight} 
              as='div'
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}