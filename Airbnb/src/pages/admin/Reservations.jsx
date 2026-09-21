import { FiMenu, FiUser } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Reservations.css";

const Reservations = () => {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("airbnbLoggedInUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeTab, setActiveTab] = useState("upcoming");

  const [bookings] = useState(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("airbnbBookings") || "[]",
    );
    const savedBooking = localStorage.getItem("airbnbBooking");
    const bookings = savedBooking ? [JSON.parse(savedBooking)] : [];

    savedBookings.forEach((booking) => {
      if (!bookings.some((saved) => saved.id === booking.id)) {
        bookings.push(booking);
      }
    });

    return bookings.filter(
      (booking) => (booking.host || "Olivia") === loggedInUser?.username,
    );
  });

  const visibleBookings = bookings.filter((booking) => {
    const today = new Date().toISOString().split("T")[0];
    const isPast = booking.checkOut < today;
    return activeTab === "past" ? isPast : !isPast;
  });

  const handleLogout = () => {
    localStorage.removeItem("airbnbLoggedInUser");

    setLoggedInUser(null);

    window.dispatchEvent(new Event("userLoggedOut"));

    navigate("/");
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <header className="admin-header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {/* USER */}
        <div className="admin-user">
          {loggedInUser && <span>Welcome, {loggedInUser.username}</span>}

          <button
            className="menu-button_2"
            onClick={handleLogout}
            title="Logout"
          >
            <FiMenu size={22} />
            <FiUser size={22} />
          </button>
        </div>
      </header>
      <div className="admin-navigation">
        <button
          onClick={() => navigate("/admin/reservations")}
          className="active"
        >
          View Reservations
        </button>

        <button onClick={() => navigate("/admin/view-listings")}>
          View Listings
        </button>

        <button onClick={() => navigate("/admin/create-listing")}>
          Create Listing
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="reservation-content">
        <h1>Reservation Management</h1>

        {/* TABS */}
        <div className="reservation-tabs">
          <button
            className={activeTab === "upcoming" ? "active-tab" : ""}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Bookings
          </button>

          <button
            className={activeTab === "past" ? "active-tab" : ""}
            onClick={() => setActiveTab("past")}
          >
            Past Bookings
          </button>
        </div>

        {/* UPCOMING BOOKINGS */}
        {visibleBookings.length === 0 ? (
          <div className="empty-reservations">
            <h2>No {activeTab} reservations found.</h2>

            <p>
              When guests book your accommodation, their reservations will
              appear here.
            </p>

            <button
              className="create-listing-button"
              onClick={() => navigate("/admin/create-listing")}
            >
              Create a New Listing
            </button>
          </div>
        ) : (
          <div className="reservation-list">
            {visibleBookings.map((booking, index) => (
              <article className="reservation-item" key={booking.id || index}>
                <div>
                  <h2>DuchessT Comfort Back-up Power, Wi-Fi & Netflix</h2>
                  <p>Rosebank</p>
                  <p>
                    {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                  </p>
                </div>
                <strong>R{Number(booking.total || 0).toLocaleString()}</strong>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Reservations;
