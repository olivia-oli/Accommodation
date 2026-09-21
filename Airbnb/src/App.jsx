import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchResults from "./pages/SearchResults";
import PropertyDetails from "./pages/PropertyDetails";
import Reservation from "./pages/Reservation";
import MyBookings from "./pages/MyBookings";
import Reservations from "./pages/admin/Reservations";
import ViewListings from "./pages/admin/ViewListings";
import CreateListing from "./pages/admin/CreateListing";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property" element={<PropertyDetails />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/bookings" element={<MyBookings />} />
        {/* HOST ADMIN */}
        <Route path="/admin/reservations" element={<Reservations />} />
        <Route path="/admin/view-listings" element={<ViewListings />} />
        <Route path="/admin/create-listing" element={<CreateListing />} />
      </Routes>
    </Router>
  );
}

export default App;
