import React, { useState } from "react";

export default function EmployeeDashboard({
  user = { name: "Employee One" },
  isDark = false
}) {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Report Submission", status: "In Progress" },
    { id: 2, title: "Fix UI bugs", status: "Pending" },
    { id: 3, title: "Prepare slides", status: "In Progress" }
  ]);

  const [toast, setToast] = useState("");
  const [animateId, setAnimateId] = useState(null);

  /* ---------- ACTION ---------- */
  const markAsDone = (id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: "Done" } : t
      )
    );

    setAnimateId(id);
    setToast("✅ Task marked as Done");

    setTimeout(() => setAnimateId(null), 600);
    setTimeout(() => setToast(""), 2000);
  };

  const totalTasks = tasks.length;
  const completed = tasks.filter(t => t.status === "Done").length;
  const overdue = tasks.filter(t => t.status === "Pending").length;

  return (
    <div
      style={{
        padding: 32,
        minHeight: "100vh",
        background: isDark ? "#121212" : "#f4f6f8",
        color: isDark ? "#e0e0e0" : "#000",
        position: "relative"
      }}
    >
      <h2 style={{ marginBottom: 24 }}>Employee Dashboard</h2>

      {/* TOAST */}
      {toast && (
        <div
          style={{
            ...toastStyle,
            background: isDark ? "#1a73e8" : "#2f80ed"
          }}
        >
          {toast}
        </div>
      )}

      <div style={layoutStyle}>
        
        {/* LEFT — TODAY */}
        <div style={cardStyle(isDark)}>
          <h4 style={titleStyle}>Today</h4>

          <TodayItem
            color="#2f80ed"
            title="Task Assigned"
            text="Prepare monthly report"
            time="01:09 AM"
            isDark={isDark}
          />

          <TodayItem
            color="#27ae60"
            title="Status Updated"
            text="UI Bug Fix → In Progress"
            time="01:09 AM"
            isDark={isDark}
          />

          <TodayItem
            color="#9e9e9e"
            title="Meeting"
            text="Team sync at 4:00 PM"
            time="01:09 AM"
            isDark={isDark}
          />
        </div>

        {/* CENTER — FOCUS */}
        <div style={focusCardStyle}>
          <h3 style={{ marginBottom: 12 }}>My Focus Today</h3>
          <p style={{ fontSize: 16, marginBottom: 16 }}>
            Complete Report Submission
          </p>

          <button
            onClick={() => markAsDone(1)}
            style={focusButtonStyle}
          >
            ✔ Mark as Done
          </button>

          <h4 style={{ marginTop: 28, marginBottom: 12 }}>My Tasks</h4>

          {tasks.map(task => (
            <div
              key={task.id}
              style={{
                ...taskRowStyle,
                ...(animateId === task.id ? animateStyle : {})
              }}
            >
              <span>{task.title}</span>
              <span
                style={{
                  ...statusBadge(task.status, isDark),
                  ...(task.status === "Done" ? statusPop : {})
                }}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT — INSIGHTS */}
        <div style={cardStyle(isDark)}>
          <h4 style={titleStyle}>Insights</h4>

          <Insight value={totalTasks} label="Total Tasks" isDark={isDark} />
          <Insight value={completed} label="Completed" isDark={isDark} />
          <Insight value={overdue} label="Overdue" isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function TodayItem({ color, title, text, time, isDark }) {
  return (
    <div style={todayItem}>
      <span style={{ ...dot, background: color }} />
      <div>
        <b>{title}</b>
        <p style={{ margin: "2px 0", color: isDark ? "#ccc" : "#333" }}>
          {text}
        </p>
        <span style={timeStyle}>{time}</span>
      </div>
    </div>
  );
}

function Insight({ value, label, isDark }) {
  return (
    <div
      style={{
        ...insightCard,
        background: isDark ? "#1e1e1e" : "#fff",
        color: isDark ? "#e0e0e0" : "#000"
      }}
    >
      <h3>{value}</h3>
      <span style={{ color: isDark ? "#aaa" : "#666" }}>
        {label}
      </span>
    </div>
  );
}

/* ---------- STYLES ---------- */

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 1fr",
  gap: 28
};

const cardStyle = (isDark) => ({
  background: isDark ? "#1e1e1e" : "#f7faff",
  borderRadius: 18,
  padding: 24,
  boxShadow: isDark
    ? "none"
    : "0 10px 30px rgba(0,0,0,0.04)"
});

const focusCardStyle = {
  background: "linear-gradient(135deg, #2f80ed, #4c8df5)",
  borderRadius: 28,
  padding: 36,
  color: "#fff",
  boxShadow: "0 30px 60px rgba(47,128,237,0.35)"
};

const focusButtonStyle = {
  background: "#fff",
  color: "#2f80ed",
  border: "none",
  borderRadius: 24,
  padding: "10px 20px",
  fontWeight: 600,
  cursor: "pointer"
};

const taskRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: 14,
  background: "rgba(255,255,255,0.15)",
  marginBottom: 10,
  transition: "all 0.3s ease"
};

const animateStyle = {
  transform: "scale(1.03)",
  background: "rgba(255,255,255,0.3)"
};

const statusPop = {
  transform: "scale(1.1)",
  transition: "transform 0.3s ease"
};

const statusBadge = (status, isDark) => ({
  padding: "4px 10px",
  borderRadius: 14,
  fontSize: 12,
  fontWeight: 600,
  background:
    status === "Done"
      ? isDark ? "#1e3a2f" : "#e8f5e9"
      : status === "In Progress"
      ? isDark ? "#1e2a44" : "#e3f2fd"
      : isDark ? "#2a2a2a" : "#fff3e0",
  color:
    status === "Done"
      ? "#7ee2b8"
      : status === "In Progress"
      ? "#8ab4f8"
      : "#f2c97d"
});

const insightCard = {
  borderRadius: 16,
  padding: 18,
  textAlign: "center",
  marginBottom: 16
};

const toastStyle = {
  position: "fixed",
  bottom: 30,
  right: 30,
  color: "#fff",
  padding: "12px 18px",
  borderRadius: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  fontWeight: 500,
  zIndex: 999
};

const todayItem = {
  display: "flex",
  gap: 10,
  marginBottom: 14,
  fontSize: 14
};

const dot = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  marginTop: 6
};

const titleStyle = { marginBottom: 12 };
const timeStyle = { fontSize: 12, color: "#888" };
