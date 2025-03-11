/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useAxiosInstance } from '../../hooks/axios';
import axios from 'axios';

const Broadcast = () => {
  const [active, setActive] = useState('New Message');
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  const { setShowChat } = useContext(AppContext);
  const chatRef = useRef<HTMLDivElement>(null);

  const axiosInstance = useAxiosInstance();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const sendMessage = async () => {
    try {
      setSending(true);
      const response = await axios.post(
        `${baseUrl}/admin/message/broadcast`,
        {
          message,
          message_to: selectedOption
        },
        axiosInstance
      );

      console.log('response', response);

      if (response.status === 201) {
        setSending(false);
        setIsSent(true);
        setMessage('');
        setSelectedOption('');

        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      }
    } catch (error: any) {
      setSending(false);
      setError(error.response.data.message);
      console.error('error', error);
      // Handle error
    }
  };

  const getMessages = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/messages`, axiosInstance);
      // Handle success

      if (response.status === 200) {
        setSentMessages(response.data.data);
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }

    if (isSent) {
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }
  }, [error, isSent]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setShowChat(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowChat]);

  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-[100vh] z-[1000] flex items-end justify-end">
      <div ref={chatRef} className="bg-white w-full md:w-[50%] lg:w-[30%] h-full">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h1 className="font-semibold">Broadcast Message</h1>

          <button type="button" onClick={() => setShowChat(false)}>
            <img src="/close.svg" alt="" />
          </button>
        </div>

        <div className="flex flex-col h-[90vh] overflow-hidden overflow-y-auto">
          <div className="flex items-center w-fit p-5">
            <button
              type="button"
              onClick={() => setActive('New Message')}
              className={`px-3 py-2 text-sm rounded-sm ${
                active === 'New Message' ? 'text-white bg-primary-light' : 'bg-white text-black'
              }`}
            >
              New message
            </button>
            <button
              type="button"
              onClick={() => setActive('Sent Message')}
              className={`px-3 py-2 text-sm rounded-sm ${
                active === 'Sent Message' ? 'text-white bg-primary-light' : 'bg-white text-black'
              }`}
            >
              Sent message
            </button>
          </div>

          <div className="">
            {active === 'New Message' && (
              <div className="p-5 mt-5">
                <p className="text-xs mb-2 outline-none">To</p>

                <select
                  className="w-full p-3 border text-sm rounded-sm outline-primary-light"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value=""></option>
                  <option value="school">Schools</option>
                  <option value="student">Students</option>
                </select>

                <textarea
                  placeholder="Enter Message"
                  className="w-full py-2 border rounded-sm outline-primary-light mt-10 px-3 text-sm placeholder:text-sm"
                  rows={10}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button
                  type="submit"
                  onClick={sendMessage}
                  className="w-fit px-5 py-2 mt-5 bg-primary-light text-white text-sm rounded-sm"
                >
                  {sending ? 'Sending...' : isSent ? 'Sent' : 'Submit'}
                </button>

                {error !== '' && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            )}

            {active === 'Sent Message' && (
              <div>
                {sentMessages.length > 0 &&
                  sentMessages.map((message: any, index) => (
                    <div
                      key={index}
                      className={`text-xs py-4 px-5 border-b ${
                        message?.isNew && 'bg-secondary-light'
                      }`}
                    >
                      <p>{message.message_to === 'school' ? 'To Schools' : 'To Students'}</p>
                      <p className="mt-1">{message.message}</p>
                    </div>
                  ))}

                {sentMessages.length === 0 && (
                  <div className="flex flex-col gap-2 items-center justify-center h-full">
                    <img
                      src="/empty-state-icons/notification.svg"
                      alt="notification icon"
                      className="w-[3rem]"
                    />
                    <p>No messages sent</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;
