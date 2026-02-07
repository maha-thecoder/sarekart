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
  : 'https://sare-kart-backend-production.up.railway.app';
const res = await axios.get(`${API_BASE_URL}/api/v1/sarekart/user-order-details`, {
          withCredentials: true
        });
        // backend returns array of orders from Order schema
        const data = Array.isArray(res.data) ? res.data : (res.data?.data || [])
        if (mounted) setOrders(data || [])
      } catch (err) {
        console.error('Order fetch error:', err.message)
        if (mounted) {
          setError('Could not load orders from server.')
          setOrders([])
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
                <div className="order-card" key={o._id}>
                  <div className="order-accent" />
                  <div className="order-main">
                    {/* Order Header */}
                    <div className="order-header-info">
                      <div>
                        <div className="order-id">#{o._id?.toString().slice(-8) || '—'}</div>
                        <div className="order-date">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      </div>
                      <div className={`status-badge status-${o.status}`}>{o.status.toUpperCase()}</div>
                    </div>

                    {/* Product Images + Details */}
                    <div className="order-products">
                      {o.cart && o.cart.slice(0, 3).map((it, i) => (
                        <div className="product-thumbnail" key={i}>
                          {it.sareimg ? (
                            <img src={it.sareimg} alt={it.sarename} className="product-img" />
                          ) : (
                            <div className="product-img-placeholder">📦</div>
                          )}
                          <div className="product-overlay">
                            <span className="qty-badge">x{it.qty}</span>
                          </div>
                        </div>
                      ))}
                      {o.cart && o.cart.length > 3 && (
                        <div className="product-thumbnail more-items">
                          <div className="more-count">+{o.cart.length - 3}</div>
                        </div>
                      )}
                    </div>

                    {/* Order Items List */}
                    <div className="order-items">
                      <div className="items-label">Items ({o.cart?.length || 0})</div>
                      {o.cart && o.cart.map((it, i) => (
                        <div className="order-item" key={i}>
                          <div className="item-info">
                            <div className="item-name">{it.sarename}</div>
                            <div className="item-meta">Qty: {it.qty}</div>
                          </div>
                          <div className="item-price">₹{it.sareprice}</div>
                        </div>
                      ))}
                     
                    </div>

                    {/* Order Footer */}
                    <div className="order-footer">
                      <div className="order-total">
                        <span className="total-label">Total</span>
                        <span className="total-amount">₹{o.total}</span>
                      </div>
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
