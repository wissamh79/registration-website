import { useState, useTransition } from "react";
import { Icons } from "@/components/icons";

const SearchBar = ({ data, setSearchResult, style }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleSearchChange = (e) => {
    startTransition(() => {
      if (!e.target.value) {
        setSearchResult(data);
      } else {
        const result = data?.filter(
          (item) =>
            item.fullName
              ?.toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            item.email?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.phoneNumber
              ?.toLowerCase()
              .includes(e.target.value.toLowerCase())
        );

        setSearchResult(result);
      }
    });
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      setSearchValue("");
      setSearchResult(data);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center  rounded shadow-base  ${style}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search"
        className="w-full px-3 py-2 text-base font-semibold rounded outline-none bg-input"
      />

      <button className="absolute bottom-2 right-2" onClick={handleSubmit}>
        <span className="text-gray-700 dark:text-gray-300">
          {searchValue && <Icons.close />}
        </span>
      </button>
    </div>
  );
};

export default SearchBar;
