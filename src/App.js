import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LogoutModal from "./components/LogoutModal";

import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";

export default function App() {
  /* ===============================
     STATE (PERSISTENT)
     =============================== */

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* ===============================
     EFFECTS (SAVE TO STORAGE)
     =============================== */

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ===============================
     HANDLERS
     =============================== */

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogoutModal(false);
    localStorage.removeItem("user");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /* ===============================
     DASHBOARD SWITCH
     =============================== */

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case "employee":
        return <EmployeeDashboard user={user} />;
      case "manager":
        return <ManagerDashboard user={user} />;
      case "admin":
        return <AdminDashboard user={user} />;
      default:
        return null;
    }
  };

  /* ===============================
     RENDER
     =============================== */

  return (
    <div className={`container ${theme} ${user?.role || ""}`}>
      {/* Navbar */}
      <Navbar
        user={user}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      {/* Main Content */}
      <main style={{ padding: "24px" }}>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          renderDashboard()
        )}
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
