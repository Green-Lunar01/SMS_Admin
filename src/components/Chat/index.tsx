import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const Broadcast = () => {
  const [active, setActive] = useState('New Message');

  const { setShowChat } = useContext(AppContext);

  const sentMessages = [
    {
      type: 'schools',
      message: 'Edusoft will be organizing a free online training starting monday',
      isNew: true
    },
    {
      type: 'students',
      message: 'Edusoft will be organizing a free online training starting monday',
      isNew: true
    },
    {
      type: 'schools',
      message: 'Edusoft will be organizing a free online training starting monday',
      isNew: true
    }
  ];

  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-[100vh] z-[1000] flex items-end justify-end">
      <div className="bg-white md:w-[30%] h-full">
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

                <select className="w-full p-3 border text-sm rounded-sm outline-primary-light">
                  <option value=""></option>
                  <option value="schools">Schools</option>
                  <option value="students">Students</option>
                </select>

                <textarea
                  placeholder="Enter Message"
                  className="w-full py-2 border rounded-sm outline-primary-light mt-10 px-3 text-sm placeholder:text-sm"
                  rows={10}
                ></textarea>

                <button
                  type="submit"
                  className="w-fit px-5 py-2 mt-5 bg-primary-light text-white text-sm rounded-sm"
                >
                  Submit
                </button>
              </div>
            )}

            {active === 'Sent Message' && (
              <div>
                {sentMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`text-xs py-4 px-5 border-b ${
                      message.isNew && 'bg-secondary-light'
                    }`}
                  >
                    <p>{message.type === 'schools' ? 'To Schools' : 'To Students'}</p>
                    <p className="mt-1">{message.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;
