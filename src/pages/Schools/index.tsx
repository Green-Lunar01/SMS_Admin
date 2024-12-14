import { useState } from 'react';
import UserTable from '../../components/UserTable';

const Schools = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
    { header: 'Name', accessor: 'Name' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'No. of Students', accessor: 'students' },
    { header: 'Location', accessor: 'location' },
    { header: 'No. of Employee', accessor: 'employee' },
    { header: 'Status', accessor: 'status' }
  ];

  const schools = Array(15).fill({
    Name: 'Mama high school',
    email: 'Brittany1@yahoo.com',
    students: 600,
    location: 'Nigeria',
    employee: 60,
    teachers: 20,
    totalSubjects: 15,
    status: 'Active',
    SignUpDate: '23/02/2024',
    SignUpRole: 'School owner',
    phoneNumber: '+2347067234678',
    tagLine: 'Education is pride:',
    address: 'N0, 4 Alagbo street lagos',
    website: 'Www.mamahigh.com',
    src: '/mock-school-logo.svg'
  });

  const paginatedData = schools.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <header className="text-3xl font-semibold">Schools</header>

      <UserTable
        columns={columns}
        paginatedData={paginatedData}
        schools={schools}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Schools;
