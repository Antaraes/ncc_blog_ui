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
import { useSearchContext } from '@/context/searchData';

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
  const { data } = useSearchContext();
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
              <motion.div className=" z-30 ">
                <div className="flex justify-center w-full">
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
                </div>
                <div className="w-[80%] mx-auto">
                  {data && data.sub_category?.length > 0 && (
                    <p className="text-muted-foreground font-bold">
                      Categories
                    </p>
                  )}
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
                        className="block"
                      >
                        {item.name}
                      </Link>
                    ))}
                  {data && data.blogs?.length > 0 && (
                    <p className="text-muted-foreground font-bold">Blogs</p>
                  )}
                  {data &&
                    data.blogs?.map((blog: any) => (
                      <Link
                        key={blog._id}
                        href={`/product/${blog._id}`}
                        className="block"
                      >
                        {blog.title}
                      </Link>
                    ))}
                  {data &&
                    data.sub_category?.length == 0 &&
                    data.blogs?.length == 0 && (
                      <p className="text-center text-muted-foreground font-bold">
                        No Result Found
                      </p>
                    )}
                </div>
              </motion.div>
            </AnimatePresence>
          </SheetContent>
        </Sheet>
        {/* <WishlistIcon /> */}
      </div>
    </div>
  );
};

export default MobileNav;
