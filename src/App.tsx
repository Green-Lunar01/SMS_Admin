import { useContext } from 'react';
import Broadcast from './components/Chat';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import Rout from './components/Rout';
import './index.css';
import { AppContext } from './context/AppContext';
import SchoolDetails from './components/SchoolDetails';

const App = () => {
  const { showNotification, showChat, showSchoolDetails } = useContext(AppContext);

  return (
    <div>
      <Header />

      <div className="flex px-5">
        {showNotification && <Notification />}
        {showChat && <Broadcast />}
        {showSchoolDetails && <SchoolDetails />}
        <Navigation />

        <div className="h-[90vh] overflow-hidden overflow-y-auto w-[95%] py-5 px-8">
          <Rout />
        </div>
      </div>
    </div>
  );
};

export default App;
