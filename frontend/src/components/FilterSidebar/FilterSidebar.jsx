import StarRating from '../StarRating/StarRating';

const categories = ['Casual', 'Formal', 'Party', 'Gym'];

export default function FilterSidebar({ filters, onChange, onClear }) {
  const { category, minPrice, maxPrice, rating } = filters;

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="filter-clear" onClick={onClear}>Clear All</button>
      </div>

      {/* Category */}
      <div className="filter-group">
        <div className="filter-group-title">Dress Style</div>
        {categories.map((cat) => (
          <label key={cat} className={`filter-option${category === cat ? ' active' : ''}`}>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={category === cat}
              onChange={() => onChange({ category: category === cat ? '' : cat })}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <div className="filter-group-title">Price Range</div>
        <div className="price-range-inputs">
          <input
            type="number"
            className="price-input"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            min={0}
            aria-label="Minimum price"
          />
          <span className="price-separator">—</span>
          <input
            type="number"
            className="price-input"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            min={0}
            aria-label="Maximum price"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="filter-group">
        <div className="filter-group-title">Rating</div>
        {[4, 3, 2, 1].map((r) => (
          <div
            key={r}
            className={`rating-option${rating === String(r) ? ' active' : ''}`}
            onClick={() => onChange({ rating: rating === String(r) ? '' : String(r) })}
            role="button"
            tabIndex={0}
          >
            <StarRating rating={r} size={14} />
            <span style={{ fontSize: '0.8rem', color: 'var(--grey-500)' }}>& Up</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
