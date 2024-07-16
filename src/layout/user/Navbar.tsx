'use client';
import Header from '@/components/Navbar/Header';
import MobileNav from '@/components/Navbar/MobileNav';
import { useSearchContext } from '@/context/searchData';
import { useKeyboardShortcut } from '@/hooks/useKeyBoardShortcut';
import useSearchQuery from '@/hooks/useSearchQuery';
import { FC, useState } from 'react';
import Headroom from 'react-headroom';

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
  };
  console.log(searchedData?.data.data);
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setData(searchedData && searchedData.data.data);
  };

  return (
    <Headroom style={{ transition: 'all .5s ease-in-out' }}>
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
