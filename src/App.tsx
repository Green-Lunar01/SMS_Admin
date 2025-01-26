import { useContext } from 'react';
import Broadcast from './components/Chat';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import Rout from './components/Rout';
import './index.css';
import { AppContext } from './context/AppContext';
import SchoolDetails from './components/SchoolDetails';
import StudentDetails from './components/StudentDetails';
import AdminDetails from './components/AdminDetails';
import { useLocation } from 'react-router';
import MobileNavigation from './components/MobileNavigation';

const App = () => {
  const {
    showNotification,
    showChat,
    showSchoolDetails,
    showStudentDetails,
    showAdminDetails,
    showMobileNav
  } = useContext(AppContext);

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      {currentPath !== '/login' && <Header />}

      <div className="flex md:px-5">
        {showNotification && <Notification />}
        {showChat && <Broadcast />}
        {showSchoolDetails && <SchoolDetails />}
        {showStudentDetails && <StudentDetails />}
        {showAdminDetails && <AdminDetails />}
        {currentPath !== '/login' && <Navigation />}
        {showMobileNav && <MobileNavigation />}

        <div
          className={`h-[90vh] overflow-hidden overflow-y-auto py-5 px-5 lg:px-8 ${
            currentPath !== '/login' ? 'w-full lg:w-[95%]' : 'w-full'
          } `}
        >
          <Rout />
        </div>
      </div>
    </div>
  );
};

export default App;
