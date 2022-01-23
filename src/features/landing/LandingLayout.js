import React from "react";
import { Link } from "react-router-dom";

export default function LandingLayout() {
  return (
    <div>
      landing <Link to="/auth">Login here</Link>{" "}
    </div>
  );
}
