import React, { useState, useRef, useEffect } from "react";

export default function Navbar({
  user,
  onLogoutClick,
  onToggleTheme,
  theme
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  // 🔐 Guard: before login
  if (!user) {
    return (
      <div className="navbar">
        <div className="brand">Company Portal</div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="brand">Company Portal</div>

      <div className="nav-right" ref={menuRef}>
        {/* Theme toggle */}
        <button className="theme-btn" onClick={onToggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Visible Logout */}
        <button
          className="logout-btn"
          onClick={onLogoutClick}
        >
          Logout
        </button>

        {/* Avatar Menu */}
        <div className="user-menu">
          <button
            className="avatar-btn"
            onClick={() => setOpen(!open)}
            aria-label="User menu"
          >
            {user.name?.charAt(0).toUpperCase()} ▾
          </button>

          {open && (
            <div className="dropdown">
              <div className="dropdown-header">
                <strong>{user.name}</strong>
                <span>{user.role}</span>
              </div>

              <button
                className="dropdown-item"
                onClick={() => {
                  setOpen(false);
                  onLogoutClick();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
