import { FiMenu, FiUser } from "react-icons/fi";
import logo from "../assets/logo.png";
import "./Header.css";

import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import DatePicker from "react-datepicker";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import "react-datepicker/dist/react-datepicker.css";

const Header = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [guestCount, setGuestCount] = useState(1);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  const [location, setLocation] = useState("");

  const popupRef = useRef(null);

  // Location
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Guest counter
  const handleGuestChange = (operation) => {
    setGuestCount((prevCount) => {
      const newCount =
        operation === "increment" ? prevCount + 1 : prevCount - 1;

      return Math.max(1, Math.min(10, newCount));
    });
  };

  // Close guest popup when clicking outside
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowGuestPopup(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("airbnbLoggedInUser");

    setLoggedInUser(null);

    window.dispatchEvent(new Event("userLoggedOut"));

    navigate("/");
  };

  useEffect(() => {
    if (showGuestPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGuestPopup]);

  // SEARCH
  const handleSearch = () => {
    if (!location) {
      alert("Please select a location.");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("Please select your check-in and check-out dates.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    navigate("/search", {
      state: {
        location,
        checkInDate,
        checkOutDate,
        guestCount,
      },
    });
  };

  useEffect(() => {
    const checkLoggedInUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("airbnbLoggedInUser"));

      setLoggedInUser(savedUser);
    };

    checkLoggedInUser();
    window.addEventListener("userLoggedIn", checkLoggedInUser);

    return () => {
      window.removeEventListener("userLoggedIn", checkLoggedInUser);
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="container ">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <nav className="nav">
          <a href="/" className="nav-link">
            Stay
          </a>

          <a href="/" className="nav-link">
            Experience
          </a>

          <a href="/" className="nav-link">
            Online Experience
          </a>
        </nav>

        <div className="header-right">
          {loggedInUser ? (
            <div className="logged-in-user">
              <p className="welcome-user_1">Welcome, {loggedInUser.username}</p>

              {loggedInUser.role === "host" && (
                <Link to="/admin/reservations">Host Dashboard</Link>
              )}

              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <p className="nav-link1">
              <Link to="/signup">Become a Host</Link>
            </p>
          )}

          <button
            className="menu-button"
            onClick={() => {
              if (loggedInUser) {
                if (loggedInUser.role === "host") {
                  navigate("/admin/reservations");
                } else {
                  navigate("/");
                }
              } else {
                navigate("/login");
              }
            }}
          >
            <button className="menu-button" onClick={handleLogout}>
              <FiMenu size={25} />
              <FiUser size={25} />
            </button>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="header-bottom">
          <div className="header-search">
            {/* LOCATION */}
            <div className="search-where">
              <p>Locations</p>

              <div className="search-input">
                <select value={location} onChange={handleLocationChange}>
                  <option value="">Select location</option>

                  <option value="France">France</option>

                  <option value="London">London</option>

                  <option value="Cape Town">Cape Town</option>

                  <option value="Sydney">Sydney</option>
                </select>
              </div>
            </div>

            {/* CHECK-IN */}
            <div className="search-checkin">
              <p>Check-in date</p>

              <DatePicker
                selected={checkInDate}
                onChange={(date) => {
                  setCheckInDate(date);

                  if (checkOutDate && date && date >= checkOutDate) {
                    setCheckOutDate(null);
                  }
                }}
                minDate={new Date()}
                placeholderText="Select date"
                className="date-picker"
              />
            </div>

            {/* CHECK-OUT */}
            <div className="search-checkout">
              <p>Check-out date</p>

              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                minDate={
                  checkInDate
                    ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                    : new Date()
                }
                placeholderText="Select date"
                className="date-picker"
              />
            </div>

            {/* GUESTS */}
            <div className="search-who">
              <p>Guests</p>

              <button
                className="search-button"
                onClick={() => setShowGuestPopup(true)}
              >
                {guestCount > 1
                  ? `${guestCount} Guests`
                  : `${guestCount} Guest`}
              </button>

              {showGuestPopup && (
                <div className="guest-popup" ref={popupRef}>
                  <div className="guest-selector">
                    <button
                      className="guest-button"
                      onClick={() => handleGuestChange("decrement")}
                    >
                      <RemoveIcon />
                    </button>

                    <input
                      type="number"
                      value={guestCount}
                      readOnly
                      className="guest-input"
                    />

                    <button
                      className="guest-button"
                      onClick={() => handleGuestChange("increment")}
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SEARCH ICON */}
            <button className="search-icon-button" onClick={handleSearch}>
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
