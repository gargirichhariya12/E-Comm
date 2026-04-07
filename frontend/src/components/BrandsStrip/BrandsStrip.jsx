const brands = ['Versace', 'Zara', 'Gucci', 'Prada', 'Calvin Klein'];

export default function BrandsStrip() {
  // Duplicate for seamless loop
  const doubled = [...brands, ...brands];
  return (
    <div className="brands-strip" aria-label="Featured brands">
      <div className="brands-track">
        {doubled.map((brand, i) => (
          <span key={i} className="brand-name">{brand}</span>
        ))}
      </div>
    </div>
  );
}
