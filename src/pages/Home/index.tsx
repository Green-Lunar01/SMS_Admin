import { useEffect, useState } from 'react';
import LineChart from '../../components/LineChart';
import Table from '../../components/Table';
import { ClimbingBoxLoader } from 'react-spinners';
import axios from 'axios';
import { useAxiosInstance } from '../../hooks/axios';

const Home = () => {
  const [data, setData] = useState({
    school_count: 0,
    student_count: 0,
    employee_count: 0,
    topSchools: [],
    topSubscribers: []
  });
  const [loading, setLoading] = useState(true);

  const axiosConfig = useAxiosInstance();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://edusoft.elonmuskreeve.com/admin/get-overview',
          axiosConfig
        );
        setData(response.data.data);
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
    { header: 'School Name', accessor: 'school_name' },
    { header: 'Contact Email', accessor: 'school_email' },
    { header: 'Student Count', accessor: 'student_count' }
  ];

  const columns2 = [
    { header: 'Student Name', accessor: 'studentName' },
    { header: 'School Name', accessor: 'school' },
    { header: 'Student Plan', accessor: 'plan' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <ClimbingBoxLoader color="#DFF8EF" />
      </div>
    );
  }

  return (
    <div className="">
      <section className="w-full flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[70%]">
          <LineChart />
        </div>

        {/*  */}
        <div className="flex flex-col gap-5 w-full md:w-[25%]">
          <div className="px-5 py-3 bg-[#DFF8EF] rounded-md">
            <h1 className="text-[11px] text-[#8A8A8A]">Total Schools</h1>
            <p className="text-lg mt-1">{data.school_count}</p>
          </div>

          <div className="px-5 py-3 bg-[#FFF5DC] rounded-md">
            <h1 className="text-[11px] text-[#8A8A8A]">Total Students</h1>
            <p className="text-lg mt-1">{data.student_count}</p>
          </div>

          <div className="px-5 py-3 bg-[#FFE0EF] rounded-md">
            <h1 className="text-[11px] text-[#8A8A8A]">Total Teachers</h1>
            <p className="text-lg mt-1">{data.employee_count}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-[48%]">
          <Table title="Top Schools" columns={columns} data={data.topSchools} />
        </div>
        <div className="w-full md:w-[48%]">
          <Table title="Top student subscribers" columns={columns2} data={data.topSubscribers} />
        </div>
      </section>
    </div>
  );
};

export default Home;
