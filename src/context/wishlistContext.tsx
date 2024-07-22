'use client';
import { createContext, FC, useContext, useState } from 'react';

interface WishlistContextType {
  wishlistCount: number;
  setWishlistCount: React.Dispatch<React.SetStateAction<number>>;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistCount: 0,
  setWishlistCount: () => {},
});

export const useWishlistContext = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }: { children: any }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <WishlistContext.Provider value={{ wishlistCount, setWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
