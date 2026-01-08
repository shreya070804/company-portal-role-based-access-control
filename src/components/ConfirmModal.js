import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <p>{message}</p>

        <div style={{ marginTop: 20 }}>
          <button onClick={onConfirm} style={{ marginRight: 10 }}>
            Yes
          </button>
          <button onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modalStyle = {
  background: "white",
  padding: 20,
  borderRadius: 6,
  minWidth: 300
};
