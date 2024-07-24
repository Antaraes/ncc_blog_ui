import { FC } from 'react';
import NavLink from './NavLink';
import SearchBar from './SearchBar';

import { SearchIcon, MenuIcon, LayoutDashboard } from 'lucide-react';
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
  const navMenu = [{ name: 'Home', href: '/' }];

  return (
    <header
      className={`lg:flex flex-col hidden relative w-full h-auto min-h-20 shrink-0 bg-white border-b-2 drop-shadow-sm  lg:justify-around  `}
    >
      <div
        className={`flex justify-between lg:justify-around  h-full w-full absolute z-50 `}
      >
        <div className="flex gap-6 items-center">
          {navMenu.map((item, index) => (
            <NavLink key={index} href={item.href} name={item.name} />
          ))}

          <div className="relative">
            <NavigationDropDown />
          </div>
        </div>
        <div className="lg:flex hidden items-center gap-4">
          {isAuthenticated() && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={'/admin'}>
                    <LayoutDashboard className="hover:scale-105" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
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
