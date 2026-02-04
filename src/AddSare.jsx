import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';

export default function AddSare() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ sarename: '', sareimg: '', sareprice: '', wrongprice: '', qty: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.sarename || !form.sareimg || form.sareprice === '') {
      setError('sarename, sareimg and sareprice are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:4000'
        : 'https://sare-kart-backend.onrender.com';

      const payload = {
        sarename: form.sarename,
        sareimg: form.sareimg,
        sareprice: Number(form.sareprice),
        wrongprice: Number(form.wrongprice) || 0,
        qty: Number(form.qty) || 1
      };

      const res = await axios.post(`${API_BASE_URL}/api/v1/sarekart/saredetails`, payload);
      if (res.status === 201) {
        alert('Sare added successfully');
        navigate('/admin-orders');
      } else {
        setError('Failed to add sare');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error adding sare');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-container container mt-4">
      <h2 className="admin-title">Add Saree</h2>
      <div className="add-sare-form">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input name="sarename" placeholder="Sare Name" className="form-control" value={form.sarename} onChange={handleChange} />
            <input name="sareimg" placeholder="Image URL" className="form-control" value={form.sareimg} onChange={handleChange} />
          </div>

          <div className="form-row">
            <input name="sareprice" placeholder="Price" className="form-control" value={form.sareprice} onChange={handleChange} />
            <input name="wrongprice" placeholder="Wrong Price" className="form-control" value={form.wrongprice} onChange={handleChange} />
          </div>

          <div className="form-row">
            <input name="qty" placeholder="Quantity" className="form-control" value={form.qty} onChange={handleChange} />
          </div>

          <div className="submit-row">
            <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin-orders')}>Cancel</button>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Sare'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}