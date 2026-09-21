import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const savedUsers = JSON.parse(localStorage.getItem("airbnbUsers") || "[]");
    const legacyUser = JSON.parse(localStorage.getItem("airbnbUser") || "null");
    const users =
      savedUsers.length > 0 ? savedUsers : legacyUser ? [legacyUser] : [];
    const savedUser = users.find((user) => user.username === username);

    // Check if account exists
    if (!savedUser) {
      setError("Incorrect username or password.");
      return;
    }

    // Check username
    if (username !== savedUser.username) {
      setError("Incorrect username.");
      return;
    }

    // Check password
    if (password !== savedUser.password) {
      setError("Incorrect password.");
      return;
    }

    // Login successful
    setError("");

    // Save logged-in user including role
    localStorage.setItem(
      "airbnbLoggedInUser",
      JSON.stringify({
        username: savedUser.username,
        role: savedUser.role || "user",
      }),
    );

    // Tell Header that login was successful
    window.dispatchEvent(new Event("userLoggedIn"));

    // Redirect depending on account type
    if (savedUser.role === "host") {
      navigate("/admin/reservations");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
