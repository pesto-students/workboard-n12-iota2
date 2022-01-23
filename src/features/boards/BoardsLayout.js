import React from "react";
import { Outlet } from "react-router";

export default function BoardsLayout() {
  return (
    <div>
      boards <Outlet />
    </div>
  );
}
