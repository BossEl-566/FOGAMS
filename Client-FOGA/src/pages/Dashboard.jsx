import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashJoinChurch from '../components/DashJoinChurch';
import DashMainPageDBM from '../components/DashMainPageDBM';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';
import DashboardComp from '../components/DashboardComp';
import DashResource from '../components/DashResource';
import DashEvents from '../components/DashEvents';
import MembershipRequest from '../components/MembershipRequest';
import DashAccountRecord from '../components/DashAccountRecord';
import DashAnnouncement from '../components/DashAnnouncement';
import ChurchAccount from '../components/ChurchAccount';
import DashBaptismApplication from '../components/DashBaptismApplication';
import DashPoll from '../components/DashPoll';
import DashBooking from '../components/DashBooking';
import DashAnonymous from '../components/DashAnonymous';
import DashNotepad from '../components/DashNotepad';
import DashContact from '../components/DashContact';
import DashBirthday from '../components/DashBirthday';
import DashBroadcast from '../components/DashBroadcast';
import JustSignedUp from '../components/JustSignedUp';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900'>
      {/* Enhanced Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 group"
      >
        {sidebarOpen ? (
          <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <DashSidebar 
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      
      {/* Enhanced Main Content */}
      <div className="flex-1 md:ml-0 transition-all duration-300 min-h-screen">
        <div className="p-6 md:p-8">
          {/* Tab Content Container - No header above */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            {tab === 'profile' && <DashProfile />}
            {tab === 'join' && <DashJoinChurch />}
            {tab === 'daily-bible-message' && <DashMainPageDBM />} 
            {tab === 'users' && <DashUsers />}
            {tab === 'comments' && <DashComment />}
            {tab === 'dash' && <DashboardComp />}
            {tab === 'resources' && <DashResource />}
            {tab === 'events' && <DashEvents />}
            {tab === 'membership' && <MembershipRequest />}
            {tab === 'tithe' && <DashAccountRecord />}
            {tab === 'account' && <ChurchAccount />}
            {tab === 'baptism' && <DashBaptismApplication />}
            {tab === 'poll' && <DashPoll />}
            {tab === 'book' && <DashBooking />}
            {tab === 'anonymous' && <DashAnonymous />}
            {tab === 'notepad' && <DashNotepad />}
            {tab === 'contact' && <DashContact />}
            {tab === 'birthday' && <DashBirthday />}
            {tab === 'broadcast' && <DashBroadcast />}
            {tab === 'announcement' && <DashAnnouncement />}
            {tab === 'sign-in-users' && <JustSignedUp />}
          </div>
        </div>
      </div>
    </div>
  );
}