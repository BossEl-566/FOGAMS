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
import Chat from '../components/Chat';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
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
    </div>
  );
}
