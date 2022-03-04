import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Panel from "../components/pages/Panel";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import NotFound from "../components/pages/NotFound";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/panel/*" element={<Panel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="*" element={<NotFound message="Page Not Found!" />} />
    </Routes>
  );
};

export default MainRoutes;
