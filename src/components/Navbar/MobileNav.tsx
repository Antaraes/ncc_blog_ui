import { FC } from 'react';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import { SearchIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import NavigationDropDown from '@/components/user/NavigationDropDown';
import { isAuthenticated } from '@/lib';
import WishlistIcon from './Wishlist';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface MobileNavProps {
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const MobileNav: FC<MobileNavProps> = ({
  handleSearchSubmit,
  handleSearchChange,
  searchQuery,
}) => {
  const navMenu = [
    { name: 'Home', href: '/' },
    { name: 'Contact Us', href: '/contactus' },
  ];

  return (
    <div className="flex md:hidden justify-between w-full py-5 bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <button className="lg:hidden" color="white">
            <MenuIcon className="h-10 w-10" />
            <span className="sr-only">Toggle navigation menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white">
          <div className="grid gap-2 py-10">
            {navMenu.map((item, index) => (
              <Link
                key={index}
                className="flex w-full items-center py-2 text-lg font-semibold"
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated() && (
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/admin"
              >
                Dashboard
              </Link>
            )}
            <NavigationDropDown />
          </div>
        </SheetContent>
      </Sheet>
      <div className="md:hidden items-center flex gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <SearchIcon className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="top" className="bg-white/60 h-[400px]">
            <AnimatePresence>
              <motion.div className="flex justify-center w-full z-30">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-transparent p-2 mt-10"
                >
                  <Input
                    autoFocus
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="flex-grow"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="link"
                    className="ml-2 text-black rounded"
                  >
                    <SearchIcon />
                  </Button>
                </form>
              </motion.div>
            </AnimatePresence>
          </SheetContent>
        </Sheet>
        <WishlistIcon />
      </div>
    </div>
  );
};

export default MobileNav;
