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
import Chat from '../components/Chat';
import ChurchAccount from '../components/ChurchAccount';
import DashBaptismApplication from '../components/DashBaptismApplication';
import DashPoll from '../components/DashPoll';
import DashBooking from '../components/DashBooking';
import DashAnonymous from '../components/DashAnonymous';
import DashBible from '../components/DashBible';
import DashNotepad from '../components/DashNotepad';
import DashContact from '../components/DashContact';

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
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:w-56 fixed md:relative z-30`}>
        <DashSidebar 
          isSidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          closeSidebar={closeSidebar}
        />
      </div>
      
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed z-40 p-2 m-2 rounded-lg bg-gray-100 dark:bg-gray-700"
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

      {/* Main content */}
      <div className="flex-1 p-4 md:ml-0 mt-12 md:mt-0">
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
        {tab === 'message' && <Chat />}
        {/* tithe */}
        {tab === 'tithe' && <DashAccountRecord />}
        {/* account */}
        {tab === 'account' && <ChurchAccount />}
        {/* baptism */}
        {tab === 'baptism' && <DashBaptismApplication />}
        {tab === 'poll' && <DashPoll />}
        {tab === 'book' && <DashBooking />}
        {tab === 'anonymous' && <DashAnonymous />}
        {tab === 'bible' && <DashBible />}
        {tab === 'notepad' && <DashNotepad />}
        {tab === 'contact' && <DashContact />}
      </div>
    </div>
  );
}