import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const savedUser = JSON.parse(
        localStorage.getItem("precisionFarmingUser") || "null"
      );

      if (!savedUser) {
        setError(
          "No account found. Please create an account first."
        );
        setLoading(false);
        return;
      }

      const emailMatches =
        savedUser.email?.toLowerCase() ===
        email.trim().toLowerCase();

      const passwordMatches =
        savedUser.password === password;

      if (!emailMatches || !passwordMatches) {
        setError(
          "Invalid email or password. Please try again."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("isLoggedIn", "true");

      setLoading(false);

      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-visual">

        <div className="login-visual-overlay">

          <div className="login-brand">
            <span>🌾</span>
            <strong>
              Precision<span>Farming</span>
            </strong>
          </div>

          <div className="login-hero-content">

            <span className="login-tag">
              🌱 AI-Powered Crop Monitoring
            </span>

            <h1>
              Know Your Crop.
              <br />
              <span>Protect Your Harvest.</span>
            </h1>

            <p>
              Analyze crop images using computer vision,
              CNN-based feature extraction, and YOLO
              object detection.
            </p>

            <div className="login-features">

              <div>
                <span>🔍</span>
                <div>
                  <strong>Smart Analysis</strong>
                  <small>
                    AI-based crop image analysis
                  </small>
                </div>
              </div>

              <div>
                <span>🌾</span>
                <div>
                  <strong>Field Monitoring</strong>
                  <small>
                    Keep track of your farm fields
                  </small>
                </div>
              </div>

              <div>
                <span>📊</span>
                <div>
                  <strong>Analysis History</strong>
                  <small>
                    Review your previous observations
                  </small>
                </div>
              </div>

            </div>

          </div>

          <div className="login-visual-bottom">
            CNN + YOLO • Smart Crop Monitoring
          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="login-form-section">

        <div className="login-form-container">

          <div className="login-mobile-brand">
            <span>🌾</span>
            <strong>
              Precision<span>Farming</span>
            </strong>
          </div>


          <div className="login-heading">

            <span className="login-small-label">
              WELCOME BACK
            </span>

            <h2>
              Farmer Login
            </h2>

            <p>
              Sign in to continue monitoring your crops.
            </p>

          </div>


          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            <div className="login-field">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span>✉️</span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            <div className="login-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span>🔒</span>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}


            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In →"}
            </button>

          </form>


          <div className="login-divider">
            <span>New to Precision Farming?</span>
          </div>


          <Link
            to="/register"
            className="register-link"
          >
            Create New Account
          </Link>


          <div className="login-footer-note">
            <span>🔐</span>
            Your account information is stored locally
            for this project prototype.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;