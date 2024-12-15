/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import Role from '../../components/Role';
import AddUser from '../../components/AddUser';

const AdminRole = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [active, setActive] = useState('User');

  const [roles, setRoles] = useState([
    {
      role: 'Super Admin',
      features: [
        'Full access to all system features and settings.',
        'Can manage other admin roles and permissions.'
      ]
    },
    {
      role: 'Marketing Admin',
      features: ['Full access to edit plan', 'Can manage other admin roles and permissions.']
    }
  ]);

  const columns = [
    { header: 'Name', accessor: 'adminName' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Created Date', accessor: 'created_at' },
    { header: 'Status', accessor: 'status' }
  ];

  const schools = Array(15).fill({
    adminName: 'Forrest Blick',
    email: 'Erica2@yahoo.com',
    role: 'Marketing admin',
    created_at: 'Created Date',
    status: 'Active'
  });

  const paginatedData = schools.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleAddRole = () => {
    const newRole = {
      role: 'New Role',
      features: ['Define role features here']
    };
    setRoles([...roles, newRole]); // Append the new role to the roles list
  };

  const handleSaveRole = (updatedRole: any, index: number) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = updatedRole;
    setRoles(updatedRoles);
  };

  const handleDeleteRole = (index: number) => {
    const updatedRoles = roles.filter((_, i) => i !== index); // Remove role at specified index
    setRoles(updatedRoles);
  };

  return (
    <div>
      <header className="text-3xl font-semibold">Admin Role Management</header>

      <section className="text-sm flex justify-between items-center my-7">
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
          onClick={() => setActive('add user')}
          className="flex items-center gap-2 px-7 py-3 rounded-md border text-primary-light border-primary-light bg-white"
        >
          Add New User
        </button>
      </section>

      <div className="flex items-center gap-5 my-7 w-[30%]">
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
                onEdit={(row: any) => console.log('Edit row:', row)}
                onDelete={(row: any) => console.log('Delete row:', row)}
                columns={columns}
                data={paginatedData}
                showHeader={true}
                isSchool={true}
              />
            </section>

            <Pagination totalItems={schools.length} onPageChange={handlePageChange} />
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
                onSave={(updatedRole: any) => handleSaveRole(updatedRole, index)}
                onDelete={() => handleDeleteRole(index)} // Pass delete callback
              />
            ))}

            {/* add new role */}
            <button
              onClick={handleAddRole}
              type="button"
              className="w-5 hover:scale-110 duration-300 transition-all"
            >
              <img src="/add-circle.svg" alt="" className="w-full h-full" />
            </button>
          </div>
        )}

        {active === 'add user' && (
          <div>
            <AddUser />
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminRole;
