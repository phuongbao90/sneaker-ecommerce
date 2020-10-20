import { useState, useEffect } from "react";
import useSwr from "swr";
import { CONSTANT } from "utils/Constant";

const SearchForm = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const { data: results, error } = useSwr(() =>
    searchTerm
      ? `${process.env.API}/sneakers?_q=${searchTerm}&_limit=${CONSTANT.SEARCH_LIMIT}`
      : null
  );

  useEffect(() => {
    setSearchResults(results);
  }, [results]);

  useEffect(() => {}, []);
  return (
    <>
      <form className="w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent border-b-2 border-black placeholder-gray-600 text-gray-600 outline-none"
          onChange={handleChange}
          value={searchTerm}
        />
      </form>
    </>
  );
};

export default SearchForm;
