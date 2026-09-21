import { FiMenu, FiUser } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./CreateListing.css";

const CreateListing = () => {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("airbnbLoggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    guests: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    weeklyDiscount: "",
    cleaningFee: "",
    serviceFee: "",
    occupancyTaxes: "",
    amenities: [],
    description: "",
    enhancedCleaning: false,
    selfCheckIn: false,
    images: [],
  });

  const handleLogout = () => {
    localStorage.removeItem("airbnbLoggedInUser");
    setLoggedInUser(null);
    window.dispatchEvent(new Event("userLoggedOut"));
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenitiesChange = (event) => {
    const selectedAmenities = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    );

    setFormData((previous) => ({
      ...previous,
      amenities: selectedAmenities,
    }));
  };

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);

    setFormData((previous) => ({
      ...previous,
      images: selectedImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const imageData = await Promise.all(
      formData.images.map(
        (image) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(image);
          }),
      ),
    );

    const listing = {
      id: Date.now(),
      ...formData,
      images: imageData,
      host: loggedInUser?.username || "Unknown Host",
    };

    const existingListings = JSON.parse(
      localStorage.getItem("airbnbListings") || "[]",
    );

    localStorage.setItem(
      "airbnbListings",
      JSON.stringify([...existingListings, listing]),
    );

    alert("Listing created successfully!");

    navigate("/admin/view-listings");
  };

  return (
    <div className="create-listing-page">
      {/* Header */}
      <header className="create-listing-header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {loggedInUser && (
          <p className="welcome-user">Welcome, {loggedInUser.username}</p>
        )}

        <button className="menu-button_3" onClick={handleLogout} title="Logout">
          <FiMenu size={22} />
          <FiUser size={22} />
        </button>
      </header>

      {/* Navigation */}
      <div className="admin-navigation">
        <button onClick={() => navigate("/admin/reservations")}>
          View Reservations
        </button>

        <button onClick={() => navigate("/admin/view-listings")}>
          View Listings
        </button>

        <button
          onClick={() => navigate("/admin/create-listing")}
          className="active"
        >
          Create Listing
        </button>
      </div>

      {/* Main Content */}
      <main className="create-listing-content">
        <h1>Create New Listing</h1>

        <form className="create-listing-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>
              Title<span>*</span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter listing title"
              required
            />
          </div>

          {/* Type */}
          <div className="form-group">
            <label>
              Type<span>*</span>
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Private Room">Private Room</option>
              <option value="Hotel Room">Hotel Room</option>
            </select>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>
              Location<span>*</span>
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter property location"
              required
            />
          </div>

          {/* Guests / Bedrooms / Bathrooms */}
          <div className="form-row">
            <div className="form-group">
              <label>
                Guests<span>*</span>
              </label>

              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Guests"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Bedrooms<span>*</span>
              </label>

              <input
                type="number"
                name="bedrooms"
                min="0"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Bedrooms"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Bathrooms<span>*</span>
              </label>

              <input
                type="number"
                name="bathrooms"
                min="0"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="Bathrooms"
                required
              />
            </div>
          </div>

          {/* Price */}
          <div className="form-group">
            <label>
              Price per Night (R)<span>*</span>
            </label>

            <input
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 850"
              required
            />
          </div>

          {/* Fees */}
          <div className="form-row">
            <div className="form-group">
              <label>Weekly Discount (%)</label>

              <input
                type="number"
                name="weeklyDiscount"
                min="0"
                max="100"
                value={formData.weeklyDiscount}
                onChange={handleChange}
                placeholder="e.g. 10"
              />
            </div>

            <div className="form-group">
              <label>Cleaning Fee (R)</label>

              <input
                type="number"
                name="cleaningFee"
                min="0"
                value={formData.cleaningFee}
                onChange={handleChange}
                placeholder="e.g. 250"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Service Fee (R)</label>

              <input
                type="number"
                name="serviceFee"
                min="0"
                value={formData.serviceFee}
                onChange={handleChange}
                placeholder="e.g. 100"
              />
            </div>

            <div className="form-group">
              <label>Occupancy Taxes (R)</label>

              <input
                type="number"
                name="occupancyTaxes"
                min="0"
                value={formData.occupancyTaxes}
                onChange={handleChange}
                placeholder="e.g. 50"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="form-group">
            <label>Amenities</label>

            <select
              multiple
              value={formData.amenities}
              onChange={handleAmenitiesChange}
              className="amenities-select"
            >
              <option value="WiFi">WiFi</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Washer">Washer</option>
              <option value="Dryer">Dryer</option>
              <option value="Air Conditioning">Air Conditioning</option>
              <option value="Heating">Heating</option>
              <option value="Pool">Pool</option>
              <option value="TV">TV</option>
              <option value="Free Parking">Free Parking</option>
            </select>

            <small>Hold Ctrl/Cmd to select multiple</small>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>
              Description<span>*</span>
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your accommodation..."
              rows="6"
              required
            />
          </div>

          {/* Additional Features */}
          <div className="checkbox-section">
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="enhancedCleaning"
                checked={formData.enhancedCleaning}
                onChange={handleChange}
              />

              <span>Enhanced Cleaning</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                name="selfCheckIn"
                checked={formData.selfCheckIn}
                onChange={handleChange}
              />

              <span>Self Check-in</span>
            </label>
          </div>

          {/* Images */}
          <div className="image-upload-section">
            <h2>Upload Images</h2>

            <label className="image-upload-label">Select Images</label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              multiple
              onChange={handleImageChange}
            />

            <small>Select multiple images (JPG, PNG, GIF)</small>

            {formData.images.length > 0 && (
              <p className="selected-images">
                {formData.images.length} image(s) selected
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/admin/view-listings")}
            >
              Cancel
            </button>

            <button type="submit" className="create-button">
              Create Listing
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
