import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin) { navigate('/'); return; }
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          API.get('/products?limit=1'),
          API.get('/orders/all'),
        ]);
        const orders = ordersRes.data || [];
        const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        setStats({
          products: productsRes.data.total || 0,
          orders: orders.length,
          revenue: revenue.toFixed(2),
        });
        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, isAdmin]);

  const statCards = [
    { label: 'Total Products', value: stats.products },
    { label: 'Total Orders', value: stats.orders },
    { label: 'Total Revenue', value: `$${stats.revenue}` },
  ];

  const statusClass = {
    Pending: 'status-pending', Processing: 'status-processing',
    Delivered: 'status-delivered', Cancelled: 'status-cancelled',
  };

  if (loading) return <div className="spinner-container"><div className="spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p style={{ color: 'var(--grey-500)', marginTop: 4 }}>Welcome back, {user?.name}</p>
        </div>
        <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          {statCards.map((s) => (
            <div key={s.label} className="admin-stat-card">
              <div className="admin-stat-label">{s.label}</div>
              <div className="admin-stat-value">{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          <button className="btn btn-primary" onClick={() => navigate('/admin/products')}>Manage Products</button>
          <button className="btn btn-outline" onClick={() => navigate('/admin/orders')}>Manage Orders</button>
        </div>
        <h2 className="heading-md" style={{ marginBottom: 20 }}>Recent Orders</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o._id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>#{o._id.slice(-8).toUpperCase()}</td>
                  <td>{o.user?.name || 'Guest'}</td>
                  <td>${o.totalAmount?.toFixed(2)}</td>
                  <td><span className={`status-badge ${statusClass[o.status] || 'status-pending'}`}>{o.status}</span></td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--grey-400)', padding: 32 }}>No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
