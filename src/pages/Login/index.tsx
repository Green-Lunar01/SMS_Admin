const Login = () => {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="shadow-md md:w-[30%] px-12 py-16 flex items-start flex-col gap-7">
        <h1 className="text-xl font-semibold text-primary-light text-center w-full">
          Welcome Back
        </h1>
        <p className="text-xs text-center w-full">Admin</p>

        <form className="w-full flex flex-col gap-5 mt-5">
          <div className="w-full">
            <p className="font-semibold text-xs">Email</p>

            <div className="relative">
              <img src="/public/mail-icon.svg" alt="" className="absolute w-5 top-[40%] left-3" />
              <input
                type="text"
                className="py-3 px-10 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
              />
              {/* <img src="/public/mail-icon.svg" alt="" className="absolute top-3 left-3" /> */}
            </div>
          </div>

          <div className="w-full">
            <p className="font-semibold text-xs">Password</p>

            <div className="relative">
              <img
                src="/public/password-lock-icon.svg"
                alt=""
                className="absolute w-5 top-[40%] left-3"
              />
              <input
                type="password"
                className="py-3 px-10 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
              />
              {/* <img src="/public/mail-icon.svg" alt="" className="absolute top-3 left-3" /> */}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <input type="checkbox" className="outline-primary-light" />
              <p>Remember</p>
            </div>

            <p className="text-xs">Forget Password?</p>
          </div>

          <button
            type="submit"
            onClick={() => (window.location.href = '/')}
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
