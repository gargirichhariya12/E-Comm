import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="heading-lg" style={{ marginBottom: 32 }}>My Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="empty-cart">
            <FiHeart size={64} color="var(--grey-300)" style={{ margin: '0 auto 20px' }} />
            <h2>Your wishlist is empty</h2>
            <p>Save items you love for later by clicking the heart icon.</p>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>Browse Products</button>
          </div>
        ) : (
          <div className="product-grid">
            {wishlist.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}
