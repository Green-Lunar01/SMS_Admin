import LineChart from '../../components/LineChart';
import Table from '../../components/Table';

const Home = () => {
  const data = {
    totalSchools: 678543,
    totalStudents: 98543,
    totalTeachers: 98543
  };

  const columns = [
    { header: 'School Name', accessor: 'schoolName' },
    { header: 'Contact Email', accessor: 'email' },
    { header: 'Student Count', accessor: 'students' }
  ];

  const columns2 = [
    { header: 'Student Name', accessor: 'studentName' },
    { header: 'School Name', accessor: 'school' },
    { header: 'Student Plan', accessor: 'plan' }
  ];

  const topSchools = Array(15).fill({
    schoolName: 'Apoloro High School',
    email: 'Kelli_Lebsack26@gmail.com',
    students: '2900 students'
  });

  const topStudents = Array(15).fill({
    studentName: 'Micheal John',
    school: 'Ikorodu community high school',
    plan: 'Pro'
  });

  return (
    <div className="">
      <section className="flex justify-between">
        <div className="w-[70%]">
          <LineChart />
        </div>

        {/*  */}
        <div className="flex flex-col gap-5 w-[25%]">
          <div className="px-5 py-3 bg-[#DFF8EF] rounded-md">
            <h1 className="text-[11px] text-[#8A8A8A]">Total Schools</h1>
            <p className="text-lg mt-1">{data.totalSchools}</p>
          </div>

          <div className="px-5 py-3 bg-[#FFF5DC] rounded-md">
            <h1 className="text-[11px] text-[#8A8A8A]">Total Students</h1>
            <p className="text-lg mt-1">{data.totalStudents}</p>
          </div>

          <div className="px-5 py-3 bg-[#FFE0EF] rounded-md">
            <h1 className="text-[11px] text-[#8A8A8A]">Total Teachers</h1>
            <p className="text-lg mt-1">{data.totalTeachers}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 flex items-start gap-8">
        <div className="w-[48%]">
          <Table title="Top Schools" columns={columns} data={topSchools} />
        </div>
        <div className="w-[48%]">
          <Table title="Top student subscribers" columns={columns2} data={topStudents} />
        </div>
      </section>
    </div>
  );
};

export default Home;
