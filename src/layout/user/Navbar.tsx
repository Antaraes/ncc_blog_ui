'use client';
import { FC, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HeartIcon, MenuIcon, SearchIcon } from 'lucide-react';
import Headroom from 'react-headroom';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import NavigationDropDown from '@/components/user/NavigationDropDown';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, delay } from 'framer-motion';
import { useWishlistContext } from '@/context/wishlistContext';
import { isAuthenticated } from '@/lib';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [isSignupModal, setIsSignupModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [wishlists, setWishlists] = useState([]);
  const { wishlistCount } = useWishlistContext();
  const navMenu: any = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Contact Us',
      href: '/contactus',
    },
  ];
  useEffect(() => {
    // Retrieve wishlist count from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    setWishlists(wishlist);
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = '';
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    window.document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Perform search suggestions logic here
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Search submitted:', searchQuery);
  };

  return (
    <Headroom style={{ transition: 'all .5s ease-in-out' }}>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="absolute inset-0 h-screen bg-white/70 backdrop-filter backdrop-blur-lg flex justify-center items-center"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}
      </AnimatePresence>
      <header
        ref={headerRef}
        className={`lg:block hidden w-full h-${isSearchOpen ? '[400px]' : '20'} ${isSearchOpen ? 'items-start' : 'items-center'} shrink-0  bg-white border-b-2 drop-shadow-sm  px-10 lg:justify-around z-30`}
      >
        <div
          className={`flex justify-between lg:justify-around ${!isSearchOpen ? 'h-full' : 'mt-3'} w-full`}
        >
          <div className="hidden lg:flex gap-6 items-center">
            <Link href={'/'}>
              <Image
                src={'/assets/apple.png'}
                alt="logo"
                width={20}
                height={20}
              />
            </Link>
            {navMenu.map((item: any, index: number) => (
              <Link
                key={index}
                className={`relative text-black before:bg-black/90 after:bg-black/90 hover:text-black/90 inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-500 before:absolute before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]`}
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated() && (
              <Link
                className={`relative text-black before:bg-black/90 after:bg-black/90 hover:text-black/90 inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-500 before:absolute before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]`}
                href={'/admin'}
              >
                Dashboard
              </Link>
            )}
            <NavigationDropDown />
          </div>

          <div className="lg:flex hidden items-center gap-4">
            <SearchIcon className={`cursor-pointer `} onClick={toggleSearch} />

            <Sheet>
              <SheetTrigger asChild>
                <div className="relative">
                  <HeartIcon className="cursor-pointer" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                {wishlists.length > 0 &&
                  wishlists.map((wishlist: any, index) => (
                    <div key={index} className="border-b-2 ">
                      <p>{wishlist.title}</p>
                      <a href={wishlist.url} className="text-muted-foreground">
                        {wishlist.url}
                      </a>
                    </div>
                  ))}
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '100px' }}
              exit={{ height: 0 }}
              className="flex z-30  justify-center w-full"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-transparent  p-2 mt-10"
              >
                <Input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="flex-grow w-[600px]"
                />
                <Button
                  type="submit"
                  className="ml-2 bg-primary text-white px-4 py-2 rounded"
                >
                  <SearchIcon />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="flex md:hidden justify-between w-full py-5 bg-white">
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden" color="white">
              <MenuIcon className="h-10 w-10" />
              <span className="sr-only">Toggle navigation menu</span>
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="bg-white ">
            <div className="grid gap-2 py-10">
              {navMenu.map((item: any, index: number) => (
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
                  className={`flex w-full items-center py-2 text-lg font-semibold`}
                  href={'/admin'}
                >
                  Dashboard
                </Link>
              )}
              <NavigationDropDown />
            </div>
          </SheetContent>
        </Sheet>
        <div className="md:hidden items-center flex gap-4">
          <SearchIcon className={`cursor-pointer `} onClick={toggleSearch} />

          <HeartIcon />
        </div>
      </div>
    </Headroom>
  );
};

export default Navbar;
