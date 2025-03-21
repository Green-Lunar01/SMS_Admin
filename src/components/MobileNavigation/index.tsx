import { Link, useLocation, useNavigate } from 'react-router';
import admin from '../icons/admin';
import audit from '../icons/audit';
import dashboard from '../icons/dashboard';
import schools from '../icons/schools';
import Logout from '../icons/logout';
import subscription from '../icons/subscription';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { User } from '../../../data';

const MobileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { setShowChat, setShowNotification, setShowMobileNav } = useContext(AppContext);

  const navs = [
    {
      title: 'Dashboard',
      icon: dashboard,
      path: '/'
    },
    {
      title: 'Schools',
      icon: schools,
      path: '/schools'
    },
    {
      title: 'Subscription',
      icon: subscription,
      path: '/subscription'
    },
    {
      title: 'Admin Role',
      icon: admin,
      path: '/admin-role'
    },
    {
      title: 'Audit Log',
      icon: audit,
      path: '/audit-logs'
    }
  ];

  return (
    <div className="fixed top-0 left-0 z-[1000] w-full h-[100vh] bg-white p-5 flex flex-col gap-5 border-r">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => {
              setShowChat(true);
              setShowMobileNav(false);
            }}
          >
            <img
              src="/chat-icon.svg"
              alt=""
              className="hover:scale-110 duration-500 transition-all"
            />
          </button>
          <button
            type="button"
            onClick={() => {
              setShowNotification(true);
              setShowMobileNav(false);
            }}
          >
            <img
              src="/notification-icon.svg"
              alt=""
              className="hover:scale-110 duration-500 transition-all"
            />
          </button>

          <h1 className="text-3xl font-semibold w-10 h-10 flex justify-center items-center text-white bg-primary-light rounded-full hover:text-xl duration-500 transition-all">
            {User.name[0]}
          </h1>
        </div>

        <button type="button" onClick={() => setShowMobileNav(false)} className="md:hidden">
          <img src="/close.svg" alt="" />
        </button>
      </div>

      {navs.map((nav, index) => (
        <Link
          key={index}
          to={nav.path}
          onClick={() => setShowMobileNav(false)}
          className={`${
            currentPath === nav.path && 'bg-primary-light text-white'
          } transition-all duration-500 px-5 py-4 flex items-center gap-4`}
        >
          {nav.icon({ color: currentPath === nav.path ? '#FFFFFF' : '#000000' })}
          {nav.title}
        </Link>
      ))}

      <button
        onClick={() => {
          sessionStorage.removeItem('edusoftToken');
          navigate('/login');
        }}
        className="p-5 flex items-center gap-4 text-red-600"
      >
        <Logout />
        Logout
      </button>
    </div>
  );
};

export default MobileNavigation;
