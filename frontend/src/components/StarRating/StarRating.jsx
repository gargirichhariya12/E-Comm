import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function StarRating({ rating = 0, size = 14 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} size={size} color="#FFC633" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} size={size} color="#FFC633" />);
    } else {
      stars.push(<FaRegStar key={i} size={size} color="#D4D4D4" />);
    }
  }
  return <div style={{ display: 'flex', gap: 2 }}>{stars}</div>;
}
