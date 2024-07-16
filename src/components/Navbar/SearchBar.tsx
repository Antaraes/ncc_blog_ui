import { FC, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { useSearchContext } from '@/context/searchData';
import Link from 'next/link';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';

interface SearchBarProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const SearchBar: FC<SearchBarProps> = ({
  isSearchOpen,
  toggleSearch,
  handleSearchSubmit,
  handleSearchChange,
  searchQuery,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { data } = useSearchContext();
  const isMobile = useMediaQueryProvide();

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
        toggleSearch();
      }
    };

    window.document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isSearchOpen, toggleSearch]);

  return (
    <div className="relative">
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ opacity: 1 }}
            // animate={{ height: '100px' }}
            exit={{ height: 0 }}
            className=" w-full z-30 absolute"
          >
            <div className="flex justify-center ">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-transparent p-2 mt-10"
              >
                <Input
                  autoFocus
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
            </div>
            <div className="lg:w-[55%] xl:w-[50%] mx-auto">
              {data && data.categories?.length > 0 && (
                <p className="text-muted-foreground font-bold">Categories</p>
              )}
              {data &&
                data.categories?.map((item: any) => (
                  <Link href={`/products/`} key={item._id} className="">
                    {item.name}
                  </Link>
                ))}
              {data && data.blogs?.length > 0 && (
                <p className="text-muted-foreground font-bold">Blogs</p>
              )}
              {data &&
                data.blogs?.map((blog: any) => (
                  <p key={blog._id} className="">
                    {blog.title}
                  </p>
                ))}
              {data &&
                data.categories?.length == 0 &&
                data.blogs?.length == 0 && (
                  <p className="text-center text-muted-foreground font-bold">
                    No Result Found
                  </p>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="absolute  hidden inset-0 h-screen bg-white/70 backdrop-filter backdrop-blur-lg md:block justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        ></motion.div>
      )}
    </div>
  );
};

export default SearchBar;
