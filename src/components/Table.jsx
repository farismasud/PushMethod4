import React, { useState } from "react";
import { formatDate } from "../utils/changeFormatDate";
import {
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import Select from "react-select";

const Table = ({
  data,
  loading,
  page,
  previousPage,
  nextPage,
  search,
  handleChangeSearch,
  selectedOption,
  setSelectedOption,
  resetFilter,
}) => {
  const listKey = {
    username: '["login"]["username"]',
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const getNestedValue = (obj, key) => {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.first.toLowerCase().includes(search.toLowerCase()) ||
      item.name.last.toLowerCase().includes(search.toLowerCase()) ||
      item.login.username.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    console.log(a);
    if (!sortConfig.key) return 0;

    const firstValue = getNestedValue(a, sortConfig.key);
    const secondValue = getNestedValue(b, sortConfig.key);

    if (firstValue < secondValue)
      return sortConfig.direction === "asc" ? -1 : 1;
    if (firstValue > secondValue)
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const options = [
    { value: "", label: "All" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="mb-4 flex items-center gap-4">
        <div className="w-full max-w-sm gap-4 flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => handleChangeSearch(e)}
            placeholder="Search..."
            className="px-4 py-2 border rounded-md w-full outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="w-full max-w-sm gap-4 flex items-center">
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            className="w-full"
          />
          <button
            className="py-2 px-4 border bg-white text-nowrap rounded-lg cursor-pointer"
            onClick={resetFilter}
          >
            Reset Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="h-8 bg-gray-300 rounded-md"></div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-xl">
            <thead className="bg-black text-white">
              <tr>
                <th
                  className="py-2 px-4"
                  onClick={() => requestSort("login.username")}
                >
                  <div className="flex flex-row items-center justify-between cursor-pointer">
                    <p>Username</p>
                    <p>{getSortIcon("username")}</p>
                  </div>
                </th>
                <th
                  className="py-2 px-4"
                  onClick={() => requestSort("name.title")}
                >
                  <div className="flex flex-row items-center justify-between cursor-pointer">
                    <p>Name</p>
                    <p>{getSortIcon("name")}</p>
                  </div>
                </th>
                <th className="py-2 px-4" onClick={() => requestSort("email")}>
                  <div className="flex flex-row items-center justify-between cursor-pointer">
                    <p>Email</p>
                    <p>{getSortIcon("email")}</p>
                  </div>
                </th>
                <th className="py-2 px-4" onClick={() => requestSort("gender")}>
                  <div className="flex flex-row items-center justify-between cursor-pointer">
                    <p>Gender </p>
                    <p>{getSortIcon("gender")}</p>
                  </div>
                </th>
                <th
                  className="py-2 px-4"
                  onClick={() => requestSort("registered.date")}
                >
                  <div className="flex flex-row items-center justify-between cursor-pointer">
                    <p>Registered Date </p>
                    <p>{getSortIcon("registered.date")}</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length > 0 ? (
                sortedData.map((user) => (
                  <tr
                    className="border-b hover:bg-gray-100 transition duration-200"
                    key={user?.login?.uuid}
                  >
                    <td className="py-2 px-4">{user?.login?.username}</td>
                    <td className="py-2 px-4">
                      {user?.name?.title} {user?.name?.first} {user?.name?.last}
                    </td>
                    <td className="py-2 px-4">{user?.email}</td>
                    <td className="py-2 px-4 capitalize">{user?.gender}</td>
                    <td className="py-2 px-4">
                      {formatDate(user?.registered?.date)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-2">
                    <div className="flex justify-center font-bold text-lg">
                      Data not found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-gray-200">
              <tr>
                <td colSpan="5" className="py-2 px-4">
                  <div className="flex justify-end space-x-2">
                    {/* Previous Button */}
                    <button
                      className={`p-1 rounded-md flex items-center justify-center hover:bg-gray-200 transition-all ${
                        page === 1
                          ? "cursor-not-allowed bg-gray-400"
                          : "cursor-pointer bg-white"
                      }`}
                      disabled={page === 1}
                      onClick={previousPage}
                    >
                      <FaAngleLeft size={20} />
                    </button>

                    {/* Page Indicator */}
                    <span className="px-3 py-1 bg-white cursor-pointer">
                      {page}
                    </span>

                    {/* Next Button */}
                    <button
                      className="cursor-pointer p-1 bg-white rounded-md flex items-center justify-center hover:bg-gray-200 transition-all"
                      onClick={nextPage}
                    >
                      <FaAngleRight size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
