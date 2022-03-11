import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { Image } from "react-bootstrap";
import { getlist, deleteUser } from "../../../store/slices/userSlice";
import List from "../../common/List";

const UserList = () => {
  const { userList, status, total } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const { page } = Object.fromEntries([...searchParams]);
    dispatch(getlist(page));
  }, [dispatch, searchParams]);

  const rowLink = (field) => (user) => {
    const params = { id: user.id };
    return (
      <Link
        to={`/panel/user-detail?${createSearchParams(params)}`}
        className="no-underline"
      >
        {user[field]}
      </Link>
    );
  };

  const columns = [
    {
      path: "id",
      label: "ID",
      content: rowLink("id"),
    },
    { path: "email", label: "Email", content: rowLink("email") },
    { path: "first_name", label: "FirstName", content: rowLink("first_name") },
    { path: "last_name", label: "LastName", content: rowLink("last_name") },
    {
      key: "avatar",
      content: (user) => <Image src={user.avatar} thumbnail />,
    },
    {
      key: "edit",
      content: (user) => {
        const params = { id: user.id };
        return (
          <button
            onClick={() =>
              navigate(`/panel/user-edit?${createSearchParams(params)}`)
            }
            className="btn btn-outline-dark btn-sm"
          >
            <span className="fa fa-pencil"></span>
          </button>
        );
      },
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
  return (
    <List
      status={status}
      columns={columns}
      list={userList}
      itemCounts={total}
    />
  );
};

export default UserList;
