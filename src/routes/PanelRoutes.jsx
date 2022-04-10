import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../components/pages/panel/Home";
import NewUser from "../components/pages/panel/NewUser";
import EditUser from "../components/pages/panel/EditUser";
import UserList from "../components/pages/panel/UserList";
import ResourceList from "../components/pages/panel/ResourceList";
import UserDetail from "../components/pages/panel/UserDetail";
import ResourceDetail from "../components/pages/panel/ResourceDetail";
import routes from "../config/routes";

const PanelRoutes = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const {
    panel,
    login,
    home,
    userNew,
    userEdit,
    userList,
    resourceList,
    userDetail,
    resourceDetail,
  } = routes;

  if (!currentUser) {
    return <Navigate replace to={login} />;
  }
  return (
    <Routes>
      <Route
        path={home}
        element={<Home text="You are" textMuted=" Logged in." />}
      />
      <Route path={userNew} element={<NewUser />} />
      <Route path={userEdit} element={<EditUser />} />
      <Route path={userList} element={<UserList />} />
      <Route path={resourceList} element={<ResourceList />} />
      <Route path={userDetail} element={<UserDetail />} />
      <Route path={resourceDetail} element={<ResourceDetail />} />
      <Route path="/" element={<Navigate replace to={`${panel}${home}`} />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default PanelRoutes;
