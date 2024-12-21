/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import PlanCard from '../../components/PlanCard';
import UserTable from '../../components/UserTable';

const Subscription = () => {
  const [active, setActive] = useState('Plan');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [cards, setCards] = useState<any[]>([]); // Array to store card data

  const handleAddCard = () => {
    setCards([...cards, { planName: '', planPrice: '', billingCycle: '', features: [] }]);
  };

  const handleSaveCard = (data: any, index: number) => {
    const updatedCards = [...cards];
    updatedCards[index] = data;
    setCards(updatedCards);
    console.log('Updated Cards:', updatedCards); // Debugging or further processing
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

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
            {cards.map((_card, index) => (
              <PlanCard key={index} onSave={(data) => handleSaveCard(data, index)} />
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
