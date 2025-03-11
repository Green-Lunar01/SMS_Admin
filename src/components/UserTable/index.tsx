/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '../Table';
import Pagination from '../Pagination';

const UserTable = ({
  columns,
  paginatedData,
  schools,
  handlePageChange,
  handleSearch,
  searchQuery,
  tableName
}: any) => {
  const convertToCSV = (data: any) => {
    const headers = columns.map((col: any) => col.header).join(',');
    const rows = data.map((row: any) => columns.map((col: any) => row[col.accessor]).join(','));
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (data: any) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'schools.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row justify-between items-start gap-5 md:gap-0 md:items-center py-5 md:mt-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/search-icon.svg" alt="" className="w-5 absolute top-[25%] left-3" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery || ''}
              onChange={handleSearch}
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
            onClick={() => downloadCSV(schools)}
            className="flex items-center gap-2 px-7 py-3 rounded-md bg-primary-light text-white"
          >
            <img src="/file-icon.svg" alt="" className="w-5" />
            Export
          </button>
        </div>
      </section>
      <p className="text-xs">
        Total: <span className="text-primary-light">{schools.length}</span>
      </p>
      <section className="w-full my-5">
        <Table
          columns={columns}
          data={paginatedData}
          showHeader={true}
          isSchool={true}
          tableName={tableName}
        />
      </section>
      <Pagination totalItems={schools.length} onPageChange={handlePageChange} />
    </div>
  );
};

export default UserTable;
