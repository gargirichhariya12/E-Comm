import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin) { navigate('/'); return; }
    API.get('/orders/all')
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, isAdmin]);

  const handleStatusChange = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status } : o));
      toast.success('Order status updated!');
    } catch { toast.error('Failed to update status'); }
  };

  const statusClass = {
    Pending: 'status-pending', Processing: 'status-processing',
    Shipped: 'status-processing', Delivered: 'status-delivered', Cancelled: 'status-cancelled',
  };

  if (loading) return <div className="spinner-container"><div className="spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">All Orders</h1>
          <p style={{ color: 'var(--grey-500)', marginTop: 4 }}>{orders.length} total orders</p>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Email</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>#{o._id.slice(-8).toUpperCase()}</td>
                  <td style={{ fontWeight: 600 }}>{o.user?.name || 'Guest'}</td>
                  <td style={{ color: 'var(--grey-500)', fontSize: '0.85rem' }}>{o.user?.email}</td>
                  <td>{o.items?.length}</td>
                  <td style={{ fontWeight: 700 }}>${o.totalAmount?.toFixed(2)}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      className="sort-select"
                      value={o.status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                      aria-label={`Update status for order ${o._id}`}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--grey-400)', padding: 40 }}>No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
