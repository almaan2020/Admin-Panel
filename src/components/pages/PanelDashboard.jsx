import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { getTotalUser } from "../../store/slices/userSlice";
import { getTotalResource } from "../../store/slices/resourceSlice";
import Sidebar from "../layouts/Sidebar";
import PanelRoutes from "../../routes/PanelRoutes";
import TotalCard from "../common/TotalCard";

const PanelDashboard = () => {
  const { total: totalUsers, status: userStatus } = useSelector(
    (state) => state.user
  );
  const { total: totalResources, status: resourceStatus } = useSelector(
    (state) => state.resource
  );
  const dispatch = useDispatch();

  //read total from api just for first time
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getTotalUser());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (resourceStatus === "idle") {
      dispatch(getTotalResource());
    }
  }, [dispatch, resourceStatus]);

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

        <div className="row d-flex justify-content-evenly my-4">
          <TotalCard title="Users" icon="users" value={totalUsers} />
          <TotalCard title="Resources" icon="cogs" value={totalResources} />
        </div>

        <div className="row d-flex justify-content-evenly mt-5">
          <PanelRoutes />
        </div>
      </div>
    </div>
  );
};
export default PanelDashboard;
