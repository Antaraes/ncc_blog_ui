'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useKeyboardShortcut } from '@/hooks/useKeyBoardShortcut';
import { logout } from '@/lib/index';
import { CircleUser, Menu, SearchIcon, Store } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar: FC<NavbarProps> = ({ toggleSidebar, sidebarOpen }) => {
  const router = useRouter();
  return (
    <div className="flex items-center shadow-md  sticky top-0 left-0 z-30 h-20 bg-background   drop-shadow-lg  gap-4 md:px-16 px-4">
      <div className={`flex justify-between items-center duration-300 w-full `}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Menu
                  size={30}
                  className="  "
                  color="#040404"
                  onClick={toggleSidebar}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Sidebar ⌘+B</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Link href={'/'}>
              <Store className="md:hidden" color="white" />
              <p className="hidden md:flex ">View Webiste</p>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-6 w-6" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/admin/profile')}>
                Profile
                <DropdownMenuShortcut className="ms-4">
                  ⌘+ ,
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut className="ms-4">
                  ⌘+Shift+K
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Support
                <DropdownMenuShortcut className="ms-4">
                  ⌘+L
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
