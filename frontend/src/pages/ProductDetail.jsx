import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import StarRating from '../components/StarRating/StarRating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import API from '../api/axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const { addToCart, loading: cartLoading } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || '');
        setSelectedColor(data.colors?.[0] || '');
      } catch {
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div className="spinner-container"><div className="spinner" /></div>;
  if (!product) return null;

  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product._id, selectedSize, selectedColor, qty);
  };

  const colorMap = {
    Black: '#000', White: '#fff', Grey: '#888', Blue: '#2563eb',
    Red: '#dc2626', Green: '#16a34a', Navy: '#1e3a5f', Orange: '#ea580c',
    Gold: '#d97706', Silver: '#9ca3af', Khaki: '#a16207', 'Royal Blue': '#1d4ed8',
    Beige: '#d4b896', Charcoal: '#374151', 'Dark Blue': '#1e40af',
    'Faded Black': '#404040', 'Faded Grey': '#9ca3af',
  };

  return (
    <div className="detail-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span className="breadcrumb-sep">›</span>
          <a href="/products">Products</a><span className="breadcrumb-sep">›</span>
          <span>{product.name}</span>
        </nav>
        <div className="detail-layout">
          {/* Images */}
          <div className="detail-images" data-aos="fade-right">
            <div className="detail-main-image">
              <img src={product.images?.[selectedImg]} alt={product.name}
                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'} />
            </div>
            {product.images?.length > 1 && (
              <div className="detail-thumbs">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={`detail-thumb${selectedImg === i ? ' active' : ''}`}
                    onClick={() => setSelectedImg(i)}
                    role="button"
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div data-aos="fade-left">
            <div className="detail-category">{product.category}</div>
            <h1 className="detail-name">{product.name}</h1>
            <div className="detail-rating">
              <StarRating rating={product.rating} size={18} />
              <span style={{ fontWeight: 600 }}>{product.rating?.toFixed(1)}/5</span>
              <span className="detail-review-count">({product.totalReviews} Reviews)</span>
            </div>
            <div className="detail-price">
              <span className="detail-price-main">${product.discountedPrice || product.price}</span>
              {product.discountedPrice && (
                <>
                  <span className="price-original" style={{ fontSize: '1.3rem' }}>${product.price}</span>
                  <span className="price-badge">-{product.discountPercent}%</span>
                </>
              )}
            </div>
            <p className="detail-desc">{product.description}</p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="detail-options">
                <div className="detail-options-label">Select Color</div>
                <div className="color-options">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`color-btn${selectedColor === c ? ' active' : ''}`}
                      style={{ backgroundColor: colorMap[c] || c, border: selectedColor === c ? '3px solid #000' : '3px solid #e5e5e5' }}
                      onClick={() => setSelectedColor(c)}
                      title={c}
                      aria-label={`Select ${c} color`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="detail-options">
                <div className="detail-options-label">Choose Size</div>
                <div className="size-options">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`size-btn${selectedSize === s ? ' active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                      aria-label={`Size ${s}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to Cart */}
            <div className="qty-add-row" style={{ marginTop: 24 }}>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><FiMinus /></button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty((q) => q + 1)} aria-label="Increase"><FiPlus /></button>
              </div>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
                disabled={cartLoading}
                id="add-to-cart-btn"
              >
                {cartLoading ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                className="navbar-icon-btn"
                onClick={() => inWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id)}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                style={{ fontSize: '1.4rem', padding: 10, border: '1px solid var(--grey-300)', borderRadius: '50%' }}
              >
                {inWishlist ? <FaHeart color="#ff3333" /> : <FiHeart />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
