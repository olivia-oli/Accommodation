import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import "./Reservation.css";

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { checkInDate, checkOutDate, guestCount, host } = location.state || {};

  const [checkIn, setCheckIn] = useState(
    checkInDate ? new Date(checkInDate).toISOString().split("T")[0] : "",
  );

  const [checkOut, setCheckOut] = useState(
    checkOutDate ? new Date(checkOutDate).toISOString().split("T")[0] : "",
  );

  const [guests, setGuests] = useState(guestCount || 1);

  const pricePerNight = 1042;
  const cleaningFee = 350;
  const serviceFee = 421;
  const taxes = 130;

  const calculateNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference = end - start;

    const nights = difference / (1000 * 60 * 60 * 24);

    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();

  const accommodationTotal = nights * pricePerNight;

  const total = accommodationTotal + cleaningFee + serviceFee + taxes;

  const handleReservation = () => {
    const booking = {
      id: Date.now(),
      checkIn,
      checkOut,
      guests,
      total,
      host: host || "Olivia",
    };

    localStorage.setItem("airbnbBooking", JSON.stringify(booking));

    const bookings = JSON.parse(localStorage.getItem("airbnbBookings") || "[]");
    localStorage.setItem(
      "airbnbBookings",
      JSON.stringify([...bookings, booking]),
    );

    navigate("/bookings");
  };

  return (
    <div className="reservation-page">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="reservation-container">
        <div className="reservation-form">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <h1>Make a Reservation</h1>

          <div className="reservation-property">
            <h2>DuchessT Comfort Back-up Power, Wi-Fi & Netflix</h2>

            <p>📍 Rosebank</p>

            <p>
              <strong>R1,042</strong> / night
            </p>
          </div>

          <div className="form-section">
            <h2>Your trip</h2>

            <div className="date-fields">
              <div className="form-group">
                <label>Check-in</label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Check-out</label>

                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(event) => setCheckOut(event.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Guests</label>

              <select
                value={guests}
                onChange={(event) => setGuests(Number(event.target.value))}
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
                <option value={3}>3 guests</option>
              </select>
            </div>
          </div>

          <div className="price-section">
            <h2>Price details</h2>

            <div className="price-row">
              <span>R1,042 × {nights} nights</span>

              <span>R{accommodationTotal.toLocaleString()}</span>
            </div>

            <div className="price-row">
              <span>Cleaning fee</span>
              <span>R350</span>
            </div>

            <div className="price-row">
              <span>Service fee</span>
              <span>R421</span>
            </div>

            <div className="price-row">
              <span>Occupancy taxes</span>
              <span>R130</span>
            </div>

            <hr />

            <div className="total-row">
              <strong>Total</strong>
              <strong>R{total.toLocaleString()}</strong>
            </div>
          </div>

          <div className="reservation-buttons">
            <button className="cancel-button" onClick={() => navigate(-1)}>
              Cancel
            </button>

            <button className="reserve-button" onClick={handleReservation}>
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
