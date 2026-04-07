import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import StarRating from '../StarRating/StarRating';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    inWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)} role="button" tabIndex={0}>
      <div className="product-card-image">
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400`; }}
        />
        <button
          className={`product-card-wishlist${inWishlist ? ' active' : ''}`}
          onClick={handleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? <FaHeart color="#ff3333" /> : <FiHeart />}
        </button>
      </div>
      <div className="product-card-name">{product.name}</div>
      <div className="product-card-rating">
        <StarRating rating={product.rating} size={13} />
        <span className="rating-text">{product.rating?.toFixed(1)}/5</span>
      </div>
      <div className="product-card-price">
        <span className="price-current">${product.discountedPrice || product.price}</span>
        {product.discountedPrice && (
          <>
            <span className="price-original">${product.price}</span>
            <span className="price-badge">-{product.discountPercent}%</span>
          </>
        )}
      </div>
    </div>
  );
}
