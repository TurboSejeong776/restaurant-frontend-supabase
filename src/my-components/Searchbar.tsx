import React from 'react';

import { SearchIcon } from 'lucide-react';

type SearchProps = {
  keyword: string;
  setKeyword: (val: string) => void;
};

const Searchbar: React.FC<SearchProps> = ({ keyword, setKeyword }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      id='searchBaseBody'
      className='flex flex-row w-full sm:w-[604px] h-[44px] rounded-full border-[1px] border-[#D5D7DA] bg-white px-[16px] py-[8px] gap-[6px] text-[#535862]'
    >
      <SearchIcon />
      <input
        type='text'
        placeholder='Search'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className={`w-full text-sm sm:text-[16px] bg-transparent outline-none tracking-tight ${
          keyword ? 'text-black' : 'text-[#535862]'
        }`}
      />
    </form>
  );
};

export default Searchbar;
