import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Farm from "./pages/Farm";
import History from "./pages/History";
import Insights from "./pages/Insights";
import HowItWorks from "./pages/HowItWorks";
import Dataset from "./pages/Dataset";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Register from "./pages/Register";

/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* =========================================================
   APP
========================================================= */

function App() {
  const location = useLocation();

  const authPages =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {/* NAVBAR */}
      {!authPages && <Navbar />}

      {/* ROUTES */}
      <Routes>

        {/* DEFAULT */}
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        {/* =================================================
            AUTHENTICATION
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            CROP ANALYSIS
        ================================================= */}

        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <Analyze />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            MY FARM
        ================================================= */}

        <Route
          path="/farm"
          element={
            <ProtectedRoute>
              <Farm />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            HISTORY
        ================================================= */}

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            INSIGHTS
        ================================================= */}

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <Route
          path="/how-it-works"
          element={
            <ProtectedRoute>
              <HowItWorks />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            DATASET
        ================================================= */}

        <Route
          path="/dataset"
          element={
            <ProtectedRoute>
              <Dataset />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            PROFILE
        ================================================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            INVALID URL
        ================================================= */}

        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />

      </Routes>

      {/* FOOTER */}
      {!authPages && <Footer />}
    </>
  );
}

export default App;