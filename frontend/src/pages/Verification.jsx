import React, { useEffect } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router";

export const Verification = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);

      if (event === "SIGNED_IN" && session) {
        navigate("/entry", { replace: true });
      }
    });
    return () => {
      subscription.unsubscrite();
    };
  }, [navigate]);
  return (
    <div>
      <h1>Please confirm your email</h1>
    </div>
  );
};
