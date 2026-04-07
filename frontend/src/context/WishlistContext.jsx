import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const { data } = await API.get('/wishlist');
      setWishlist(data);
    } catch (err) {
      console.error('Wishlist fetch error:', err);
    }
  };

  useEffect(() => { fetchWishlist(); }, [user]);

  const addToWishlist = async (productId) => {
    if (!user) { toast.error('Please login to add to wishlist'); return; }
    try {
      await API.post('/wishlist', { productId });
      await fetchWishlist();
      toast.success('Added to wishlist!');
    } catch (err) {
      toast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await API.delete(`/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
      toast.success('Removed from wishlist');
    } catch (err) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const isInWishlist = (productId) => wishlist.some((p) => p._id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
