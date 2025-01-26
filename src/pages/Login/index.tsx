import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserDetails } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://edusoft.elonmuskreeve.com/admin/auth/signin', {
        email,
        pswd: password
      });
      setUserDetails(response.data.data);
      localStorage.setItem('edusoftToken', JSON.stringify(response.data.data.token));
      // Redirect or handle successful login
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="shadow-md w-full md:w-[60%] lg:w-[30%] px-7 md:px-12 md:py-16 py-10 flex items-start flex-col gap-5">
        <h1 className="text-xl font-semibold text-primary-light text-center w-full">
          Welcome Back
        </h1>
        <p className="text-xs text-center w-full">Admin</p>

        <form className="w-full flex flex-col gap-8 mt-5" onSubmit={handleSubmit}>
          <div className="w-full">
            <p className="font-semibold text-xs">Email</p>

            <div className="relative">
              <img src="/mail-icon.svg" alt="" className="absolute w-5 top-[40%] left-3" />
              <input
                type="text"
                className="py-3 px-10 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <img src="/mail-icon.svg" alt="" className="absolute top-3 left-3" /> */}
            </div>
          </div>

          <div className="w-full">
            <p className="font-semibold text-xs">Password</p>

            <div className="relative">
              <img src="/password-lock-icon.svg" alt="" className="absolute w-5 top-[40%] left-3" />
              <input
                type="password"
                className="py-3 px-10 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <img src="/mail-icon.svg" alt="" className="absolute top-3 left-3" /> */}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center justify-between gap-2">
              <input type="checkbox" className="outline-primary-light" />
              <p>Remember</p>
            </div>

            <p>Forget Password?</p>
          </div>

          <button
            type="submit"
            className="py-3 w-full text-center text-sm bg-primary-light text-white rounded-md"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
