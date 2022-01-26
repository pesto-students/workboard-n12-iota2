import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./features/auth/AuthLayout";
import ForgotPassword from "./features/auth/forgot-password/ForgotPassword";
import Login from "./features/auth/login/Login";
import Signup from "./features/auth/signup/Signup";
import AllBoards from "./features/boards/all_boards/AllBoards";
import OwnedBoards from "./features/boards/all_boards/OwnedBoards";
import SharedBoards from "./features/boards/all_boards/SharedBoards";
import BoardsLayout from "./features/boards/BoardsLayout";
import SelectedBoard from "./features/boards/selected_board/SelectedBoard";
import LandingLayout from "./features/landing/LandingLayout";
import ProfileLayout from "./features/profile/ProfileLayout";

export default function RoutesConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayout />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="profile" element={<ProfileLayout />}></Route>
        <Route path="boards" element={<BoardsLayout />}>
          <Route index element={<AllBoards />} />
          <Route path="shared" element={<SharedBoards />} />
          <Route path="owned" element={<OwnedBoards />} />
        </Route>
        <Route path="boards/:boardId" element={<SelectedBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
