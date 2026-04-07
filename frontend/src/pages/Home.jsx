import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import BrandsStrip from '../components/BrandsStrip/BrandsStrip';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import DressStyleGrid from '../components/DressStyleGrid/DressStyleGrid';
import Testimonials from '../components/Testimonials/Testimonials';
import Newsletter from '../components/Newsletter/Newsletter';
import API from '../api/axios';

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [na, ts] = await Promise.all([
          API.get('/products?new=true&limit=4'),
          API.get('/products?sort=popularity&limit=4'),
        ]);
        setNewArrivals(na.data.products || []);
        setTopSelling(ts.data.products || []);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main>
      <HeroSection />
      <BrandsStrip />
      <ProductGrid title="New Arrivals" products={newArrivals} viewAllLink="/products?new=true" />
      <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '0 24px' }} />
      <ProductGrid title="Top Selling" products={topSelling} viewAllLink="/products?sort=popularity" />
      <DressStyleGrid />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
