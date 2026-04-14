import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";
import API from "../services/api";

function Home() {
  const [stats, setStats] = useState({ total: 0, resolved: 0, inProgress: 0 });

  useEffect(() => {
    API.get("/list")
      .then((res) => {
        const complaints = res.data;
        const total = complaints.length;
        const resolved = complaints.filter((c) => c.status === "resolved").length;
        const inProgress = complaints.filter((c) => c.status === "review").length;
        setStats({ total, resolved, inProgress });
      })
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="hero">
        <h1>File Complaints<br /><span className="gradient-text">On the Blockchain</span></h1>
        <p>Tamper-proof, transparent, and decentralized. Every complaint is immutable and verifiable on-chain.</p>
        <div className="hero-btns">
          <Link to="/submit" className="btn-primary">Submit Complaint</Link>
          <Link to="/track" className="btn-outline">Track Status</Link>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-num purple">{stats.total}</div>
          <div className="stat-label">Total Complaints</div>
        </div>
        <div className="stat-card">
          <div className="stat-num green">{stats.resolved}</div>
          <div className="stat-label">Resolved</div>
        </div>
        <div className="stat-card">
          <div className="stat-num blue">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
