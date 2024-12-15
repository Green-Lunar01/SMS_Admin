import { Link } from 'react-router';
import { User } from '../../../data.ts';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.tsx';

const Header = () => {
  const { setShowChat, setShowNotification } = useContext(AppContext);

  return (
    <header className="px-5 flex items-center justify-between border-b">
      <Link to="/">
        <img src="/logo.svg" alt="" />
      </Link>

      <div className="flex items-center gap-5">
        <button type="button" onClick={() => setShowChat(true)}>
          <img
            src="/chat-icon.svg"
            alt=""
            className="hover:scale-110 duration-500 transition-all"
          />
        </button>
        <button type="button" onClick={() => setShowNotification(true)}>
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
    </header>
  );
};

export default Header;
