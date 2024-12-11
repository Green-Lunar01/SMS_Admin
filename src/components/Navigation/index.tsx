import { Link } from 'react-router';
import admin from '../icons/admin';
import audit from '../icons/audit';
import dashboard from '../icons/dashboard';
import schools from '../icons/schools';
import Logout from '../icons/logout';
import subscription from '../icons/subscription';
import { useState } from 'react';

const Navigation = () => {
  const [active, setActive] = useState('Dashboard');

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
    <div className="w-[20%] pr-0 flex flex-col gap-5">
      {navs.map((nav, index) => (
        <Link
          key={index}
          to={nav.path}
          onClick={() => setActive(nav.title)}
          className={`${
            active === nav.title && 'bg-[#13A541] text-white'
          } p-5 flex items-center gap-4`}
        >
          {nav.icon({ color: active === nav.title ? '#FFFFFF' : '#000000' })}
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
