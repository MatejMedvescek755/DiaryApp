import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { signUp as signUpAPI } from "../scripts/main";
import "../styles/Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setLoading(true);
    await signUpAPI(e.target[0].value);
    setLoading(false);
    navigate("/verification");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Sign in via magic link with your email below</p>

        <form onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder="Your email" required />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Send Magic Link"}
          </button>
        </form>

        <div className="footer">Powered by Supabase</div>
      </div>
    </div>
  );
};
