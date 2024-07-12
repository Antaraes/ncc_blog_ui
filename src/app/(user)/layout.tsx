import { WishlistProvider } from '@/context/wishlistContext';
import Footer from '@/layout/user/Footer';
import Navbar from '@/layout/user/Navbar';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="">
      <WishlistProvider>
        <Navbar />
        {children}
        <Footer />
      </WishlistProvider>
    </div>
  );
};

export default layout;
