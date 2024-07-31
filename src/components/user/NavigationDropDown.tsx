'use client';
import React, { FC, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useMediaQuery } from '@react-hook/media-query';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import { getAllCategories } from '@/api';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';
import toast from 'react-hot-toast';

interface NavigationDropDownProps {}

interface Menu {
  id: any;
  name: string;
  subCategories?: SubMenu[];
}

interface SubMenu {
  id: number;
  name: string;
  link: string;
}

const NavigationDropDown: FC<NavigationDropDownProps> = () => {
  const [activeMenu, setActiveMenu] = useState<Menu | null>(null);
  const handleMenuClick = (menu: Menu) => {
    if (menu.subCategories?.length == 0) {
      toast.error('There is no sub categories');
      return;
    }
    setActiveMenu(menu === activeMenu ? null : menu);
  };
  const handleRemoveMenuClick = () => {
    setActiveMenu(null);
  };
  const { data } = useFetch('all-categories', getAllCategories);
  const isMobile = useMediaQueryProvide();

  const categories = data?.data;

  const formatCategories = (categories: any) => {
    return categories
      ? categories.map((parentCategory: any) => ({
          id: parentCategory._id,
          name: parentCategory.name,
          subCategories: parentCategory.sub_categories.map(
            (subCategory: any) => ({
              id: subCategory._id,
              name: subCategory.name,
              link: `/categories/${subCategory._id}`,
            })
          ),
        }))
      : [];
  };

  const formattedCategories = formatCategories(categories);

  if (isMobile) {
    return (
      <div>
        <p className="flex w-full items-center py-2 text-lg font-semibold">
          Articles
        </p>
        {activeMenu !== null ? (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col z-40"
          >
            <div
              className="flex gap-2 rounded-md p-2 cursor-pointer hover:bg-secondary text-sm items-center"
              onClick={handleRemoveMenuClick}
            >
              <ChevronLeft />
              <p>{activeMenu.name}</p>
            </div>
            <ul className="overflow-hidden overflow-y-scroll transition-[max-height] duration-300 ease-in-out max-h-50 flex flex-col">
              {activeMenu.subCategories &&
                activeMenu.subCategories.map((subMenu, idx) => {
                  return (
                    <Link
                      href={{
                        pathname: `/products/${activeMenu.name}/${subMenu.name}`,
                        query: {
                          categoryId: activeMenu.id,
                          subCategoryId: subMenu.id,
                        },
                      }}
                      as={`/products/${activeMenu.name}/${subMenu.name}`}
                      key={`${idx}-${subMenu.name}`}
                      passHref
                    >
                      <p className="flex px-5 cursor-pointer text-center text-sm py-2 hover:text-black hover:font-bold">
                        {subMenu.name}
                      </p>
                    </Link>
                  );
                })}
            </ul>
          </motion.div>
        ) : (
          <ul className="py-2 text-black overflow-y-scroll max-h-[200px]">
            {formattedCategories.map((category: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '0%' }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="flex rounded-md p-2 cursor-pointer hover:bg-secondary text-black text-sm items-center gap-x-4"
                  onClick={() =>
                    handleMenuClick({
                      id: category.id,
                      name: category.name,
                      subCategories: category.subCategories,
                    })
                  }
                >
                  <span className="flex-1">{category.name}</span>
                  {category.subCategories &&
                    category.subCategories.length > 0 && <ChevronRight />}
                </button>
              </motion.div>
            ))}
          </ul>
        )}
      </div>
    );
  } else {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className=" text-black before:bg-black/90 after:bg-black/90 hover:text-black/90 inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-500 before:absolute before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] ">
              Articles
            </NavigationMenuTrigger>
            <NavigationMenuContent className=" bg-white ">
              <ul className="grid  w-[800px] overflow-y-scroll max-h-[200px]  text-black p-4   lg:grid-cols-4  z-50">
                {formattedCategories.map((category: any) => {
                  return (
                    <ListItem key={category.id} title={category.name}>
                      <div className="grid  grid-cols-1  ">
                        {category.subCategories &&
                          category.subCategories.map((subCategory: any) => (
                            <Link
                              href={{
                                pathname: `/products/${category.name}/${subCategory.name}`,
                                query: {
                                  categoryId: category.id,
                                  subCategoryId: subCategory.id,
                                },
                              }}
                              as={`/products/${category.name}/${subCategory.name}`}
                              key={subCategory.id}
                              passHref
                            >
                              <p className="hover:text-black text-muted-foreground hover:font-bold mt-2">
                                {subCategory.name}
                              </p>
                            </Link>
                          ))}
                      </div>
                    </ListItem>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground ',
            className
          )}
          {...props}
        >
          <div className="text-xs font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-background/20 mt-3">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
export default NavigationDropDown;
