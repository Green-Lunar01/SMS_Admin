/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const axiosInstance = useAxiosInstance();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleAddCard = () => {
    setIsNewSub(true);
    setData([...data, { name: '', price: 0, duration: '', features: [] }]);
  };

  const handleSaveSubscription = async (data: Subscription) => {
    setLoading(true);
    try {
      await axios.put(`${baseUrl}/admin/subscriptions/edit/${data.id}`, data, axiosInstance);
      console.log('refetching data');
      await fetchData();
    } catch (error: any) {
      setError(error.response.data.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubscription = async (data: Subscription) => {
    console.log('data', data);
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/admin/subscriptions/create`, data, axiosInstance);

      console.log('refetching data');
      await fetchData();
    } catch (error: any) {
      setError(error.response.data.message);
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

    if (isNewSub) {
      handleCreateSubscription(data);
    } else {
      handleSaveSubscription(data);
    }
  };

  const handleDeleteCard = async (id: any) => {
    console.log('deleting card', id);
    setLoading(true);
    try {
      const response = await axios.delete(
        `${baseUrl}/admin/subscriptions/remove/${id}`,
        axiosInstance
      );
      console.log('response', response);
      console.log('refetching data');
      fetchData();
    } catch (error: any) {
      setError(error.response.data.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/admin/subscriptions`, axiosInstance);
      setData(response.data.data);
    } catch (error: any) {
      setError(error.response.data.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/admin/subscribers`, axiosInstance);
      setSubscribers(response.data.data);
    } catch (error: any) {
      setError(error.response.data.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter(
    (school: any) => school && school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { header: 'Name', accessor: 'student_name' },
    { header: 'Username', accessor: 'username' },
    { header: 'School', accessor: 'school_name' },
    { header: 'Class', accessor: 'class_name' },
    { header: 'Plan', accessor: 'subscription_name' }
    // { header: 'Status', accessor: 'status' }
  ];

  const paginatedData = subscribers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] border">
        <div className="flex flex-col items-center gap-3">
          <img src="/animated-logo.svg" alt="" className="w-[6rem]" />
          <p>Loading...</p>
        </div>
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

      {error !== '' && <p className="text-red-500 text-xs mt-4">{error}</p>}

      {/* --- content */}
      <section>
        {active === 'Plan' && (
          <div className="flex flex-wrap gap-5 mt-5 w-full">
            {data &&
              data.map((_card, index) => (
                <PlanCard
                  data={_card}
                  key={index}
                  onDelete={(id) => handleDeleteCard(id)}
                  onSave={(data) => handleSaveCard(data, index)}
                />
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
              schools={filteredData}
              handlePageChange={handlePageChange}
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              tableName="Subscribers"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Subscription;
