import React, { useState } from "react";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("User Management");
  const [logFilter, setLogFilter] = useState("all");

  /* ---------------- USERS ---------------- */
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "Manager", active: false },
    { id: 2, name: "Bob", role: "Employee", active: true },
    { id: 3, name: "Emma", role: "Employee", active: false }
  ]);

  /* ---------------- ROLES & PERMISSIONS ---------------- */
  const [roles, setRoles] = useState({
    Admin: {
      manageUsers: true,
      manageTasks: true,
      viewReports: true
    },
    Manager: {
      manageUsers: false,
      manageTasks: true,
      viewReports: true
    },
    Employee: {
      manageUsers: false,
      manageTasks: true,
      viewReports: false
    }
  });

  const permissionLabels = {
    manageUsers: "Manage Users",
    manageTasks: "Manage Tasks",
    viewReports: "View Reports"
  };

  /* ---------------- ACTIVITY LOGS ---------------- */
  const [logs, setLogs] = useState([
    {
      id: 1,
      time: new Date(),
      actor: "System",
      action: "System Initialized",
      target: "-",
      type: "info"
    }
  ]);

  const [confirmUser, setConfirmUser] = useState(null);

  /* ---------------- HELPERS ---------------- */
  const addLog = (actor, action, target, type = "info") => {
    setLogs(prev => [
      {
        id: Date.now(),
        time: new Date(),
        actor,
        action,
        target,
        type
      },
      ...prev
    ]);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleString();
  };

  /* ---------------- USER ACTIONS ---------------- */
  const toggleUserStatus = () => {
    setUsers(prev =>
      prev.map(u =>
        u.id === confirmUser.id
          ? { ...u, active: !u.active }
          : u
      )
    );

    addLog(
      "Admin",
      confirmUser.active ? "User Disabled" : "User Enabled",
      confirmUser.name,
      "action"
    );

    setConfirmUser(null);
  };

  const changeRole = (id, role) => {
    const user = users.find(u => u.id === id);

    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, role } : u
      )
    );

    addLog(
      "Admin",
      "Role Changed",
      `${user.name} → ${role}`,
      "action"
    );
  };

  /* ---------------- PERMISSION ACTION ---------------- */
  const togglePermission = (role, permission) => {
    setRoles(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: !prev[role][permission]
      }
    }));

    addLog(
      "Admin",
      "Permission Updated",
      `${permissionLabels[permission]} (${role})`,
      "warning"
    );
  };

  /* ---------------- FILTERED LOGS ---------------- */
  const filteredLogs =
    logFilter === "all"
      ? logs
      : logs.filter(log => log.type === logFilter);

  /* ---------------- EXPORT LOGS ---------------- */
  const exportLogsToCSV = () => {
    if (filteredLogs.length === 0) return;

    const headers = ["Time", "Actor", "Action", "Target", "Type"];

    const rows = filteredLogs.map(log => [
      formatTime(log.time),
      log.actor,
      log.action,
      log.target,
      log.type.toUpperCase()
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "activity_logs.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ---------------- RENDER CONTENT ---------------- */
  const renderContent = () => {
    /* USER MANAGEMENT */
    if (activeMenu === "User Management") {
      return (
        <>
          <h3>User Management</h3>

          <table>
            <thead>
              <tr>
                <th>User</th>
                <th style={{ textAlign: "center" }}>Role</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>

                  <td className="center-cell">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        changeRole(user.id, e.target.value)
                      }
                    >
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>Employee</option>
                    </select>
                  </td>

                  <td className="center-cell">
                    <span
                      className={
                        user.active
                          ? "status-done"
                          : "status-pending"
                      }
                    >
                      {user.active ? "Active" : "Disabled"}
                    </span>
                  </td>

                  <td className="action-cell">
                    <button onClick={() => setConfirmUser(user)}>
                      {user.active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    /* ROLES & PERMISSIONS */
    if (activeMenu === "Roles & Permissions") {
      return (
        <>
          <h3>Roles & Permissions</h3>
          <p style={{ fontSize: 13, color: "#666" }}>
            Configure permissions for each role
          </p>

          {Object.keys(roles).map(role => (
            <div key={role} className="permission-card">
              <h4>{role}</h4>

              {Object.keys(roles[role]).map(permission => (
                <div key={permission} className="permission-row">
                  <span>{permissionLabels[permission]}</span>
                  <input
                    type="checkbox"
                    checked={roles[role][permission]}
                    onChange={() =>
                      togglePermission(role, permission)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </>
      );
    }

    /* ACTIVITY LOGS */
    if (activeMenu === "Activity Logs") {
      return (
        <>
          <h3>Activity Logs</h3>
          <p style={{ fontSize: 13, color: "#666" }}>
            Audit trail of admin and system actions
          </p>

          <div className="log-toolbar">
            <select
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="info">Info</option>
              <option value="action">Action</option>
              <option value="warning">Warning</option>
            </select>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={exportLogsToCSV}>
                Export CSV
              </button>

              <button
                className="danger"
                onClick={() => setLogs([])}
              >
                Clear Logs
              </button>
            </div>
          </div>

          <div className="log-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Actor</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>Type</th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-log">
                      No activity recorded yet
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id}>
                      <td>{formatTime(log.time)}</td>
                      <td>{log.actor}</td>
                      <td>{log.action}</td>
                      <td>{log.target}</td>
                      <td>
                        <span className={`log-badge ${log.type}`}>
                          {log.type.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h3>Admin Control</h3>

        {[
          "User Management",
          "Roles & Permissions",
          "Activity Logs"
        ].map(item => (
          <button
            key={item}
            className={`admin-menu ${
              activeMenu === item ? "active" : ""
            }`}
            onClick={() => setActiveMenu(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {renderContent()}
      </main>

      {/* CONFIRM MODAL */}
      {confirmUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Action</h3>
            <p>
              Are you sure you want to{" "}
              <b>{confirmUser.active ? "disable" : "enable"}</b>{" "}
              <b>{confirmUser.name}</b>?
            </p>

            <div className="modal-buttons">
              <button onClick={() => setConfirmUser(null)}>
                Cancel
              </button>
              <button onClick={toggleUserStatus}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
