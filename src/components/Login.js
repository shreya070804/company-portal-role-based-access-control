import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const loginUser = (role) => {
    if (role === "emp")
      onLogin({ role: "employee", name: "Employee One" });
    if (role === "mgr")
      onLogin({ role: "manager", name: "Manager One" });
    if (role === "admin")
      onLogin({ role: "admin", name: "Admin" });
  };

  return (
    <div className="login-page">
      <div className="login-card modern">

        {/* Accent header */}
        <div className="login-accent">
          <h1>Company Portal</h1>
          <p>Role-based internal access</p>
        </div>

        {/* Manual login */}
        <div className="login-form">
          <input
            placeholder="Username (emp / mgr / admin)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button onClick={() => loginUser(username)}>
            Sign In
          </button>
        </div>

        <div className="divider-text">OR QUICK ACCESS</div>

        {/* Role cards */}
        <div className="role-grid">
          <div onClick={() => loginUser("emp")} className="role-card">
            👩‍💼
            <span>Employee</span>
          </div>
          <div onClick={() => loginUser("mgr")} className="role-card">
            🧑‍💼
            <span>Manager</span>
          </div>
          <div onClick={() => loginUser("admin")} className="role-card">
            🛠
            <span>Admin</span>
          </div>
        </div>

      </div>
    </div>
  );
}
