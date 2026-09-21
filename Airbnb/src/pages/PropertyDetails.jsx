import { Link,useLocation, useNavigate } from "react-router-dom";
import { FiHeart, FiStar, FiKey } from "react-icons/fi";
import logo from "../assets/logo.png";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { checkInDate, checkOutDate, guestCount } = location.state || {};

  const handleBookNow = () => {
    navigate("/reservation", {
      state: {
        checkInDate,
        checkOutDate,
        guestCount,
      },
    });
  };

  return (
    <div className="property-page">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="property-header">
        <div>
          <h1>DuchessT Comfort Back-up Power, Wi-Fi & Netflix</h1>
          <p>★ 0.0 · 0 reviews · Rosebank</p>
        </div>

        <button className="property-heart">
          <FiHeart />
        </button>
      </div>

      <div className="property-gallery">
        <img
          src="https://airbnb-backend-4qvg.onrender.com/uploads/1742410129037.jpeg"
          alt="DuchessT property"
          className="gallery-main"
        />

        <div className="gallery-small">
          <img
            src="https://airbnb-backend-4qvg.onrender.com/uploads/1742410129038.jpg"
            alt="Property interior"
          />

          <img
            src="https://airbnb-backend-4qvg.onrender.com/uploads/1742410562665.avif"
            alt="Property room"
          />

          <img
            src="https://airbnb-backend-4qvg.onrender.com/uploads/1742410576934.avif"
            alt="Property bedroom"
          />

          <img
            src="https://airbnb-backend-4qvg.onrender.com/uploads/1742410638151.avif"
            alt="Property bathroom"
          />
        </div>
      </div>

      <div className="property-content">
        <main className="property-main">
          <h2>Hotel hosted by Olivia</h2>

          <p className="property-capacity">
            3 guests · 2 bedrooms · 1 bathroom
          </p>

          <div className="self-checkin">
            <FiKey />
            <div>
              <strong>Self check-in</strong>
              <p>Check yourself in with the lockbox.</p>
            </div>
          </div>

          <hr />

          <section>
            <h2>About this place</h2>

            <p>
              Experience comfort and convenience at DuchessT Comfort. Enjoy
              reliable back-up power, Wi-Fi and Netflix during your stay. The
              property is located in Rosebank and provides a comfortable space
              for guests.
            </p>
          </section>

          <hr />

          <section>
            <h2>What this place offers</h2>

            <div className="amenities">
              <span>📶 Wi-Fi</span>
              <span>🍳 Kitchen</span>
              <span>🧺 Washer</span>
              <span>👕 Dryer</span>
              <span>❄️ Air conditioning</span>
              <span>🔥 Heating</span>
              <span>🏊 Pool</span>
              <span>📺 TV</span>
              <span>🚗 Parking</span>
            </div>
          </section>

          <hr />

          <section>
            <h2>Reviews</h2>

            <div className="review-score">
              <FiStar />
              <strong>0.0</strong>
              <span> · 0 reviews</span>
            </div>
          </section>
        </main>

        <aside className="booking-card">
          <div className="booking-price">
            <strong>R1,042</strong> / night
          </div>

          <p>★ 0.0 · 0 reviews</p>

          <div className="selected-booking-info">
            <p>
              <strong>Check-in:</strong>{" "}
              {checkInDate
                ? new Date(checkInDate).toLocaleDateString()
                : "Not selected"}
            </p>

            <p>
              <strong>Check-out:</strong>{" "}
              {checkOutDate
                ? new Date(checkOutDate).toLocaleDateString()
                : "Not selected"}
            </p>

            <p>
              <strong>Guests:</strong> {guestCount || 1}
            </p>
          </div>

          <button className="book-now-button" onClick={handleBookNow}>
            Book Now
          </button>

          <p className="booking-note">You won't be charged yet</p>

          <div className="booking-details">
            <p>
              Weekly discount <span>5%</span>
            </p>
            <p>
              Cleaning fee <span>R350</span>
            </p>
            <p>
              Service fee <span>R421</span>
            </p>
            <p>
              Occupancy taxes <span>R130</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PropertyDetails;
