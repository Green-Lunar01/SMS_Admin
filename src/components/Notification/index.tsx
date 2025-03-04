/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { useAxiosInstance } from '../../hooks/axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const { setShowNotification } = useContext(AppContext);
  const axiosInstance = useAxiosInstance();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const getNotifications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/notifications`, axiosInstance);
      console.log(response.data);
      // Handle success

      if (response.status === 200) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-[100vh] z-[1000] flex items-end justify-end">
      <div className="bg-white w-full md:w-[50%] lg:w-[30%] h-full">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h1 className="font-semibold">Notifications</h1>

          <button type="button" onClick={() => setShowNotification(false)}>
            <img src="/close.svg" alt="" />
          </button>
        </div>

        <div className="flex flex-col h-[90vh] overflow-hidden overflow-y-auto">
          {notifications.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            notifications.map((notification: any, index) => (
              <div
                key={index}
                className={`p-5 flex items-start gap-3 text-sm border-b ${
                  notification.isNew ? 'bg-secondary-light' : ''
                }`}
              >
                <img src={`/mock-school-logo.svg`} alt="" />

                <div className="text-sm">
                  <p>{notification.school_name}</p>
                  <p>{notification.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
