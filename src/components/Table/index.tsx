/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Table = ({
  title,
  data,
  columns,
  showHeader = false,
  isSchool = false,
  deletable = false, // New prop for delete
  editable = false, // New prop for edit
  onDelete, // Callback function for delete
  onEdit // Callback function for edit
}: any) => {
  const {
    setSchoolDetails,
    setShowSchoolDetails,
    setStudentDetails,
    setShowStudentDetails,
    setShowAdminDetails,
    setAdminDetails
  } = useContext(AppContext);

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
                {editable && (
                  <th className="py-4 px-4 text-left text-sm font-medium bg-primary-light text-white">
                    Edit
                  </th>
                )}
                {deletable && (
                  <th className="py-4 px-4 text-left text-sm font-medium bg-primary-light text-white">
                    Delete
                  </th>
                )}
              </tr>
            </thead>
          )}
          <tbody>
            {data?.length === 0 && (
              <tr className="flex items-center justify-center">
                <td>No data available</td>
              </tr>
            )}
            {!isSchool &&
              data?.map((row: any, rowIndex: any) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'}>
                  {columns.map((column: any, colIndex: any) => {
                    if (column.accessor === 'status') {
                      return (
                        <td
                          key={colIndex}
                          className={`py-2.5 px-4 text-sm text-green-700 cursor-pointer ${
                            row[column.accessor] === 'active' ? 'text-primary-light' : 'text-black'
                          } `}
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

                  {editable && (
                    <td className="py-2.5 px-4 text-sm text-blue-600 cursor-pointer">
                      <button onClick={() => onEdit && onEdit(row)} className="hover:underline">
                        <img src="/edit-icon.svg" alt="" />
                      </button>
                    </td>
                  )}
                  {deletable && (
                    <td className="py-2.5 px-4 text-sm text-red-600 cursor-pointer">
                      <button onClick={() => onDelete && onDelete(row)} className="hover:underline">
                        <img src="/delete-icon.svg" alt="" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            {isSchool &&
              data?.map((row: any, rowIndex: any) => (
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
                            setStudentDetails(row);
                            setShowStudentDetails(true);
                          }}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else if (column.accessor === 'adminName') {
                      return (
                        <td
                          key={colIndex}
                          className="py-2.5 px-4 text-sm text-green-700 cursor-pointer"
                          onClick={() => {
                            setAdminDetails(row);
                            setShowAdminDetails(true);
                          }}
                        >
                          {row[column.accessor]}
                        </td>
                      );
                    } else if (column.accessor === 'status') {
                      return (
                        <td
                          key={colIndex}
                          className={`py-2.5 px-4 text-sm text-green-700 cursor-pointer ${
                            row[column.accessor] === 'active' ? 'text-primary-light' : 'text-black'
                          } `}
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
                  {editable && (
                    <td className="py-2.5 px-4 text-sm text-blue-600 cursor-pointer">
                      <button
                        onClick={() => onEdit && onEdit(row)}
                        className="hover:scale-110 duration-300 transition-all"
                      >
                        <img src="/edit-icon.svg" alt="" />
                      </button>
                    </td>
                  )}
                  {deletable && (
                    <td className="py-2.5 px-4 text-sm text-red-600 cursor-pointer">
                      <button
                        onClick={() => onDelete && onDelete(row)}
                        className="hover:scale-110 duration-300 transition-all"
                      >
                        <img src="/delete-icon.svg" alt="" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
