import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/panel/Home";
import NewUser from "../components/pages/panel/NewUser";
import EditUser from "../components/pages/panel/EditUser";
import UserList from "../components/pages/panel/UserList";
import ResList from "../components/pages/panel/ResList";
import UserDetail from "../components/pages/panel/UserDetail";
import ResDetail from "../components/pages/panel/ResDetail";

const PanelRoutes = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={<Home text="You are" textMuted=" Logged in." />}
      />
      <Route path="/user-new" element={<NewUser />} />
      <Route path="/user-edit" element={<EditUser />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/resource-list" element={<ResList />} />
      <Route path="/user-detail" element={<UserDetail />} />
      <Route path="/resource-detail" element={<ResDetail />} />
    </Routes>
  );
};

export default PanelRoutes;
