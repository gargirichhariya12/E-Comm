import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const reviews = [
  {
    id: 1, name: 'Sarah M.', rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has become a wardrobe staple.",
  },
  {
    id: 2, name: 'Alex K.', rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.",
  },
  {
    id: 3, name: 'James L.', rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4, name: 'Moana R.', rating: 4,
    text: "I was a bit skeptical about ordering clothes online, but Shop.co has completely changed my mind. The fabrics are top-notch and the sizing is spot on.",
  },
  {
    id: 5, name: 'David P.', rating: 5,
    text: "What sets Shop.co apart is their attention to detail. The stitching, the fabric choice, everything screams quality. I won't shop anywhere else now!",
  },
  {
    id: 6, name: 'Priya S.', rating: 5,
    text: "Absolutely love every purchase! The delivery was quick, packaging was neat and the clothes look exactly like the photos. Will definitely order again!",
  },
];

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const visible = 3;

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(reviews.length - visible, s + 1));

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header" data-aos="fade-up">
          <h2 className="heading-lg">Our Happy Customers</h2>
          <div className="testimonials-nav">
            <button className="nav-btn" onClick={prev} aria-label="Previous reviews"><FiChevronLeft /></button>
            <button className="nav-btn" onClick={next} aria-label="Next reviews"><FiChevronRight /></button>
          </div>
        </div>
        <div className="testimonials-grid" data-aos="fade-up" data-aos-delay="100">
          {reviews.slice(start, start + visible).map((r) => (
            <div key={r.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(r.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <div className="testimonial-name">
                {r.name}
                <FiCheckCircle className="verified-icon" title="Verified Buyer" />
              </div>
              <p className="testimonial-text">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
