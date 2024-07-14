import { FC, Suspense, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Box,
  Calendar,
  ChevronDown,
  Database,
  Layout,
  LayoutDashboard,
  ListChecks,
  LogOutIcon,
  ReceiptSwissFranc,
  Settings,
  User,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { logout } from '@/lib';
import { title } from 'process';

interface SidebarProps {
  className?: string;
  toggleSidebar: () => void;
}

const Menus = [
  {
    title: 'Dashboard',
    src: 'Chart_fill',
    icon: <AreaChart />,
    link: '/admin',
  },
  {
    title: 'Category ',
    src: 'Calendar',
    gap: true,
    icon: <Layout />,
    link: '/admin/category',
    subMenus: [
      {
        title: 'Add Main Category',
        src: '/admin/category/create?type=main_category',
      },
      {
        title: 'Add Sub Category',
        src: '/admin/category/create?type=sub_category',
      },
    ],
  },

  {
    title: 'Product',
    src: 'User',
    link: '/admin/product',
    icon: <Box />,
    subMenus: [],
  },

  {
    title: 'Customer Feedback ',
    src: 'customer',
    icon: <User />,
    link: '/admin/feedback',
  },

  {
    title: 'Team ',
    src: 'team',
    icon: <Users />,
    link: '/admin/team',
    shortcut: 'Alt+T',
    hr: true,
  },
  {
    title: 'Settings',
    src: 'settings',
    icon: <Settings />,
    link: '/admin/setting',
  },
  {
    title: 'Logout',
    src: 'logout',
    icon: <LogOutIcon />,
    function: logout,
    link: '/admin/login',
  },
];

const Sidebar: FC<SidebarProps> = ({ className, toggleSidebar }) => {
  const location = usePathname();
  const searchparams = useSearchParams();
  const [openSubMenus, setOpenSubMenus] = useState<boolean[]>(
    Array(Menus.length).fill(false)
  );

  const handleToggleSubMenu = (index: number) => {
    setOpenSubMenus((prevOpenSubMenus) => {
      const newOpenSubMenus = [...prevOpenSubMenus];
      newOpenSubMenus[index] = !newOpenSubMenus[index];
      return newOpenSubMenus;
    });
  };

  return (
    <Suspense>
      <div className={cn('pb-12', className)}>
        <div className="shadow-[rgba(0,0,15,0.2)_0px_5px_50px_0px] h-screen fixed top-0 left-0 min-w-[250px] py-6 font-[sans-serif] overflow-auto">
          <X
            className="absolute right-2 md:hidden cursor-pointer"
            onClick={toggleSidebar}
          />
          <div className="px-4 py-2 flex flex-col h-full">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              E commerce
            </h2>
            <div className="space-y-1 flex-1">
              <ul className="pt-6">
                {Menus.map((Menu, index) => (
                  <div key={index}>
                    <Link
                      href={Menu.link}
                      className={`relative flex rounded-md p-2 cursor-pointer hover:bg-primary hover:text-white text-sm items-center gap-x-4 
    ${Menu.gap ? 'mt-9' : 'mt-2'} ${location === Menu.link ? 'bg-primary text-white before:absolute before:-left-4 before:rounded-md before:top-0 before:bottom-0 before:w-1 before:bg-primary' : 'text-foreground dark:text-white'}`}
                    >
                      {Menu.icon ? Menu.icon : <LayoutDashboard />}
                      <span className="flex-1">
                        {Menu.title}{' '}
                        <span className="ml-8 text-xs tracking-widest opacity-80">
                          {Menu?.shortcut}
                        </span>
                      </span>
                      {Menu.subMenus && Menu.subMenus?.length > 0 && (
                        <ChevronDown
                          onClick={() => handleToggleSubMenu(index)}
                          className={`${openSubMenus[index] && 'rotate-180'} transition-all duration-200 ease-in-out`}
                        />
                      )}
                    </Link>

                    {Menu.subMenus &&
                      Menu.subMenus?.length > 0 &&
                      Menu.subMenus && (
                        <ul
                          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                            openSubMenus[index] ? 'max-h-40' : 'max-h-0'
                          }`}
                        >
                          {Menu.subMenus.length > 0 &&
                            Menu.subMenus.map((subMenuItem: any, idx) => {
                              return (
                                <Link
                                  href={subMenuItem?.src}
                                  key={`${idx}-${Menu?.title}`}
                                  className={`flex px-5 cursor-pointer text-center text-sm text-black py-2 hover:text-blue-500  ${
                                    searchparams
                                      .get('type')
                                      ?.includes(subMenuItem?.src) &&
                                    'text-blue-500'
                                  }`}
                                >
                                  {subMenuItem.title}
                                </Link>
                              );
                            })}
                        </ul>
                      )}
                    {Menu.hr && <Separator className="my-2" />}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Sidebar;
