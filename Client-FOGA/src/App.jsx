import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from './radux/user/userSlice'; // Import Redux action for setting user
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
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
import RecieptPage from './pages/RecieptPage';
import AllTransanction from './pages/AllTransanction';
import AllTithe from './pages/AllTithe';
import ChurchRecord from './pages/ChurchRecord';
import ViewRecord from './pages/ViewRecord';
import UpdateRecord from './pages/UpdateRecord';
import ChildrenMin from './pages/ChildrenMin';
import YouthMin from './pages/YouthMin';
import WomenMin from './pages/WomenMin';
import MenMin from './pages/MenMin';
import SundaySchoolMin from './pages/SundaySchoolMin';
import DepCreativeArt from './pages/DepCreativeArt';
import DepYoungSingles from './pages/DepYoungSingles';
import DepWelfare from './pages/DepWelfare';
import DepGuest from './pages/DepGuest';
import DepCounseling from './pages/DepCounseling';
import DepMedia from './pages/DepMedia';
import DepFundraising from './pages/DepFundraising';
import DepAnniversary from './pages/DepAnniversary';
import DepProject from './pages/DepProject';
import DepCommunity from './pages/DepCommunity';
import DepProtocol from './pages/DepProtocol';
import DepMissions from './pages/DepMissions';
import Event from './pages/Event';
import EventDetails from './pages/EventDetails';
import Notepad from './pages/Notepad';
import ViewNotepad from './pages/ViewNotepad';
import Gallery from './pages/Gallery';
import PrayerGuide from './pages/PrayerGuide';
import SendTestSMS from './pages/SendTestSMS';
import Announcement from './pages/Announcement';
import TopBar from './components/TopBar';

export default function App() {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentUsers, setCurrentUsers] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
        dispatch(signInSuccess(storedUser)); // Use correct Redux action
        setCurrentUsers(storedUser); // Update local state as well
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <TopBar/>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/ministries/children" element={<ChildrenMin />} />
        <Route path="/ministries/youth" element={<YouthMin />} />
        <Route path="/ministries/women" element={<WomenMin />} />
        <Route path="/ministries/men" element={<MenMin />} />
        <Route path="/ministries/sunday-school" element={<SundaySchoolMin />} />
        <Route path="/ministries/creative-arts" element={<DepCreativeArt />} />
        <Route path="/departments/young-singles" element={<DepYoungSingles />} />
        <Route path="/departments/welfare" element={<DepWelfare />} />
        <Route path="/departments/guest-experience" element={<DepGuest />} />
        <Route path="/departments/counseling-visitation" element={<DepCounseling />} />
        <Route path="/departments/media" element={<DepMedia />} />
        <Route path="/departments/finance-fundraising" element={<DepFundraising />} />
        <Route path="/departments/anniversary" element={<DepAnniversary />} />
        <Route path="/departments/project-infrastructure" element={<DepProject />} />
        <Route path="/departments/protocol-ushering" element={<DepProtocol />} />
        <Route path="/departments/missions" element={<DepMissions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/prayer-guide" element={<PrayerGuide />} />

        <Route path="/departments/community-impact" element={<DepCommunity />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sms" element={<SendTestSMS />} />
        <Route path="/announcement/create" element={<Announcement />} />
        
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ministries" element={<Ministries />} />
        <Route path="/events" element={<Event />} />
        <Route element={<PrivateRoute />}>
          <Route path="/events/:eventId" element={<EventDetails />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/receipt/:recieptId" element={<RecieptPage />} />
          <Route path="/view/:viewId" element={<ViewRecord />} />
          <Route path="/edit/:editId" element={<UpdateRecord />} />
          <Route path="/all-transaction" element={<AllTransanction />} />
          <Route path="/new-church-record" element={<ChurchRecord />} />
          <Route path="/all-tithes" element={<AllTithe />} />
          <Route path="/create/notepad" element={<Notepad />} />
          <Route path="/notepad/:notepadId" element={<ViewNotepad />} />
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
