import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Notification = () => {
  const notifications = [
    {
      name: 'Papa Acedemy',
      caption: 'Just added a new student to it',
      src: '/mock-school-logo.svg',
      isNew: true
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: true
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    },
    {
      name: 'Hope High School',
      caption: 'Signup',
      src: '/mock-school-logo.svg',
      isNew: false
    }
  ];

  const { setShowNotification } = useContext(AppContext);

  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-[100vh] z-[1000] flex items-end justify-end">
      <div className="bg-white w-full md:w-[30%] h-full">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h1 className="font-semibold">Notifications</h1>

          <button type="button" onClick={() => setShowNotification(false)}>
            <img src="/close.svg" alt="" />
          </button>
        </div>

        <div className="flex flex-col h-[90vh] overflow-hidden overflow-y-auto">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`p-5 flex items-start gap-3 text-sm border-b ${
                notification.isNew ? 'bg-secondary-light' : ''
              }`}
            >
              <img src={notification.src} alt="" />

              <div className="text-sm">
                <p>{notification.name}</p>
                <p>{notification.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
