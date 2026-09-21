import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./MyBookings.css";

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const savedBooking = JSON.parse(localStorage.getItem("airbnbBooking"));

  const isPastBooking = savedBooking
    ? new Date(savedBooking.checkOut) < new Date()
    : false;

  const showBooking =
    savedBooking &&
    ((activeTab === "upcoming" && !isPastBooking) ||
      (activeTab === "past" && isPastBooking));

  return (
    <div className="bookings-page">
      <div className="bookings-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <h1>My Bookings</h1>

        <div className="booking-tabs">
          <button
            className={activeTab === "upcoming" ? "active" : ""}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>

          <button
            className={activeTab === "past" ? "active" : ""}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>

        {!showBooking ? (
          <div className="empty-bookings">
            <h2>No {activeTab} bookings found.</h2>

            <button className="browse-button" onClick={() => navigate("/")}>
              Browse Listings
            </button>
          </div>
        ) : (
          <div className="booking-item">
            <img
              src="https://airbnb-backend-4qvg.onrender.com/uploads/1742410129037.jpeg"
              alt="DuchessT Comfort"
            />

            <div className="booking-info">
              <h2>DuchessT Comfort Back-up Power, Wi-Fi & Netflix</h2>

              <p>Rosebank</p>

              <p>
                <strong>
                  {new Date(savedBooking.checkIn).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {" → "}
                  {new Date(savedBooking.checkOut).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </p>

              <p>
                {savedBooking.guests}{" "}
                {savedBooking.guests === 1 ? "guest" : "guests"}
              </p>

              <h3>R{savedBooking.total.toLocaleString()}</h3>

              <div className="booking-actions">
                <button
                  onClick={() =>
                    navigate("/property", {
                      state: {
                        checkInDate: savedBooking.checkIn,
                        checkOutDate: savedBooking.checkOut,
                        guestCount: savedBooking.guests,
                      },
                    })
                  }
                >
                  View Property
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("airbnbBooking");
                    window.location.reload();
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
