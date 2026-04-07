import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Header } from "./components/Header";
import { Entries } from "./pages/Entries";
import "./styles/App.css";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/entry/:id" />

        <Route path="/entry" element={<Entries />} />

        <Route path="/verification" element={<div>verify your email</div>} />

        <Route path="/" element={<Navigate to="/entry" replace />} />
      </Routes>
    </main>
  );
}

export default App;
