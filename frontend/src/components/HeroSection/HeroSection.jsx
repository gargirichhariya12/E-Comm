import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content" data-aos="fade-right">
            <h1 className="hero-title">Find Clothes That Matches Your Style</h1>
            <p className="hero-description">
              Browse through our diverse range of meticulously crafted garments, designed
              to bring out your individuality and cater to your sense of style.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>
              Shop Now
            </button>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-value">200+</div>
                <div className="hero-stat-label">International Brands</div>
              </div>
              <div style={{ width: 1, background: 'var(--grey-300)' }} />
              <div>
                <div className="hero-stat-value">2,000+</div>
                <div className="hero-stat-label">High-Quality Products</div>
              </div>
              <div style={{ width: 1, background: 'var(--grey-300)' }} />
              <div>
                <div className="hero-stat-value">30,000+</div>
                <div className="hero-stat-label">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="hero-image-wrap" data-aos="fade-left">
            <span className="hero-star hero-star-lg" aria-hidden="true">✦</span>
            <span className="hero-star hero-star-sm" aria-hidden="true">✦</span>
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&h=700&fit=crop&crop=top"
              alt="Stylish models showcasing SHOP.CO fashion"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
