import React from "react";

export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}
