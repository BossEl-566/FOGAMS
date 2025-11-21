import React, { useEffect, useState, useRef } from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser, HiAnnotation, HiChartPie, HiFolderDownload, HiX } from "react-icons/hi";
import { BiMessageRounded, BiNotepad } from "react-icons/bi";
import { BsCalendarCheck } from "react-icons/bs"; 
import { FaPray, FaPollH, FaUserPlus, FaBullhorn, FaBirthdayCake } from "react-icons/fa";
import { MdOutlineContactSupport, MdEventAvailable } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../radux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

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

  // Enhanced SidebarLink component with better styling
  const SidebarLink = ({ to, tabValue, children, ...props }) => (
    <Link 
      to={to} 
      onClick={() => {
        setTab(tabValue);
        onClose();
      }}
      className="block w-full"
      {...props}
    >
      {children}
    </Link>
  );

  // Custom Sidebar Item with enhanced styling
  const CustomSidebarItem = ({ active, icon: Icon, children, ...props }) => (
    <div
      className={`
        flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer
        ${active 
          ? 'bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300' 
          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
        }
      `}
      {...props}
    >
      <Icon className={`w-5 h-5 mr-3 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
      <span className="font-medium">{children}</span>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Container */}
      <div 
        ref={sidebarRef}
        className={`
          fixed md:relative 
          top-0 left-0 
          h-screen
          w-80
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          transition-all duration-300 ease-in-out
          z-50
          bg-white dark:bg-gray-800
          shadow-xl md:shadow-lg
          border-r border-gray-200 dark:border-gray-700
          overflow-y-auto
        `}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-800 dark:text-white">Dashboard</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {currentUser?.isAdmin ? 'Admin Panel' : 'User Panel'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
          >
            <HiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 h-full flex flex-col">
          <Sidebar className="w-full border-none bg-transparent">
            <Sidebar.Items>
              {/* Admin Dashboard */}
              {currentUser && currentUser.isAdmin && (
                <Sidebar.ItemGroup className="mb-6">
                  <div className="px-3 mb-3">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Admin
                    </span>
                  </div>
                  <SidebarLink to='/dashboard?tab=dash' tabValue='dash'>
                    <CustomSidebarItem active={tab === 'dash' || !tab} icon={HiChartPie}>
                      Dashboard
                    </CustomSidebarItem>
                  </SidebarLink>
                </Sidebar.ItemGroup>
              )}

              {/* Main Navigation */}
              <Sidebar.ItemGroup className="mb-6">
                <div className="px-3 mb-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Main
                  </span>
                </div>
                
                {/* Profile */}
                <SidebarLink to='/dashboard?tab=profile' tabValue='profile'>
                  <CustomSidebarItem active={tab === 'profile'} icon={HiUser}>
                    Profile
                    {currentUser.isAdmin && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                        Admin
                      </span>
                    )}
                  </CustomSidebarItem>
                </SidebarLink>

                {/* Member Features */}
                {currentUser.isMember && (
                  <>
                    {[
                      { to: 'announcement', icon: TfiAnnouncement, label: 'Announcement' },
                      { to: 'baptism', icon: FaPray, label: 'Baptism' },
                      { to: 'poll', icon: FaPollH, label: 'Poll' },
                      { to: 'book', icon: BsCalendarCheck, label: 'Appointments' },
                      { to: 'anonymous', icon: BiMessageRounded, label: 'Message Box' },
                      { to: 'events', icon: MdEventAvailable, label: 'Events' },
                      { to: 'resources', icon: HiFolderDownload, label: 'Resources' },
                      { to: 'notepad', icon: BiNotepad, label: 'Notepad' },
                    ].map((item) => (
                      <SidebarLink key={item.to} to={`/dashboard?tab=${item.to}`} tabValue={item.to}>
                        <CustomSidebarItem active={tab === item.to} icon={item.icon}>
                          {item.label}
                        </CustomSidebarItem>
                      </SidebarLink>
                    ))}
                  </>
                )}

                {/* Join Church for non-members */}
                {!currentUser.isMember && (
                  <SidebarLink to='/dashboard?tab=join' tabValue='join'>
                    <CustomSidebarItem active={tab === 'join'} icon={HiUser}>
                      Join Church
                    </CustomSidebarItem>
                  </SidebarLink>
                )}
              </Sidebar.ItemGroup>

              {/* Admin Management */}
              {currentUser.isAdmin && (
                <Sidebar.ItemGroup className="mb-6">
                  <div className="px-3 mb-3">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Management
                    </span>
                  </div>
                  {[
                    { to: 'daily-bible-message', icon: HiDocumentText, label: 'Daily Message' },
                    { to: 'users', icon: HiOutlineUserGroup, label: 'Users' },
                    { to: 'birthday', icon: FaBirthdayCake, label: 'Birthdays' },
                    { to: 'comments', icon: HiAnnotation, label: 'Comments' },
                    { to: 'membership', icon: FaUserPlus, label: 'Requests' },
                    { to: 'contact', icon: MdOutlineContactSupport, label: 'Contact' },
                    { to: 'broadcast', icon: FaBullhorn, label: 'Broadcast' },
                  ].map((item) => (
                    <SidebarLink key={item.to} to={`/dashboard?tab=${item.to}`} tabValue={item.to}>
                      <CustomSidebarItem active={tab === item.to} icon={item.icon}>
                        {item.label}
                      </CustomSidebarItem>
                    </SidebarLink>
                  ))}
                </Sidebar.ItemGroup>
              )}

              {/* Sign Out */}
              <Sidebar.ItemGroup>
                <div
                  onClick={handleSignout}
                  className="flex items-center p-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200 mt-4 border border-transparent hover:border-red-200 dark:hover:border-red-800"
                >
                  <HiArrowSmRight className="w-5 h-5 mr-3" />
                  <span className="font-medium">Sign Out</span>
                </div>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>

          {/* User Info Footer */}
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {currentUser?.username?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {currentUser?.username || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {currentUser?.email || 'email@example.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}