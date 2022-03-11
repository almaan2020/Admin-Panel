import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { Image } from "react-bootstrap";
import { getUser, deleteUser } from "../../../store/slices/userSlice";

const UserDetail = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const { id } = Object.fromEntries([...searchParams]);
    dispatch(getUser(id));
    setLoading(false);
  }, [dispatch, searchParams]);

  return (
    <div className="shadow-sm card border-light col-sm-8">
      {loading && <span className="spinner-border spinner-border-sm"></span>}
      {!loading && userInfo.data && (
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-around mb-3">
            <div className="d-flex flex-column justify-content-between">
              <div className="p-2 fw-bold">
                {userInfo.data.first_name}&nbsp;{userInfo.data.last_name}
              </div>
              <div className="p-2 fst-italic">
                Email:&nbsp;{userInfo.data.email}
              </div>
              <div className="p-2 fst-italic">
                Site:&nbsp;{userInfo.support.url}
              </div>
              <div className="p-2 text-secondary">{userInfo.support.text}</div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Image src={userInfo.data.avatar} roundedCircle />
              <br></br>
              <div className="d-flex">
                <button
                  onClick={() =>
                    navigate(
                      `/panel/user-edit?${createSearchParams({
                        id: userInfo.data.id,
                      })}`
                    )
                  }
                  className="btn btn-outline-dark btn-sm"
                >
                  <span className="fa fa-pencil"></span>
                </button>
                <button
                  onClick={() => {
                    dispatch(deleteUser(userInfo.data.id));
                    navigate("/panel/user-list");
                  }}
                  className="btn btn-outline-dark btn-sm"
                >
                  <span className="fa fa-trash"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
