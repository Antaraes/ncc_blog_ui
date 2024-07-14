'use client';
import Header from '@/components/Navbar/Header';
import MobileNav from '@/components/Navbar/MobileNav';
import { useKeyboardShortcut } from '@/hooks/useKeyBoardShortcut';
import { FC, useState } from 'react';
import Headroom from 'react-headroom';

const Navbar: FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  useKeyboardShortcut(['ctrl', 'shift', 'f'], () => toggleSearch());

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Search submitted:', searchQuery);
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
