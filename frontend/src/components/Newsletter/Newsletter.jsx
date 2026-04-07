import { useState } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.error('Please enter your email'); return; }
    setLoading(true);
    try {
      await API.post('/newsletter', { email });
      toast.success('🎉 Successfully subscribed!');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box" data-aos="fade-up">
          <h2 className="newsletter-title">Stay Upto Date About Our Latest Offers</h2>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              id="newsletter-email"
              type="email"
              className="newsletter-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="btn btn-white" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
