import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    API.get('/orders').then(({ data }) => setOrders(data)).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const statusClass = { Pending: 'status-pending', Processing: 'status-processing', Delivered: 'status-delivered', Cancelled: 'status-cancelled' };

  if (loading) return <div className="spinner-container"><div className="spinner" /></div>;

  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="heading-lg" style={{ marginBottom: 32 }}>My Orders</h1>
        {orders.length === 0 ? (
          <div className="empty-cart">
            <h2>No orders yet</h2>
            <p>Place your first order to see it here.</p>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>Shop Now</button>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>#{order._id.slice(-8).toUpperCase()}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.items?.length} item(s)</td>
                    <td>${order.totalAmount?.toFixed(2)}</td>
                    <td><span className={`status-badge ${statusClass[order.status] || 'status-pending'}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
