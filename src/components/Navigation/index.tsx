import { Link, useLocation } from 'react-router';
import admin from '../icons/admin';
import audit from '../icons/audit';
import dashboard from '../icons/dashboard';
import schools from '../icons/schools';
import Logout from '../icons/logout';
import subscription from '../icons/subscription';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
    <div className="w-[20%] h-[90vh] pr-0 flex flex-col gap-5 border-r">
      {navs.map((nav, index) => (
        <Link
          key={index}
          to={nav.path}
          className={`${
            currentPath === nav.path && 'bg-primary-light text-white'
          } transition-all duration-500 px-5 py-4 flex items-center gap-4`}
        >
          {nav.icon({ color: currentPath === nav.path ? '#FFFFFF' : '#000000' })}
          {nav.title}
        </Link>
      ))}

      <button className={`p-5 flex items-center gap-4`}>
        <Logout />
        Logout
      </button>
    </div>
  );
};

export default Navigation;
