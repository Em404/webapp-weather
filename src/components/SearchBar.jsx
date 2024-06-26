import {React} from "react";

function SearchBar({searchValue, setSearchValue, handleKeyDown, search}) {

  return (
    <div className="flex justify-between glass text-white py-4 px-2">
      <input
        type="text"
        placeholder="Cerca una località"
        className="rounded-xl bg-transparent placeholder:text-white outline-none w-full px-4"
        value={searchValue || ''}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="rounded-xl me-4" onClick={search}>
        Cerca
      </button>
    </div>
  );
}

export default SearchBar;
