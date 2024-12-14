import { useState } from 'react';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';

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

      <section className="flex justify-between items-center py-5 mt-5">
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

        <div className="flex items-center gap-5 text-sm">
          <select className="border h-full py-2 px-5 rounded-md">
            <option value="active">Active</option>
          </select>

          <button
            type="button"
            className="flex items-center gap-2 px-7 py-3 rounded-md bg-primary-light text-white"
          >
            <img src="/file-icon.svg" alt="" className="w-5" />
            Export
          </button>
        </div>
      </section>

      <p className="text-xs">
        Total Schools: <span className="text-primary-light">{schools.length}</span>
      </p>

      <section className="w-full my-5">
        <Table columns={columns} data={paginatedData} showHeader={true} isSchool={true} />
      </section>

      <Pagination totalItems={schools.length} onPageChange={handlePageChange} />
    </div>
  );
};

export default Schools;
