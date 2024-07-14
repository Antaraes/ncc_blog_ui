import { FC, useEffect, useState } from 'react';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import { HeartIcon } from 'lucide-react';
import { useWishlistContext } from '@/context/wishlistContext';

const WishlistIcon: FC = () => {
  const { wishlistCount } = useWishlistContext();
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlists(wishlist);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <HeartIcon className="cursor-pointer" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
              {wishlistCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white">
        {wishlists.length > 0 &&
          wishlists.map((wishlist: any, index) => (
            <div key={index} className="border-b-2">
              <p>{wishlist.title}</p>
              <a href={wishlist.url} className="text-muted-foreground">
                {wishlist.url}
              </a>
            </div>
          ))}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistIcon;
