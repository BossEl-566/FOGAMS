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
import DashBible from '../components/DashBible';
import DashNotepad from '../components/DashNotepad';
import DashContact from '../components/DashContact';
import DashBirthday from '../components/DashBirthday';
import DashBroadcast from '../components/DashBroadcast';

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
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed z-50 p-2 m-2 rounded-lg bg-gray-100 dark:bg-gray-700"
      >
        {sidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <DashSidebar 
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      
      {/* Main content */}
      <div className="flex-1 p-4 md:mt-0" style={{ marginBottom: '60px' }}>
        {/* Profile */}
        {tab === 'profile' && <DashProfile />}
        {tab === 'join' && <DashJoinChurch />}
        {/* Daily Bible Message */}
        {tab === 'daily-bible-message' && <DashMainPageDBM />} 
        {/* user */}
        {tab === 'users' && <DashUsers />}
        {/* comment */}
        {tab === 'comments' && <DashComment />}
        {/* dashboard */}
        {tab === 'dash' && <DashboardComp />}
        {/* resources */}
        {tab === 'resources' && <DashResource />}
        {/* events */}
        {tab === 'events' && <DashEvents />}
        {tab === 'membership' && <MembershipRequest />}
        {/* tithe */}
        {tab === 'tithe' && <DashAccountRecord />}
        {/* account */}
        {tab === 'account' && <ChurchAccount />}
        {/* baptism */}
        {tab === 'baptism' && <DashBaptismApplication />}
        {tab === 'poll' && <DashPoll />}
        {tab === 'book' && <DashBooking />}
        {tab === 'anonymous' && <DashAnonymous />}
        {tab === 'notepad' && <DashNotepad />}
        {tab === 'contact' && <DashContact />}
        {tab === 'birthday' && <DashBirthday />}
        {tab === 'broadcast' && <DashBroadcast />}
        {tab === 'announcement' && <DashAnnouncement />}
      </div>
    </div>
  );
}