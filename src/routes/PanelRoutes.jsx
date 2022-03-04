import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/panel/Home";
import NewUser from "../components/pages/panel/NewUser";
import UserList from "../components/pages/panel/UserList";
import ResList from "../components/pages/panel/ResList";

const PanelRoutes = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={<Home text="You are" textMuted=" Logged in." />}
      />
      <Route path="/user-new" element={<NewUser />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/resource-list" element={<ResList />} />
    </Routes>
  );
};

export default PanelRoutes;
