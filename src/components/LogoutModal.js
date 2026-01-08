import React, { useEffect } from "react";

export default function LogoutModal({ onConfirm, onCancel }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onCancel]);

  return (
    <div className="logout-overlay" onClick={onCancel}>
      <div className="logout-box" onClick={(e) => e.stopPropagation()}>
        <h3>Sign out of your account?</h3>
        <p>
          You’ll be signed out of the Company Portal.
          <br />
          You can sign back in anytime.
        </p>

        <div className="logout-actions">
          <button className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onConfirm}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
