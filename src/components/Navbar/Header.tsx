import { FC } from 'react';
import NavLink from './NavLink';
import SearchBar from './SearchBar';

import { SearchIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import NavigationDropDown from '@/components/user/NavigationDropDown';
import { isAuthenticated } from '@/lib';
import WishlistIcon from './Wishlist';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface HeaderProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const Header: FC<HeaderProps> = ({
  isSearchOpen,
  toggleSearch,
  handleSearchSubmit,
  handleSearchChange,
  searchQuery,
}) => {
  const navMenu = [
    { name: 'Home', href: '/' },
    { name: 'Contact Us', href: '/contactus' },
  ];

  return (
    <header
      className={`lg:block hidden relative w-full h-${isSearchOpen ? '[400px]' : '20'} ${
        isSearchOpen ? 'items-start' : 'items-center'
      } shrink-0 bg-white border-b-2 drop-shadow-sm px-10 lg:justify-around z-30`}
    >
      <div
        className={`flex justify-between lg:justify-around ${
          !isSearchOpen ? 'h-full' : 'mt-3'
        } w-full`}
      >
        <div className="flex gap-6 items-center">
          {navMenu.map((item, index) => (
            <NavLink key={index} href={item.href} name={item.name} />
          ))}
          {isAuthenticated() && <NavLink href="/admin" name="Dashboard" />}
          <NavigationDropDown />
        </div>
        <div className="lg:flex hidden items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SearchIcon className="cursor-pointer" onClick={toggleSearch} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Searchbar Crtl+Shift+F</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <WishlistIcon /> */}
        </div>
      </div>
      <SearchBar
        isSearchOpen={isSearchOpen}
        toggleSearch={toggleSearch}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
    </header>
  );
};

export default Header;
