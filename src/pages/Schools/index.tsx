/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import axios from 'axios';
import { useAxiosInstance } from '../../hooks/axios';
import UserTable from '../../components/UserTable';

const Schools = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 10;
  const axiosInstance = useAxiosInstance();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/admin/get-schools`, axiosInstance);
        setData(response.data.data.schools);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { header: 'Name', accessor: 'school_name' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'No. of Students', accessor: 'student_count' },
    { header: 'Location', accessor: 'location' }
  ];

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((school: any) =>
    school.school_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <ClimbingBoxLoader color="#DFF8EF" />
      </div>
    );
  }

  return (
    <div>
      <header className="text-3xl font-semibold">Schools</header>

      <UserTable
        columns={columns}
        paginatedData={paginatedData}
        schools={filteredData}
        handlePageChange={handlePageChange}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Schools;
