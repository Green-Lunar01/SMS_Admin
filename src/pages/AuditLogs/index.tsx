import { useEffect, useState } from 'react';
import DatePicker from '../../components/DataPicker';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import { useAxiosInstance } from '../../hooks/axios';
import { ClimbingBoxLoader } from 'react-spinners';
interface FormData {
  date: string;
  eventDate: string;
}

const AuditLogs = () => {
  const axiosInstance = useAxiosInstance();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    date: '',
    eventDate: ''
  });

  const columns = [
    { header: 'User', accessor: 'username' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Date', accessor: 'created_at' },
    { header: 'Page Visit', accessor: 'page_visited' },
    { header: 'Role', accessor: 'role' },
    { header: 'Login_time', accessor: 'login_time' },
    { header: 'Logout_time', accessor: 'logout_time' }
  ];

  const paginatedData = data && data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // This function will be called when a date is selected
  const handleChange = (value: string, name?: string): void => {
    console.log('Date selected:', value);
    if (name) {
      setFormData((prevState) => ({
        ...prevState,
        date: value
      }));
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log('Selected option:', e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Submit data to server or perform other actions
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/admin/get-audit-log`, axiosInstance);
      setData(response.data.data.logs);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <ClimbingBoxLoader color="#DFF8EF" />
        </div>
      ) : (
        <>
          <header className="text-3xl font-semibold">Audit Logs</header>

          <section className="text-sm flex flex-col my-7">
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

            <form onSubmit={handleSubmit} className="bg-[#F9F9F9] p-7 my-5 w-full flex gap-10">
              <div>
                <p className="text-gray-500 text-sm">Users</p>
                <select
                  onChange={handleSelect}
                  className="border-none outline-none bg-white text-gray-500 text-sm px-3 py-2 mt-2"
                >
                  <option value="all">All</option>
                  <option value="all-users">All Users</option>
                  <option value="all-schools">All Schools</option>
                </select>
              </div>

              <div>
                <DatePicker
                  value={formData.date}
                  onChange={handleChange}
                  name="Date"
                  label="Date"
                />
              </div>
            </form>
          </section>

          <section className="w-full my-5">
            <Table
              deletable={false}
              editable={false}
              columns={columns}
              data={paginatedData}
              showHeader={true}
              isSchool={true}
              tableName="audit logs"
            />
          </section>

          <Pagination totalItems={data.length} onPageChange={handlePageChange} />
        </>
      )}
    </>
  );
};

export default AuditLogs;
