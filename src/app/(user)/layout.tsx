import Navbar from '@/layout/user/Navbar';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="">
      <Navbar />

      {children}
    </div>
  );
};

export default layout;
