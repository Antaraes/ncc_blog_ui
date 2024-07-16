'use client';
import Header from '@/components/Navbar/Header';
import MobileNav from '@/components/Navbar/MobileNav';
import { useSearchContext } from '@/context/searchData';
import { useKeyboardShortcut } from '@/hooks/useKeyBoardShortcut';
import useSearchQuery from '@/hooks/useSearchQuery';
import { FC, useState, useEffect } from 'react';
import Headroom from 'react-headroom';
import debounce from 'lodash/debounce';

const Navbar: FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, setData } = useSearchContext();
  const {
    data: searchedData,
    isLoading,
    error,
    refetch,
  } = useSearchQuery(searchQuery);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  useKeyboardShortcut(['ctrl', 'shift', 'f'], () => toggleSearch());

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debounceSearch(event.target.value);
  };

  const debounceSearch = debounce((query: string) => {
    refetch();
  }, 300);

  useEffect(() => {
    if (searchedData) {
      setData(searchedData.data.data);
    }
  }, [searchedData, setData]);

  const handleSearchSubmit = (event: any) => {
    // event.preventDefault();
  };

  // console.log(searchedData?.data.data);
  return (
    <Headroom style={{ transition: 'all .5s ease-in-out', zIndex: 999 }}>
      <Header
        isSearchOpen={isSearchOpen}
        toggleSearch={toggleSearch}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      <MobileNav
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
    </Headroom>
  );
};

export default Navbar;
