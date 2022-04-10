import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import NotFound from "../components/pages/NotFound";
import PanelDashboard from "../components/pages/PanelDashboard";
import routes from "../config/routes";

const MainRoutes = () => {
  const { panel, login, register } = routes;
  return (
    <Routes>
      <Route path={`${panel}/*`} element={<PanelDashboard />} />
      <Route path={login} element={<Login />} />
      <Route path={register} element={<Register />} />
      <Route path="/" element={<Navigate replace to={login} />} />
      <Route path="*" element={<NotFound message="Page Not Found!" />} />
    </Routes>
  );
};

export default MainRoutes;
