import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { getTotalUser } from "../../store/slices/userSlice";
import { getTotalResource } from "../../store/slices/resourceSlice";
import Sidebar from "../layouts/Sidebar";
import PanelRoutes from "../../routes/PanelRoutes";

const Panel = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { total: totalUsers, status: userStatus } = useSelector(
    (state) => state.user
  );
  const { total: totalResources, status: resStatus } = useSelector(
    (state) => state.resource
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getTotalUser());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (resStatus === "idle") {
      dispatch(getTotalResource());
    }
  }, [dispatch, resStatus]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="row gx-0">
      <div className="col-12 col-md-3 sidebar-wrapper">
        <div className="flex-column flex-nowrap vh-100 p-2">
          <Sidebar />
        </div>
      </div>
      <div className="col-12 col-md-9 offset-md-3 page-content-wrapper overflow-hidden">
      
        <div className="row navbar-panel gx-0">
          <div className="col-10"></div>
          <div className="col-2 text-center">
            <button
              className="btn btn-primary btn-darkblue"
              onClick={() => dispatch(logout())}
            >
              LogOut
            </button>
          </div>
        </div>
        {/* section: */}
        {/* cards */}
        <div className="row d-flex justify-content-evenly my-4">
          <div className="shadow-sm card border-light col-sm-4">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-around mb-3">
                <span className="fa fa-3x fa-users"></span>
                <div className="d-flex flex-column  align-items-center">
                  <h5>Users</h5>
                  <h3 className="mb-1">{totalUsers}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-sm card border-light col-sm-4">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-around mb-3">
                <span className="fa fa-3x fa-cogs"></span>
                <div className="d-flex flex-column  align-items-center">
                  <h5>Resources</h5>
                  <h3 className="mb-1">{totalResources}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* main */}
        <div className="row d-flex justify-content-evenly mt-5">
          <PanelRoutes />
        </div>
      </div>
    </div>
  );
};
export default Panel;
