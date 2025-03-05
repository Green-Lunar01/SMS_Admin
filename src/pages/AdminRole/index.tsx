/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import Role from '../../components/Role';
import AddUser from '../../components/AddUser';
import { useAxiosInstance } from '../../hooks/axios';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import EditUser from '../../components/EditUser';

const AdminRole = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [active, setActive] = useState('User');
  const [roles, setRoles] = useState<{ id?: number; role_name: string; permissions: string[] }[]>(
    []
  );
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);

  const axiosInstance = useAxiosInstance();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/admin/users`, axiosInstance);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/admin/roles`, axiosInstance);
      setRoles(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Creator', accessor: 'created_by' }
    // { header: 'Status', accessor: 'status' }
  ];

  const paginatedData = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  function handleAddRole() {
    const newRole = {
      role_name: 'New Role',
      permissions: ['Define role features here']
    };
    setRoles([...roles, newRole]); // Append the new role to the roles list
  }

  const handleSaveRole = async (updatedRole: any, isEdit: any) => {
    if (isEdit === true) {
      try {
        const response = await axios.put(
          `${baseUrl}/admin/roles/edit/${updatedRole.id}`,
          updatedRole,
          axiosInstance
        );

        if (response.status === 200) {
          const serverRole = {
            id: response.data.data.roleId,
            role_name: response.data.data.role_name,
            permissions: response.data.data.permissions
          };

          const updatedRoles = roles.map((role) => (role.id === serverRole.id ? serverRole : role));

          setRoles(updatedRoles);
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    } else {
      try {
        const response = await axios.post(
          `${baseUrl}/admin/roles/create`,
          updatedRole,
          axiosInstance
        );

        if (response.status === 201) {
          const serverRole = {
            id: response.data.data.roleId,
            role_name: response.data.data.role_name,
            permissions: response.data.data.permissions
          };

          const updatedRoles = roles.map((role) => {
            // If this role matches what we're trying to save and has no ID, replace it
            if (!role.id && role.role_name === 'New Role') {
              return serverRole;
            }
            return role;
          });

          setRoles(updatedRoles);
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  };

  const handleDeleteRole = async (index: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/admin/roles/delete/${index}`, axiosInstance);

      if (response.status === 200) {
        const updatedRoles = roles.filter((role) => role.id !== index);
        setRoles(updatedRoles);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteUser = async (index: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/admin/users/delete/${index}`, axiosInstance);

      if (response.status === 200) {
        const updatedUsers = users.filter((user: any) => user.id !== index);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="h-[100vh] flex items-center justify-center w-full">
          <ClimbingBoxLoader color="#13A541" />
        </div>
      ) : (
        <>
          <header className="text-3xl font-semibold">Admin Role Management</header>

          <section className="text-sm flex flex-col md:flex-row justify-between items-start gap-5 md:gap-0 md:items-center my-7">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/search-icon.svg" alt="" className="w-5 absolute top-[25%] left-3" />
                <input
                  type="text"
                  placeholder="Search"
                  className="border outline-primary-light rounded-full text-sm placeholder:text-black placeholder:text-sm py-2 pl-10 pr-4"
                />
              </div>
              <button
                type="submit"
                className="text-sm px-5 py-2 text-white rounded-md bg-primary-light"
              >
                Search
              </button>
            </div>

            <button
              type="button"
              onClick={() => setActive('add')}
              className="flex items-center gap-2 px-7 py-3 rounded-md border text-primary-light border-primary-light bg-white"
            >
              Add New User
            </button>
          </section>

          <div className="flex items-center gap-5 my-7 md:w-[30%]">
            <button
              onClick={() => setActive('User')}
              type="button"
              className={`${
                active === 'User' ? 'bg-primary-light text-white' : 'bg-[#F5F5F5]'
              } w-[50%] py-3 text-sm rounded-md`}
            >
              User
            </button>
            <button
              onClick={() => setActive('Role')}
              type="button"
              className={`${
                active === 'Role' ? 'bg-primary-light text-white' : 'bg-[#F5F5F5]'
              } w-[50%] py-3 text-sm rounded-md`}
            >
              Role
            </button>
          </div>

          <section>
            {active === 'User' && (
              <>
                <section className="w-full my-5">
                  <Table
                    deletable={true}
                    editable={true}
                    onEdit={(row: any) => {
                      setEditedUser(row);
                      setActive('edit');
                    }}
                    onDelete={(row: any) => handleDeleteUser(row.id)}
                    columns={columns}
                    data={paginatedData}
                    showHeader={true}
                    isSchool={true}
                  />
                </section>

                <Pagination totalItems={users.length} onPageChange={handlePageChange} />
              </>
            )}

            {active === 'Role' && (
              <div>
                <header className="py-3 px-3 bg-primary-light">
                  <h1 className="text-xl text-white font-semibold">Role</h1>
                </header>

                {roles.map((role, index) => (
                  <Role
                    key={index}
                    data={role}
                    isEdit={role.role_name === 'New Role'}
                    onSave={(updatedRole: any, isEdit: any) => handleSaveRole(updatedRole, isEdit)}
                    onDelete={() => handleDeleteRole(role.id ?? 0)} // Pass delete callback
                  />
                ))}

                {/* add new role */}
                <button
                  onClick={() => handleAddRole()}
                  type="button"
                  className="w-5 hover:scale-110 duration-300 transition-all"
                >
                  <img src="/add-circle.svg" alt="" className="w-full h-full" />
                </button>
              </div>
            )}

            {active === 'add' && (
              <div>
                <AddUser roles={roles} setActive={setActive} />
              </div>
            )}

            {active === 'edit' && (
              <div>
                <EditUser roles={roles} setActive={setActive} data={editedUser} />
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default AdminRole;
