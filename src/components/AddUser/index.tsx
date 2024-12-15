import React from 'react';

const AddUser = () => {
  return (
    <div>
      <header className="py-3 px-3 bg-primary-light">
        <h1 className="text-xl text-white font-semibold">Add New User</h1>
      </header>

      <form className="w-[60%] mt-10 flex flex-col gap-5">
        <div className="w-full">
          <p className="font-semibold text-xs">First Name</p>
          <input
            type="text"
            className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="w-[48%]">
            <p className="font-semibold text-xs">Last Name</p>
            <input
              type="text"
              className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
            />
          </div>

          <div className="w-[48%]">
            <p className="font-semibold text-xs">Email</p>
            <input
              type="email"
              className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
            />
          </div>
        </div>

        <div className="w-full">
          <p className="font-semibold text-xs">Role</p>
          <select className="py-3 px-1 mt-2 rounded-md w-full text-sm outline-primary-light border border-[#D9D9D9]">
            <option value=""></option>
            <option value="super-admin">Super Admin</option>
            <option value="marketing-admin">Marketing Admin</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-[48%]">
            <p className="font-semibold text-xs">Password</p>
            <input
              type="password"
              className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
            />
          </div>

          <div className="w-[48%]">
            <p className="font-semibold text-xs">Confirm Password</p>
            <input
              type="password"
              className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
            />
          </div>
        </div>

        <button
          type="button"
          className="bg-primary-light px-5 py-3 text-sm text-white w-fit rounded-md"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
