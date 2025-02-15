import React, { useEffect, useState } from "react";
import { getAllUsers } from "./services/user";
import Table from "./components/Table";

const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleGetAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getAllUsers(page, selectedOption);

      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const previousPage = () => {
    setPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const resetFilter = () => {
    setSearch("");
    setSelectedOption(null);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, [page, selectedOption]);

  return (
    <div className="py-5 px-10">
      <h2 className="text-2xl font-bold mb-4 text-center">List of Users</h2>
      <Table
        data={users}
        loading={loading}
        page={page}
        previousPage={previousPage}
        nextPage={nextPage}
        search={search}
        handleChangeSearch={handleChangeSearch}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        resetFilter={resetFilter}
      />
    </div>
  );
};

export default App;
