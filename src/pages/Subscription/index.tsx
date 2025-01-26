import axios from 'axios';
import { useEffect, useState } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

import { useAxiosInstance } from '../../hooks/axios';

import PlanCard from '../../components/PlanCard';
import UserTable from '../../components/UserTable';

export interface Subscription {
  id?: number | string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

const Subscription = () => {
  const [active, setActive] = useState('Plan');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [cards, setCards] = useState<Subscription[]>([]);
  const [data, setData] = useState<Subscription[]>([]);
  const [isNewSub, setIsNewSub] = useState(false);
  const [loading, setLoading] = useState(true);

  const axiosInstance = useAxiosInstance();

  const handleAddCard = () => {
    setIsNewSub(true);
    setData([...data, { name: '', price: 0, duration: '', features: [] }]);
  };

  const handleSaveSubscription = async (data: Subscription) => {
    setLoading(true);
    try {
      await axios.put(
        `https://edusoft.elonmuskreeve.com/admin/subscriptions/edit/${data.id}`,
        data,
        axiosInstance
      );
      console.log('refetching data');
      await fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubscription = async (data: Subscription) => {
    setLoading(true);
    try {
      await axios.post(
        `https://edusoft.elonmuskreeve.com/admin/subscriptions/create`,
        data,
        axiosInstance
      );

      console.log('refetching data');
      await fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setIsNewSub(false);
    }
  };

  const handleSaveCard = (data: Subscription, index: number) => {
    const updatedCards = [...cards];
    updatedCards[index] = data;
    setCards(updatedCards);
    console.log('Updated Card:', data); // Debugging or further processing
    if (isNewSub) {
      handleCreateSubscription(data);
    } else {
      handleSaveSubscription(data);
    }
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://edusoft.elonmuskreeve.com/admin/subscriptions',
        axiosInstance
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Username', accessor: 'username' },
    { header: 'School', accessor: 'school' },
    { header: 'Class', accessor: 'class' },
    { header: 'Plan', accessor: 'plan' },
    { header: 'Status', accessor: 'status' }
  ];

  const schools = Array(15).fill({
    name: 'Olivia Huel',
    username: 'BT456789763',
    school: 'Pa academy',
    class: 'J.S.S 1',
    plan: 'Pro',
    status: 'Active'
  });

  const paginatedData = schools.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <ClimbingBoxLoader color="#DFF8EF" />
      </div>
    );
  }

  return (
    <div>
      <header className="text-3xl font-semibold">Subscriptions</header>
      <div className="flex items-center gap-5 mt-5 md:w-[30%]">
        <button
          onClick={() => setActive('Plan')}
          type="button"
          className={`${
            active === 'Plan' ? 'bg-primary-light text-white' : 'bg-[#F5F5F5]'
          } w-[50%] py-3 text-sm rounded-md`}
        >
          Plan
        </button>
        <button
          onClick={() => setActive('Subscribers')}
          type="button"
          className={`${
            active === 'Subscribers' ? 'bg-primary-light text-white' : 'bg-[#F5F5F5]'
          } w-[50%] py-3 text-sm rounded-md`}
        >
          Subscribers
        </button>
      </div>

      {/* --- content */}
      <section>
        {active === 'Plan' && (
          <div className="flex flex-wrap gap-5 mt-5 w-full">
            {data.map((_card, index) => (
              <PlanCard data={_card} key={index} onSave={(data) => handleSaveCard(data, index)} />
            ))}

            <button type="button" onClick={handleAddCard} className="px-4 py-2 rounded-md">
              <img src="/add-circle-lg.svg" alt="" />
            </button>
          </div>
        )}

        {active === 'Subscribers' && (
          <div>
            <UserTable
              columns={columns}
              paginatedData={paginatedData}
              schools={schools}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Subscription;
