// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import "./Pages.css";
import API from "../services/api";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/list")
      .then((res) => setComplaints(res.data))
      .catch((err) => {
        setError("Failed to load complaints from blockchain.");
        console.error(err);
      });
  }, []);

  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;
  const open = complaints.filter((c) => c.status === "open").length;
  const openRate = total > 0 ? Math.round((open / total) * 100) : 0;

  return (
    <div className="page-wrapper">
      <div className="dash-stats">
        <div className="dash-card">
          <div className="dash-card-label">Total filed</div>
          <div className="dash-card-val" style={{ color: "#a78bfa" }}>{total}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">Resolved</div>
          <div className="dash-card-val" style={{ color: "#34d399" }}>{resolved}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">Under Review</div>
          <div className="dash-card-val">{complaints.filter((c) => c.status === "review").length}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">Open rate</div>
          <div className="dash-card-val" style={{ color: "#60a5fa" }}>{openRate}%</div>
        </div>
      </div>

      <div className="table-wrap">
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : complaints.length === 0 ? (
          <p>No complaints found on blockchain.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td><span className="mono">{c.id}</span></td>
                  <td>{c.title}</td>
                  <td>{c.category}</td>
                  <td>{c.date}</td>
                  <td>
                    <span className={`pill ${c.status ?? "open"}`}>
                      {String(c.status ?? "open").charAt(0).toUpperCase() + String(c.status ?? "open").slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
