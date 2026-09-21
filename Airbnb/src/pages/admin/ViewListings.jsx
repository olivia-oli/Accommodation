import { FiMenu, FiUser } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import defaultListingImage from "../../assets/large-image.avif";
import "./ViewListings.css";

const ViewListings = () => {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("airbnbLoggedInUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [listings, setListings] = useState(() =>
    JSON.parse(localStorage.getItem("airbnbListings") || "[]").filter(
      (listing) => listing.host === loggedInUser?.username,
    ),
  );

  const handleDeleteListing = (listingId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    const allListings = JSON.parse(
      localStorage.getItem("airbnbListings") || "[]",
    );
    const updatedListings = allListings.filter(
      (listing) => listing.id !== listingId,
    );

    localStorage.setItem("airbnbListings", JSON.stringify(updatedListings));
    setListings((currentListings) =>
      currentListings.filter((listing) => listing.id !== listingId),
    );
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("airbnbLoggedInUser");

    setLoggedInUser(null);

    window.dispatchEvent(new Event("userLoggedOut"));

    navigate("/");
  };

  return (
    <div className="listings-page">
      {/* HEADER */}
      <header className="listings-header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {loggedInUser && (
          <p className="welcome-user">Welcome, {loggedInUser.username}</p>
        )}

        <button className="menu-button_2" onClick={handleLogout} title="Logout">
          <FiMenu size={25} />
          <FiUser size={25} />
        </button>
      </header>

      {/* ADMIN NAVIGATION */}
      <div className="admin-navigation">
        <button onClick={() => navigate("/admin/reservations")}>
          View Reservations
        </button>

        <button
          onClick={() => navigate("/admin/view-listings")}
          className="active"
        >
          View Listings
        </button>

        <button onClick={() => navigate("/admin/create-listing")}>
          Create Listing
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="listings-content">
        <h1>My Hotel Listings</h1>

        {listings.length === 0 ? (
          <div className="empty-listings">
            <h2>No listings found.</h2>
            <p>
              Create your first listing and start accepting reservations from
              guests.
            </p>
            <button
              className="create-listing-button"
              onClick={() => navigate("/admin/create-listing")}
            >
              Create your first listing
            </button>
          </div>
        ) : (
          <div className="listing-grid">
            {listings.map((listing) => (
              <article className="listing-item" key={listing.id}>
                <img
                  className="listing-image"
                  src={listing.images?.[0] || defaultListingImage}
                  alt={listing.title || "Accommodation"}
                />
                <div className="listing-info">
                  <h2>{listing.title}</h2>
                  <p>
                    {listing.type} in {listing.location}
                  </p>
                  <p>
                    {listing.guests} guests · {listing.bedrooms} bedrooms ·{" "}
                    {listing.bathrooms} bathrooms
                  </p>
                  <strong>
                    R{Number(listing.price || 0).toLocaleString()} / night
                  </strong>
                  <button
                    className="delete-listing-button"
                    onClick={() => handleDeleteListing(listing.id)}
                  >
                    Delete Listing
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewListings;
