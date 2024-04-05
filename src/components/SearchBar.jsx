import {React} from "react";

function SearchBar({searchValue, setSearchValue, handleKeyDown, search}) {

  return (
    <div className="flex justify-between rounded-xl backdrop-blur-lg bg-[#072435]/40 text-white py-2 px-4 border-2">
      <input
        type="text"
        placeholder="Cerca una località"
        className="rounded-xl bg-transparent placeholder:text-white outline-none w-full"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="rounded-xl" onClick={search}>
        Cerca
      </button>
    </div>
  );
}

export default SearchBar;
