'use client';
import { createContext, FC, useContext, useState } from 'react';

interface SearchContextType {
  data: any;
  setData: React.Dispatch<React.SetStateAction<number>>;
}

const SearchContext = createContext<SearchContextType>({
  data: {},
  setData: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }: { children: any }) => {
  const [data, setData] = useState({});

  return (
    <SearchContext.Provider value={{ data, setData }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
