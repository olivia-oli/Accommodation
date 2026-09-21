import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import logo from "../assets/logo.png";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    location: selectedLocation,
    checkInDate,
    checkOutDate,
    guestCount,
  } = location.state || {};

  if (!selectedLocation) {
    return (
      <div>
        <h1>Search Results</h1>
        <p>Please return to the home page and search for a place.</p>
      </div>
    );
  }

  return (
    
    <div className="search-results">
    <div className="logo">
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
            
          </div>
      <h1>Places in {selectedLocation}</h1>

      <div className="search-summary">
        <p>
          <strong>Location:</strong> {selectedLocation}
        </p>

        <p>
          <strong>Check-in:</strong>{" "}
          {checkInDate ? new Date(checkInDate).toLocaleDateString() : ""}
        </p>

        <p>
          <strong>Check-out:</strong>{" "}
          {checkOutDate ? new Date(checkOutDate).toLocaleDateString() : ""}
        </p>

        <p>
          <strong>Guests:</strong> {guestCount}
        </p>
      </div>

      <h2>Available places</h2>

      <div className="places">
        {/* CARD 1 */}
        <div className="place-card">
          <div className="place-image">
            <img
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1170&q=80"
              alt="Beautiful Apartment"
            />

            <button
              className="heart-button"
              onClick={() =>
                navigate("/property", {
                  state: {
                    checkInDate,
                    checkOutDate,
                    guestCount,
                  },
                })
              }
            >
              <FiHeart />
            </button>
          </div>

          <div className="place-info">
            <div>
              <h3>Beautiful Apartment</h3>

              <p>{selectedLocation}</p>

              <p>2 bedrooms • 4 guests</p>
            </div>

            <div className="place-price">
              <strong>R1,200</strong>
              <span> night</span>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="place-card">
          <div className="place-image">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1170&q=80"
              alt="Modern Home"
            />

            <button
              className="heart-button"
              onClick={() =>
                navigate("/property", {
                  state: {
                    checkInDate,
                    checkOutDate,
                    guestCount,
                  },
                })
              }
            >
              <FiHeart />
            </button>
          </div>

          <div className="place-info">
            <div>
              <h3>Modern Home</h3>

              <p>{selectedLocation}</p>

              <p>3 bedrooms • 6 guests</p>
            </div>

            <div className="place-price">
              <strong>R1,800</strong>
              <span> night</span>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="place-card">
          <div className="place-image">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1170&q=80"
              alt="Luxury Stay"
            />

            <button
              className="heart-button"
              onClick={() =>
                navigate("/property", {
                  state: {
                    checkInDate,
                    checkOutDate,
                    guestCount,
                  },
                })
              }
            >
              <FiHeart />
            </button>
          </div>

          <div className="place-info">
            <div>
              <h3>Luxury Stay</h3>

              <p>{selectedLocation}</p>

              <p>4 bedrooms • 8 guests</p>
            </div>

            <div className="place-price">
              <strong>R2,500</strong>
              <span> night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
