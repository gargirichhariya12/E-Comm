import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import API from '../api/axios';

const SORT_OPTIONS = [
  { value: '', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Most Popular' },
];

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    rating: '',
  });
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        if (filters.minPrice) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        if (filters.rating) params.set('rating', filters.rating);
        if (sort) params.set('sort', sort);
        params.set('page', page);
        params.set('limit', 9);

        const { data } = await API.get(`/products?${params.toString()}`);
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters, sort, page]);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ category: '', minPrice: '', maxPrice: '', rating: '' });
    setSort('');
    setPage(1);
  };

  return (
    <div className="listing-page">
      <div className="container">
        <div className="listing-header">
          <h1 className="listing-title">All Products</h1>
          <div className="listing-meta">
            <span className="results-count">Showing {products.length} of {total} results</span>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="listing-layout">
          <FilterSidebar filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
          <div>
            {loading ? (
              <div className="spinner-container"><div className="spinner" /></div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px', color: 'var(--grey-500)' }}>
                <p style={{ fontSize: '1.1rem' }}>No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="listing-grid">
                {products.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
            {totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-btn${page === i + 1 ? ' active' : ''}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
