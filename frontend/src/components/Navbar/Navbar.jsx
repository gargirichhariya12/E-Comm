import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiX, FiMenu, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.trim().length < 2) { setSearchResults([]); return; }
      try {
        const { data } = await API.get(`/products?search=${searchQuery}&limit=5`);
        setSearchResults(data.products || []);
        setShowSearch(true);
      } catch { setSearchResults([]); }
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearchSelect = (id) => {
    setSearchQuery('');
    setShowSearch(false);
    navigate(`/product/${id}`);
  };

  return (
    <>
      {showBar && (
        <div className="announcement-bar" style={{ position: 'relative' }}>
          <span>Sign up and get 20% off your first order. <a href="/register">Sign Up Now</a></span>
          <button className="announcement-close" onClick={() => setShowBar(false)} aria-label="Close"><FiX /></button>
        </div>
      )}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
            <Link to="/" className="navbar-logo">SHOP.CO</Link>
            <div className="navbar-links">
              <Link to="/products">Shop</Link>
              <Link to="/products?sale=true">On Sale</Link>
              <Link to="/products?new=true">New Arrivals</Link>
              <Link to="/products">Brands</Link>
            </div>
            <div className="navbar-search" ref={searchRef}>
              <FiSearch size={16} />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearch(true)}
                aria-label="Search products"
              />
              {showSearch && searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((p) => (
                    <div key={p._id} className="search-dropdown-item" onClick={() => handleSearchSelect(p._id)}>
                      <img src={p.images?.[0]} alt={p.name} onError={(e) => e.target.src = 'https://via.placeholder.com/40'} />
                      <span>{p.name}</span>
                      <span style={{ marginLeft: 'auto', fontWeight: 700 }}>${p.discountedPrice || p.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="navbar-actions">
              <Link to="/cart" className="navbar-icon-btn" aria-label="Cart">
                <FiShoppingCart size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              {user ? (
                <>
                  <Link to="/wishlist" className="navbar-icon-btn" aria-label="Wishlist"><FiHeart size={20} /></Link>
                  {isAdmin && <Link to="/admin" className="btn btn-primary btn-sm">Admin</Link>}
                  <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
                </>
              ) : (
                <Link to="/login" className="navbar-icon-btn" aria-label="Account"><FiUser size={20} /></Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="navbar-logo">SHOP.CO</span>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><FiX size={24} /></button>
        </div>
        <div className="navbar-search" style={{ marginBottom: 24 }}>
          <FiSearch size={16} />
          <input type="text" placeholder="Search products..." />
        </div>
        <nav className="mobile-menu-links">
          <Link to="/products" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link to="/products?sale=true" onClick={() => setMobileOpen(false)}>On Sale</Link>
          <Link to="/products?new=true" onClick={() => setMobileOpen(false)}>New Arrivals</Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)}>Cart ({cartCount})</Link>
          {user ? (
            <>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist</Link>
              <Link to="/orders" onClick={() => setMobileOpen(false)}>My Orders</Link>
              {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)}>Admin Panel</Link>}
              <a onClick={() => { logout(); setMobileOpen(false); }} style={{ cursor: 'pointer' }}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
