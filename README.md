# SHOP.CO — Full-Stack MERN E-Commerce Application

> A premium, fully-responsive e-commerce platform built with the MERN stack featuring live search, JWT authentication, admin panel, wishlist, order management, and smooth AOS scroll animations.

---

## 🛍️ Tech Stack

| Layer | Technology |
|---|---|
| Database | MongoDB + Mongoose ODM |
| Backend | Node.js + Express.js |
| Frontend | React.js (Vite) + Context API |
| Styling | Vanilla CSS with CSS Variables |
| Animations | AOS (Animate on Scroll) |
| Authentication | JWT (jsonwebtoken + bcryptjs) |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Icons | react-icons |

---

## ✅ Features Implemented

### Core (Mandatory)
- ✅ Responsive Design — Desktop & Mobile with hamburger menu
- ✅ Homepage — Hero, Stats, Brand Strip, New Arrivals, Top Selling, Dress Style Grid, Testimonials, Newsletter
- ✅ Product Listing — Grid, Filter Sidebar (category/price/rating), Sort options
- ✅ Product Detail — Images, Size/Color/Qty selectors, Add to Cart
- ✅ Shopping Cart — Add/Remove/Update qty, Subtotal/Discount/Delivery/Total
- ✅ REST API — All required endpoints

### Bonus Features
- ✅ Live Product Search (autocomplete dropdown)
- ✅ JWT User Authentication (Register + Login)
- ✅ Role-Based Admin Panel (Add/Edit/Delete products, Manage orders)
- ✅ Order Management (Place orders, view history, admin status updates)
- ✅ Wishlist (Save/remove products, persisted to backend)
- ✅ Pagination (Page-by-page product loading)
- ✅ Toast Notifications (Success/error feedback throughout)

---

## 📋 Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **MongoDB** — Either:
  - Local: Install [MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: Free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/shopco.git
cd shopco
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=mongodb://localhost:27017/shopco
JWT_SECRET=shopco_super_secret_jwt_key_2024
PORT=5000
NODE_ENV=development
```
> **MongoDB Atlas users:** Replace `MONGO_URI` with your Atlas connection string, e.g.
> `mongodb+srv://username:password@cluster.mongodb.net/shopco`

### 3. Seed the Database
```bash
cd backend
node seed/seedData.js
```
This will insert 12 sample products and 4 categories into MongoDB.

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application

Open **two terminals** and run simultaneously:

**Terminal 1 — Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

Open your browser at **http://localhost:3000**

---

## 🔐 Creating an Admin User

After seeding and starting the backend, register a new account via `/register`, then manually update the user role in MongoDB:

**Using MongoDB Shell:**
```js
use shopco
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
```

The Admin Panel will be accessible at `/admin` after login.

---

## 📡 Complete API Endpoints

### Products
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/products` | All products with filter/sort/pagination | Public |
| GET | `/api/products/:id` | Single product | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

**Query Parameters for `GET /api/products`:**
- `category` — Casual, Formal, Party, Gym
- `minPrice` / `maxPrice` — Price range
- `rating` — Minimum rating
- `sort` — `price_asc`, `price_desc`, `popularity`
- `search` — Full-text search
- `page` / `limit` — Pagination (default limit: 12)

### Categories
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/categories` | All dress style categories | Public |

### Cart
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/cart` | Fetch current cart | Session |
| POST | `/api/cart` | Add item to cart | Session |
| PUT | `/api/cart/:id` | Update item quantity | Session |
| DELETE | `/api/cart/:id` | Remove item from cart | Session |

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login + get JWT | Public |
| GET | `/api/auth/profile` | Get user profile | JWT |

### Orders
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/orders` | Place new order | JWT |
| GET | `/api/orders` | Get user's orders | JWT |
| GET | `/api/orders/all` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

### Wishlist
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/wishlist` | Get user's wishlist | JWT |
| POST | `/api/wishlist` | Add to wishlist | JWT |
| DELETE | `/api/wishlist/:id` | Remove from wishlist | JWT |

### Newsletter
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/newsletter` | Subscribe email | Public |

---

## 📁 Project Structure

```
shopco/
├── backend/
│   ├── config/db.js
│   ├── middleware/auth.js, adminMiddleware.js
│   ├── models/ (Product, Category, Cart, User, Order, Subscriber)
│   ├── routes/ (products, categories, cart, auth, orders, wishlist, newsletter)
│   ├── seed/seedData.js
│   ├── server.js
│   └── .env
│
└── frontend/
    └── src/
        ├── api/axios.js
        ├── components/ (Navbar, Footer, ProductCard, HeroSection, BrandsStrip,
        │               ProductGrid, DressStyleGrid, Testimonials, Newsletter,
        │               FilterSidebar, StarRating)
        ├── context/ (AuthContext, CartContext, WishlistContext)
        ├── pages/ (Home, ProductListing, ProductDetail, Cart, Login,
        │          Register, Wishlist, Orders)
        ├── pages/admin/ (AdminDashboard, AdminProducts, AdminOrders)
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

---

## 📸 Screenshots

| View | Screenshot |
|---|---|
| Desktop — Homepage | *(Add screenshot here)* |
| Desktop — Product Listing | *(Add screenshot here)* |
| Desktop — Product Detail | *(Add screenshot here)* |
| Desktop — Shopping Cart | *(Add screenshot here)* |
| Mobile — Homepage | *(Add screenshot here)* |
| Mobile — Hamburger Menu | *(Add screenshot here)* |
| Admin — Dashboard | *(Add screenshot here)* |

---

## 💡 Design Highlights

- **Black & White premium aesthetic** matching reference screenshots
- **Oswald** font for headings, **Inter** for body text
- **AOS scroll animations** — sections fade/slide in as you scroll
- **Animated brand marquee** — infinite scrolling brand strip
- **Rotating star decorations** on hero section
- **Live search autocomplete** in navbar
- **Sticky order summary** on cart page

---

## 🤝 License

MIT License — free to use and modify.
