/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Table = ({ title, data, columns, showHeader = false, isSchool = false }: any) => {
  const { setSchoolDetails, setShowSchoolDetails, setUserDetails, setShowUserDetails } =
    useContext(AppContext);

  return (
    <div className="w-full bg-white rounded-lg">
      {title && <h2 className="text-lg font-semibold p-4 pb-2 border-b border-black">{title}</h2>}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {showHeader && (
            <thead>
              <tr>
                {columns.map((column: any, index: any) => (
                  <th
                    key={index}
                    className="py-4 px-4 text-left text-sm font-medium bg-primary-light text-white"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {!isSchool &&
              data.map((row: any, rowIndex: any) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'}>
                  {columns.map((column: any, colIndex: any) => (
                    <td key={colIndex} className="py-2.5 px-4 text-sm text-gray-700">
                      {row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            {isSchool &&
              data.map((row: any, rowIndex: any) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'}>
                  {columns.map((column: any, colIndex: any) => {
                    if (column.accessor === 'Name') {
                      return (
                        <td
                          key={colIndex}
                          className="py-2.5 px-4 text-sm text-gray-700 cursor-pointer"
                          onClick={() => {
                            setSchoolDetails(row);
                            setShowSchoolDetails(true);
                          }}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else if (column.accessor === 'name') {
                      return (
                        <td
                          key={colIndex}
                          className="py-2.5 px-4 text-sm text-green-700 cursor-pointer"
                          onClick={() => {
                            console.log('Green column clicked');
                            setUserDetails(row);
                            setShowUserDetails(true);
                          }}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else {
                      return (
                        <td key={colIndex} className="py-2.5 px-4 text-sm text-gray-700">
                          {row[column.accessor]}
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
