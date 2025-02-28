import axios from 'axios';
import { useState } from 'react';
import { useAxiosInstance } from '../../hooks/axios';

interface Role {
  role_name: string;
}

interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  status?: boolean;
  created_by?: string;
}

interface AddUserProps {
  roles: Role[];
  setActive: (active: string) => void;
  data: User;
}

const EditUser = ({ roles, setActive, data }: AddUserProps) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.role);

  const axiosInstance = useAxiosInstance();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = {
      name: data.name,
      email: data.email,
      role: data.role,
      status: true
    };

    try {
      await axios.put(`${baseUrl}/admin/roles/edit/${data.id}`, formData, axiosInstance);
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);
      setActive('User');
    }
  };

  return (
    <div>
      <header className="py-3 px-3 bg-primary-light">
        <h1 className="text-xl text-white font-semibold">Add New User</h1>
      </header>

      <form className="w-[60%] mt-10 flex flex-col gap-5" onSubmit={handleEditUser}>
        <div className="w-full">
          <p className="font-semibold text-xs">Full Name</p>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
          />
        </div>

        <div className="w-full">
          <p className="font-semibold text-xs">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
          />
        </div>

        <div className="w-full">
          <p className="font-semibold text-xs">Role</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="py-3 px-1 mt-2 rounded-md w-full text-sm outline-primary-light border border-[#D9D9D9]"
          >
            <option value=""></option>
            {roles.map((role: Role, i: number) => (
              <option key={i} value={role.role_name}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-primary-light px-5 py-3 text-sm text-white w-fit rounded-md"
          disabled={loading}
        >
          {loading ? 'Editing...' : 'Edit User'}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
