import Link from 'next/link';
import { FC } from 'react';

interface NavLinkProps {
  href: string;
  name: string;
}

const NavLink: FC<NavLinkProps> = ({ href, name }) => (
  <Link
    className={`relative text-black before:bg-black/90 after:bg-black/90 hover:text-black/90 inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-500 before:absolute before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]`}
    href={href}
  >
    {name}
  </Link>
);

export default NavLink;
