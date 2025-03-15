import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket } from './radux/socket/socketSlice'; // Import socket action
import { signInSuccess } from './radux/user/userSlice'; // Import Redux action for setting user
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Project from './pages/Project';
import Header from './components/Header';
import Footer from './components/Footer';
import Ministries from './pages/Ministries';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import DashDailyBibleMessage from './components/DashDailyBibleMessage';
import DailyBibleMessagePage from './pages/DailyBibleMessagePage';
import UpdateDailyBibleMessage from './pages/UpdateDailyBibleMessage';
import HowToJoinUs from './pages/HowToJoinUs';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import AddEvent from './components/AddEvent';

export default function App() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
        dispatch(signInSuccess(storedUser)); // Use correct Redux action
        dispatch(connectSocket()); // Connect WebSocket
        setCurrentUser(storedUser); // Update local state as well
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/project" element={<Project />} />
        <Route path="/ministries" element={<Ministries />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/daily-bible-message" element={<DashDailyBibleMessage />} />
          <Route path="/update-daily-bible-message/:dailyBibleMessageId" element={<UpdateDailyBibleMessage />} />
          <Route path="/add-event" element={<AddEvent />} />
        </Route>
        <Route path="/daily-bible-message/:dailyBibleMessageSlug" element={<DailyBibleMessagePage />} />
        <Route path="/how-to-join-us" element={<HowToJoinUs />} />
      </Routes>
      <Footer />
      <Toaster /> {/* Show toast notifications */}
    </BrowserRouter>
  );
}
