/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const SchoolDetails = () => {
  const { schoolDetails, setShowSchoolDetails } = useContext(AppContext);

  const detailFields = [
    { label: 'Name', key: 'Name' },
    { label: 'Email Address', key: 'email' },
    { label: 'No. of Students', key: 'students' },
    { label: 'No. of Employee', key: 'employee' },
    { label: 'No. of Teacher', key: 'teachers' },
    { label: 'Total Subjects', key: 'totalSubjects' },
    { label: 'Location', key: 'location' },
    { label: 'Sign-up Date', key: 'SignUpDate' },
    { label: 'Sign-up Role', key: 'SignUpRole' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Tagline', key: 'tagLine' },
    { label: 'Address', key: 'address' },
    { label: 'Website', key: 'website' },
    { label: 'Status', key: 'status' }
  ];

  return (
    <div className="bg-black bg-opacity-50 fixed top-0 left-0 w-full h-[100vh] z-[1000] flex items-end justify-end">
      <div className="bg-white w-[30%] h-full">
        {/* Header */}
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h1 className="font-semibold">School Details</h1>
          <button type="button" onClick={() => setShowSchoolDetails(false)}>
            <img src="/close.svg" alt="Close" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-7 items-center h-[90vh] text-sm overflow-hidden overflow-y-auto p-5">
          {/* Image */}
          <img src={schoolDetails.src} alt="School" className="w-[30%]" />

          {/* Details List */}
          {detailFields.map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between w-[75%]">
              <p>{label}:</p>
              <p className="font-light">{(schoolDetails as any)[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
