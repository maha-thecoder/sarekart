import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './OrderPage.css'

export default function OrderPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchOrders = async () => {
      try {
         const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : 'https://sare-kart-backend-production.up.railway.app/';
const res = await axios.get(`${API_BASE_URL}/api/v1/sarekart/user-order-details`);
        // backend may return array or { orders: [...] }
        const data = res.data && (Array.isArray(res.data) ? res.data : res.data.orders || res.data)
        if (mounted) setOrders(data || [])
      } catch (err) {
        console.error('Order fetch error:', err)
        if (mounted) {
          setError('Could not load orders from server — showing sample data.')
          setOrders([
            {
              id: 'SAMPLE-1',
              createdAt: new Date().toISOString(),
              total: 1299,
              items: [
                { name: 'Sample Saree - Premium', qty: 1, price: 1299 }
              ]
            }
          ])
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchOrders()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="order-page-root">
      <div className="order-header">
        <div>
          <h1 className="greeting">hi mahanth</h1>
          <p className="sub">Your Orders</p>
        </div>
      </div>

      <div className="order-content">
        {loading ? (
          <div className="loader">Loading orders…</div>
        ) : (
          <>
            {error && <div className="notice">{error}</div>}

            <div className="orders-grid">
              {orders.length === 0 && <div className="empty">You have no orders yet.</div>}

              {orders.map((o) => (
                <div className="order-card" key={o.id || o._id || Math.random()}>
                  <div className="order-accent" />
                  <div className="order-main">
                    <div className="order-row">
                      <div className="order-id">Order #{o.id || o._id || '—'}</div>
                      <div className="order-date">{new Date(o.createdAt || o.date || Date.now()).toLocaleDateString()}</div>
                    </div>
                    <div className="order-items">
                      {o.items && o.items.map((it, i) => (
                        <div className="order-item" key={i}>
                          <div className="item-name">{it.name}</div>
                          <div className="item-meta">x{it.qty} • ₹{it.price}</div>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <div className="order-total">Total: ₹{o.total}</div>
                      <button className="order-btn">View details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
