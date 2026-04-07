import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DELIVERY_FEE = 15;
const DISCOUNT_RATE = 0.2;

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const items = cart?.items || [];

  const discount = Math.round(subtotal * DISCOUNT_RATE);
  const total = subtotal - discount + DELIVERY_FEE;

  const handleCheckout = () => {
    if (!user) { toast.error('Please login to checkout'); navigate('/login'); return; }
    toast.success('Order placed successfully! 🎉');
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <FiShoppingBag size={64} color="var(--grey-300)" style={{ margin: '0 auto 20px' }} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="heading-lg" style={{ marginBottom: 32 }}>Your Cart</h1>
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name}
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">Size: {item.size} &nbsp;|&nbsp; Color: {item.color}</div>
                  <div className="cart-item-price">${item.price}</div>
                </div>
                <div className="cart-item-actions">
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item._id)} aria-label="Remove item">
                    <FiTrash2 />
                  </button>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))} aria-label="Decrease quantity">
                      <FiMinus size={14} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)} aria-label="Increase quantity">
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({items.length} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount (20%)</span>
              <span className="summary-discount">-${discount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Grand Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="promo-row">
              <input type="text" className="promo-input" placeholder="Add promo code" aria-label="Promo code" />
              <button className="btn btn-outline btn-sm">Apply</button>
            </div>
            <button
              className="btn btn-primary btn-full checkout-btn"
              onClick={handleCheckout}
              id="checkout-btn"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
