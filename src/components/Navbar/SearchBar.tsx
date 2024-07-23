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
            exit={{ height: 0 }}
            className=" w-full z-30 absolute"
          >
            <div className="flex justify-center">
              <form className="flex items-center bg-transparent p-2 mt-10">
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
            <div className="lg:w-[55%] xl:w-[50%]  mx-auto">
              {data && data.sub_category?.length > 0 && (
                <p className="text-muted-foreground font-bold">Categories</p>
              )}
              <div className="max-h-[150px] overflow-y-scroll leading-7">
                {data &&
                  data.sub_category?.map((item: any) => (
                    <Link
                      href={{
                        pathname: `/products/${item.parent_category_id.name}/${item.name}`,
                        query: {
                          categoryId: item.parent_category_id._id,
                          subCategoryId: item._id,
                        },
                      }}
                      key={item._id}
                      passHref
                      className="block mt-2 hover:font-bold"
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
              {data && data.blogs?.length > 0 && (
                <p className="text-muted-foreground font-bold">Blogs</p>
              )}
              <div className="max-h-[250px] overflow-y-scroll leading-7 ">
                {data &&
                  data.blogs?.map((blog: any) => (
                    <Link
                      key={blog._id}
                      href={`/product/${blog._id}`}
                      className="block mt-3 hover:font-bold"
                    >
                      {blog.title}
                    </Link>
                  ))}
              </div>
              {data &&
                data.sub_category?.length == 0 &&
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
          className="absolute hidden inset-0 h-screen bg-white backdrop-filter backdrop-blur-lg lg:block justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        ></motion.div>
      )}
    </div>
  );
};

export default SearchBar;
