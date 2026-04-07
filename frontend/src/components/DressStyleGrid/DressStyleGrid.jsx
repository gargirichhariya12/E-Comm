import { useNavigate } from 'react-router-dom';

const styles = [
  {
    name: 'Casual',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&fit=crop',
    slug: 'Casual',
    gridArea: '1 / 1',
  },
  {
    name: 'Formal',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&fit=crop',
    slug: 'Formal',
    gridArea: '1 / 2',
  },
  {
    name: 'Party',
    image: 'https://images.unsplash.com/photo-1519657580715-a00e5cceec4b?w=600&fit=crop',
    slug: 'Party',
    gridArea: '2 / 1',
  },
  {
    name: 'Gym',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&fit=crop',
    slug: 'Gym',
    gridArea: '2 / 2',
  },
];

export default function DressStyleGrid() {
  const navigate = useNavigate();
  return (
    <section className="dress-style-section">
      <div className="container">
        <div className="dress-style-container" data-aos="fade-up">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Browse By Dress Style</h2>
          <div className="dress-style-grid">
            {styles.map((style) => (
              <div
                key={style.name}
                className="style-card"
                onClick={() => navigate(`/products?category=${style.slug}`)}
                role="button"
                tabIndex={0}
                aria-label={`Browse ${style.name} style`}
                data-aos="zoom-in"
              >
                <div className="style-card-label">{style.name}</div>
                <img src={style.image} alt={style.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
