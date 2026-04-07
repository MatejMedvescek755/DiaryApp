import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <header className="header">
      <h1 className="title">My Diary App</h1>
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
