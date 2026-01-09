import React, { useState } from "react";

export default function ManagerDashboard() {
  const [activeAction, setActiveAction] = useState(null);

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

  const updateStatus = (id, newStatus) => {
    const t = tasks.find(x => x.id === id);

    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    setActivity(prev => [
      `${t.employee} updated "${t.task}" → ${newStatus}`,
      ...prev
    ]);
  };

  const completed = tasks.filter(t => t.status === "Done").length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <div className="mgr-layout">
      {/* LEFT PANEL */}
      <aside className="mgr-actions">
        <h4>Manager Controls</h4>

        {[
          { key: "assign", label: "Assign Task", desc: "Allocate new work", icon: "📋" },
          { key: "team", label: "View Team", desc: "Members & roles", icon: "👥" },
          { key: "report", label: "Weekly Report", desc: "Performance summary", icon: "📊" }
        ].map(action => (
          <div
            key={action.key}
            className={`mgr-command ${activeAction === action.key ? "active" : ""}`}
            onClick={() => setActiveAction(action.key)}
          >
            <span className="icon">{action.icon}</span>
            <div>
              <strong>{action.label}</strong>
              <p>{action.desc}</p>
            </div>
          </div>
        ))}
      </aside>

      {/* CENTER */}
      <main className="mgr-main">
        <h3>Team Tasks</h3>

        {tasks.map(task => (
          <div key={task.id} className="mgr-task-row">
            <div>
              <strong>{task.employee}</strong>
              <p>{task.task}</p>
            </div>

            <select
              value={task.status}
              onChange={(e) => updateStatus(task.id, e.target.value)}
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
          <div className="progress-fill" style={{ width: `${progress}%` }} />
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
