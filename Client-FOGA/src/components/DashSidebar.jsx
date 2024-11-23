import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiTable, HiUser } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function DashSidebar() {
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
        <Sidebar.Item  href="#" icon={HiArrowSmRight}>
          Sign Out
        </Sidebar.Item>
        
      </Sidebar.ItemGroup>
      
    </Sidebar.Items>
  </Sidebar>
  )
}
