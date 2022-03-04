import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { getlist, deleteUser } from "../../../store/slices/userSlice";
import List from "../../common/List";

const UserList = () => {
  const dispatch = useDispatch();
  const { userList, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getlist());
    }
  }, [dispatch, status]);

  const columns = [
    { path: "id", label: "ID" },
    { path: "email", label: "Email" },
    { path: "first_name", label: "FirstName" },
    { path: "last_name", label: "LastName" },
    {
      key: "avatar",
      content: (user) => <Image src={user.avatar} thumbnail />,
    },
    {
      key: "delete",
      content: (user) => (
        <button
          onClick={() => dispatch(deleteUser(user.id))}
          className="btn btn-outline-dark btn-sm"
        >
          <span className="fa fa-trash"></span>
        </button>
      ),
    },
  ];

  return <List status={status} columns={columns} list={userList} />;
};

export default UserList;
