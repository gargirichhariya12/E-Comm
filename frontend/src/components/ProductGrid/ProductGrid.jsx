import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductGrid({ title, products = [], viewAllLink = '/products' }) {
  return (
    <section className="product-section">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">{title}</h2>
        <div className="product-grid" data-aos="fade-up" data-aos-delay="100">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="view-all-wrap" data-aos="fade-up">
          <Link to={viewAllLink} className="btn btn-outline">View All</Link>
        </div>
      </div>
    </section>
  );
}
