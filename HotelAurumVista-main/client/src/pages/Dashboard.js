import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import '../styles/style.css';
import JsBarcode from 'jsbarcode';

function Dashboard() {
  const [data, setData] = useState({
    user: { points: 0 },
    activeBookings: [],
    bookingHistory: [],
    rewards: [],
    userCoupons: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/dashboard', { withCredentials: true })
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        setError('Hiba történt az adatok betöltésekor');
        console.error(err);
      });
  }, []);

  const redeemReward = async (rewardId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/rewards/redeem', { rewardId }, { withCredentials: true });
      alert(response.data.message);
      setData(prev => ({
        ...prev,
        user: { ...prev.user, points: response.data.newPoints }
      }));
    } catch (err) {
      alert(err.response?.data?.error || 'Hiba történt');
    }
  };

  const toggleBarcode = (code, button) => {
    const container = button.nextElementSibling;
    if (container.style.display === 'none') {
      container.style.display = 'block';
      button.textContent = 'Kuponkód elrejtése';
      JsBarcode(`#barcode-${code}`, code, {
        format: 'CODE128',
        width: 2,
        height: 50,
        displayValue: false,
        background: 'transparent',
        lineColor: '#FFD700'
      });
    } else {
      container.style.display = 'none';
      button.textContent = 'Kuponkód megjelenítése';
    }
  };

  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container pt-5" style={{ marginTop: '100px' }}>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card bg-dark" style={{ maxHeight: '166px' }}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <img src="/images/profile-placeholder.jpg" className="rounded-circle" width="60" height="60" alt="Profilkép" />
                <div className="ms-3">
                  <h5 className="mb-0" style={{ color: 'var(--gold)' }}>{data.user.name}</h5>
                  <small style={{ color: 'white' }}>Tagság: {data.user.membershipLevel || 'Alap'}</small>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--gold)' }}>Pontok:</span>
                <span style={{ color: 'white' }}>{data.user.points}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ color: 'var(--gold)' }}>Foglalások:</span>
                <span style={{ color: 'white' }}>{data.user.totalBookings || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 mb-4">
          <div className="card bg-dark" style={{ maxHeight: '166px', minHeight: '164px' }}>
            <div className="card-body">
              <h5 className="card-title mb-4" style={{ color: 'var(--gold)' }}>Aktív foglalások</h5>
              {data.activeBookings.length > 0 ? (
                data.activeBookings.map(booking => (
                  <div className="booking-item mb-3 p-3 border rounded" key={booking.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 style={{ color: 'white' }}>{booking.roomName}</h6>
                        <p className="mb-1" style={{ color: 'var(--gold)' }}>{booking.checkIn} - {booking.checkOut}</p>
                      </div>
                      <button className="btn btn-outline-gold btn-sm">Részletek</button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--gold)' }}>Nincs aktív foglalásod.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title mb-4" style={{ color: 'var(--gold)' }}>Pontbolt</h5>
              <div className="row g-3">
                {data.rewards.length > 0 ? (
                  data.rewards.map(reward => (
                    <div className="col-md-6" key={reward.id}>
                      <div className="reward-item p-3 border rounded">
                        <h6 style={{ color: 'white' }}>{reward.name}</h6>
                        <p className="mb-2" style={{ color: 'var(--gold)' }}>{reward.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span style={{ color: 'white' }}>{reward.points} pont</span>
                          <button
                            onClick={() => redeemReward(reward.id)}
                            className="btn btn-outline-gold btn-sm"
                            disabled={data.user.points < reward.points}
                          >
                            Beváltás
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p style={{ color: 'var(--gold)' }}>Nincsenek elérhető jutalmak.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title mb-4" style={{ color: 'var(--gold)' }}>Aktív Kuponjaim</h5>
              {data.userCoupons.length > 0 ? (
                <div className="row g-3">
                  {data.userCoupons.map(coupon => (
                    <div className="col-12" key={coupon.coupon_code}>
                      <div className="coupon-item p-3 border rounded">
                        <h6 style={{ color: 'white' }}>{coupon.name}</h6>
                        <p className="mb-2" style={{ color: 'var(--gold)' }}>{coupon.description}</p>
                        <small style={{ color: 'white' }}>
                          Létrehozva: {new Date(coupon.created_at).toLocaleDateString('hu-HU')}
                        </small>
                        <div className="mt-2">
                          <button
                            className="btn btn-outline-gold btn-sm"
                            onClick={(e) => toggleBarcode(coupon.coupon_code, e.target)}
                          >
                            Kuponkód megjelenítése
                          </button>
                          <div className="barcode-container mt-2" style={{ display: 'none' }}>
                            <div className="text-center">
                              <div className="barcode" id={`barcode-${coupon.coupon_code}`}></div>
                              <small style={{ color: 'white' }} className="mt-1 d-block">{coupon.coupon_code}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--gold)' }}>Még nincs aktív kuponod.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title mb-4" style={{ color: 'var(--gold)' }}>Foglalási előzmények</h5>
              {data.bookingHistory.length > 0 ? (
                data.bookingHistory.map((booking, index) => (
                  <div className="booking-history-item mb-3 p-3 border rounded" key={index}>
                    <h6 style={{ color: 'white' }}>{booking.roomName}</h6>
                    <p style={{ color: 'var(--gold)' }}>{booking.dates}</p>
                    <small style={{ color: 'white' }}>Pontok: +{booking.pointsEarned}</small>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--gold)' }}>Nincs korábbi foglalásod.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;