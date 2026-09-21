import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please enter a username and password.");
      return;
    }

    // Save the account
    const newUser = {
      username,
      password,
      role,
    };

    const savedUsers = JSON.parse(localStorage.getItem("airbnbUsers") || "[]");
    const users = savedUsers.filter((user) => user.username !== username);

    localStorage.setItem("airbnbUsers", JSON.stringify([...users, newUser]));
    localStorage.setItem("airbnbUser", JSON.stringify(newUser));

    setError("");

    // Go to login
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <div>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
          <p>minimum 6 characters</p>
        </div>

        {/* ACCOUNT TYPE */}
        <div>
          <label>Role</label>

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="user">User</option>
            <option value="host">Host</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
