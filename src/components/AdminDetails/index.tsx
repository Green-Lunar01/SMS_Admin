/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AdminDetails = () => {
  const { adminDetails, setShowAdminDetails } = useContext(AppContext);

  const detailFields = [
    { label: 'Name', key: 'adminName' },
    { label: 'Email Address', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Created Date', key: 'created_at' },
    { label: 'Status', key: 'status' }
  ];

  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-[100vh] z-[1000] flex items-end justify-end">
      <div className="bg-white w-[30%] h-full">
        {/* Header */}
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h1 className="font-semibold">User Details</h1>
          <button type="button" onClick={() => setShowAdminDetails(false)}>
            <img src="/close.svg" alt="Close" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-7 items-center h-[90vh] text-sm overflow-hidden overflow-y-auto p-5">
          <img src={`/mock-user.svg`} alt="School" className="w-[30%]" />

          {/* Details List */}
          {detailFields.map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between w-[75%]">
              <p>{label}:</p>
              <p className="font-light">{(adminDetails as any)[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
