import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
  name: '', description: '', price: '', discountedPrice: '', discountPercent: '',
  category: 'Casual', images: '', sizes: '', colors: '',
  rating: '', totalReviews: '', stock: 10,
  isNewArrival: false, isTopSelling: false, isOnSale: false, isFeatured: false,
};

export default function AdminProducts() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) { navigate('/'); return; }
    fetchProducts();
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products?limit=100');
      setProducts(data.products || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setShowModal(true); };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      ...p,
      images: p.images?.join(', ') || '',
      sizes: p.sizes?.join(', ') || '',
      colors: p.colors?.join(', ') || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch { toast.error('Failed to delete'); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discountedPrice: form.discountedPrice ? Number(form.discountedPrice) : null,
        discountPercent: Number(form.discountPercent) || 0,
        rating: Number(form.rating) || 0,
        totalReviews: Number(form.totalReviews) || 0,
        stock: Number(form.stock) || 10,
        images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
        sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(',').map((s) => s.trim()).filter(Boolean),
      };
      if (editing) {
        await API.put(`/products/${editing}`, payload);
        toast.success('Product updated!');
      } else {
        await API.post('/products', payload);
        toast.success('Product created!');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const f = (field) => ({
    value: form[field],
    onChange: (e) => setForm((prev) => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })),
  });

  if (loading) return <div className="spinner-container"><div className="spinner" /></div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="admin-title">Products</h1>
            <p style={{ color: 'var(--grey-500)', marginTop: 4 }}>{products.length} total products</p>
          </div>
          <button className="btn btn-primary" onClick={openAdd} id="add-product-btn">+ Add Product</button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img src={p.images?.[0]} alt={p.name}
                      style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, background: 'var(--grey-100)' }}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/48'} />
                  </td>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.discountedPrice || p.price}</td>
                  <td>{p.stock}</td>
                  <td>⭐ {p.rating?.toFixed(1)}</td>
                  <td>
                    <button className="action-btn" onClick={() => openEdit(p)}>Edit</button>
                    <button className="action-btn danger" onClick={() => handleDelete(p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{editing ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input className="form-input" {...f('name')} required placeholder="Product name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" {...f('category')}>
                    {['Casual', 'Formal', 'Party', 'Gym'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price *</label>
                  <input className="form-input" type="number" {...f('price')} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Discounted Price</label>
                  <input className="form-input" type="number" {...f('discountedPrice')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Discount %</label>
                  <input className="form-input" type="number" {...f('discountPercent')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input className="form-input" type="number" {...f('stock')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Rating (0-5)</label>
                  <input className="form-input" type="number" step="0.1" max="5" {...f('rating')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Reviews</label>
                  <input className="form-input" type="number" {...f('totalReviews')} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-input" {...f('description')} rows={3} required style={{ resize: 'vertical' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Image URLs (comma-separated)</label>
                <input className="form-input" {...f('images')} placeholder="https://..., https://..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Sizes (comma-separated)</label>
                  <input className="form-input" {...f('sizes')} placeholder="S, M, L, XL" />
                </div>
                <div className="form-group">
                  <label className="form-label">Colors (comma-separated)</label>
                  <input className="form-input" {...f('colors')} placeholder="Black, White, Red" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
                {[['isNewArrival', 'New Arrival'], ['isTopSelling', 'Top Selling'], ['isOnSale', 'On Sale'], ['isFeatured', 'Featured']].map(([key, label]) => (
                  <label key={key} style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: '0.875rem' }}>
                    <input type="checkbox" checked={!!form[key]} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.checked }))} />
                    {label}
                  </label>
                ))}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving} id="save-product-btn">
                  {saving ? 'Saving...' : (editing ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
