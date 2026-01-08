import React, { useState } from "react";

export default function ManagerDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, employee: "Alice", task: "Prepare presentation", status: "In Progress" },
    { id: 2, employee: "Bob", task: "Review reports", status: "Pending" },
    { id: 3, employee: "Emma", task: "Team meeting", status: "Done" }
  ]);

  const [activity, setActivity] = useState([
    "Alice started Prepare presentation",
    "Bob assigned Review reports",
    "Emma completed Team meeting"
  ]);

  const [actionMessage, setActionMessage] = useState("");

  const updateStatus = (id, newStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: newStatus, flash: true } : t
      )
    );

    const task = tasks.find(t => t.id === id);
    setActivity(prev => [
      `${task.employee} marked "${task.task}" as ${newStatus}`,
      ...prev
    ]);

    setTimeout(() => {
      setTasks(prev =>
        prev.map(t =>
          t.id === id ? { ...t, flash: false } : t
        )
      );
    }, 600);
  };

  const completed = tasks.filter(t => t.status === "Done").length;
  const progress = Math.round((completed / tasks.length) * 100);

  /* ------------------
     MANAGER ACTIONS
     ------------------ */
  const handleAction = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(""), 2000);
  };

  return (
    <div className="mgr-layout">
      {/* LEFT */}
      <aside className="mgr-actions">
        <h4>Manager Actions</h4>

        <button
          className="mgr-btn"
          onClick={() => handleAction("Assign Task panel will open")}
        >
          Assign Task
        </button>

        <button
          className="mgr-btn"
          onClick={() => handleAction("Loading team overview")}
        >
          View Team
        </button>

        <button
          className="mgr-btn secondary"
          onClick={() => handleAction("Weekly report generated")}
        >
          Weekly Report
        </button>

        {/* Inline feedback (very important) */}
        {actionMessage && (
          <p className="mgr-action-feedback">{actionMessage}</p>
        )}
      </aside>

      {/* CENTER */}
      <main className="mgr-main">
        <h3>Team Tasks</h3>

        {tasks.map(t => (
          <div
            key={t.id}
            className={`mgr-task-row ${t.flash ? "flash" : ""}`}
          >
            <div>
              <strong>{t.employee}</strong>
              <p>{t.task}</p>
            </div>

            <select
              value={t.status}
              onChange={(e) => updateStatus(t.id, e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        ))}
      </main>

      {/* RIGHT */}
      <aside className="mgr-progress">
        <h4>Team Progress</h4>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p>{progress}% Completed</p>

        <h4 style={{ marginTop: 20 }}>Recent Activity</h4>
        {activity.slice(0, 4).map((a, i) => (
          <p key={i}>{a}</p>
        ))}
      </aside>
    </div>
  );
}
