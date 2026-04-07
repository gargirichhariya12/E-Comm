const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const Product = require('../models/Product');
const Category = require('../models/Category');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shopco';

const categories = [
  {
    name: 'Casual',
    slug: 'casual',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600',
    description: 'Relaxed everyday styles',
  },
  {
    name: 'Formal',
    slug: 'formal',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
    description: 'Professional and sophisticated looks',
  },
  {
    name: 'Party',
    slug: 'party',
    image: 'https://images.unsplash.com/photo-1519657580715-a00e5cceec4b?w=600',
    description: 'Bold styles for every celebration',
  },
  {
    name: 'Gym',
    slug: 'gym',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600',
    description: 'Performance activewear',
  },
];

const products = [
  // New Arrivals
  {
    name: 'T-shirt with Tape Details',
    description: 'A stylish casual t-shirt with unique tape detailing on the sleeves.',
    price: 120,
    category: 'Casual',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    rating: 4.5,
    totalReviews: 53,
    isNewArrival: true,
    isFeatured: true,
    popularity: 90,
  },
  {
    name: 'Skinny Fit Jeans',
    description: 'Classic slim-fit denim jeans with a comfortable stretch fabric.',
    price: 240,
    discountedPrice: 160,
    discountPercent: 20,
    category: 'Casual',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black', 'Grey'],
    rating: 3.5,
    totalReviews: 43,
    isNewArrival: true,
    isOnSale: true,
    popularity: 75,
  },
  {
    name: 'Checkered Shirt',
    description: 'A vibrant checkered casual shirt perfect for weekends.',
    price: 180,
    category: 'Casual',
    images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Blue', 'Green'],
    rating: 4.5,
    totalReviews: 38,
    isNewArrival: true,
    popularity: 80,
  },
  {
    name: 'Sleeve Striped T-shirt',
    description: 'Bold striped sleeves give this t-shirt a sporty look.',
    price: 130,
    discountedPrice: 160,
    discountPercent: 30,
    category: 'Casual',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Orange', 'White', 'Black'],
    rating: 4.5,
    totalReviews: 61,
    isNewArrival: true,
    isOnSale: true,
    popularity: 85,
  },
  // Top Selling
  {
    name: 'Vertical Striped Shirt',
    description: 'A sophisticated formal-casual hybrid with vertical stripes.',
    price: 212,
    discountedPrice: 333,
    discountPercent: 20,
    category: 'Formal',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Green', 'White', 'Beige'],
    rating: 5.0,
    totalReviews: 20,
    isTopSelling: true,
    isFeatured: true,
    popularity: 95,
  },
  {
    name: 'Courage Graphic T-shirt',
    description: 'Make a bold statement with this graphic printed tee.',
    price: 145,
    category: 'Casual',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Orange', 'Black', 'White'],
    rating: 4.0,
    totalReviews: 54,
    isTopSelling: true,
    popularity: 88,
  },
  {
    name: 'Loose Fit Bermuda Shorts',
    description: 'Comfortable loose-fit shorts for casual summer outings.',
    price: 80,
    category: 'Casual',
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Navy', 'Black'],
    rating: 3.0,
    totalReviews: 35,
    isTopSelling: true,
    popularity: 70,
  },
  {
    name: 'Faded Skinny Jeans',
    description: 'Trendy faded finish skinny jeans with a modern cut.',
    price: 210,
    category: 'Casual',
    images: ['https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=500'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Faded Black', 'Dark Blue'],
    rating: 4.5,
    totalReviews: 67,
    isTopSelling: true,
    popularity: 92,
  },
  // Formal
  {
    name: 'Classic Blazer',
    description: 'Timeless single-breasted blazer for professional occasions.',
    price: 350,
    category: 'Formal',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b3a92?w=500'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Charcoal', 'Black'],
    rating: 4.8,
    totalReviews: 29,
    isFeatured: true,
    popularity: 78,
  },
  // Party
  {
    name: 'Sequined Party Top',
    description: 'Dazzling sequined top designed to make heads turn.',
    price: 165,
    category: 'Party',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Gold', 'Silver', 'Black'],
    rating: 4.7,
    totalReviews: 41,
    isFeatured: true,
    popularity: 87,
  },
  // Gym
  {
    name: 'Performance Dry-Fit Tee',
    description: 'Lightweight moisture-wicking tee for intense workouts.',
    price: 95,
    category: 'Gym',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Royal Blue', 'Red'],
    rating: 4.6,
    totalReviews: 82,
    isTopSelling: true,
    popularity: 93,
  },
  {
    name: 'Athletic Jogger Pants',
    description: 'Stretch-fit jogger pants with deep side pockets.',
    price: 115,
    discountedPrice: 140,
    discountPercent: 18,
    category: 'Gym',
    images: ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Navy'],
    rating: 4.3,
    totalReviews: 56,
    isOnSale: true,
    popularity: 76,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany();
    await Category.deleteMany();
    console.log('🗑️  Cleared existing data');

    await Category.insertMany(categories);
    console.log(`✅ Seeded ${categories.length} categories`);

    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);

    console.log('🌱 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seedDB();
