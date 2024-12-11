import { Link } from 'react-router';
import { User } from '../../../data.ts';

const Header = () => {
  return (
    <header className="px-5 flex items-center justify-between">
      <Link to="/">
        <img src="/logo.svg" alt="" />
      </Link>

      <div className="flex items-center gap-5">
        <Link to="/chat">
          <img
            src="/chat-icon.svg"
            alt=""
            className="hover:scale-110 duration-500 transition-all"
          />
        </Link>
        <Link to="/chat">
          <img
            src="/notification-icon.svg"
            alt=""
            className="hover:scale-110 duration-500 transition-all"
          />
        </Link>
        <Link
          to="/chat"
          className="text-3xl font-semibold w-10 h-10 flex justify-center items-center text-white bg-[#13A541] rounded-full hover:text-xl duration-500 transition-all"
        >
          {User.name[0]}
        </Link>
      </div>
    </header>
  );
};

export default Header;
