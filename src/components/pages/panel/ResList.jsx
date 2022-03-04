import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getlist } from "../../../store/slices/resourceSlice";
import List from "../../common/List";

const ResList = () => {
  const dispatch = useDispatch();
  const { resourceList, status } = useSelector((state) => state.resource);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getlist());
    }
  }, [dispatch, status]);

  const columns = [
    { path: "id", label: "ID" },
    { path: "name", label: "Name" },
    { path: "year", label: "Year" },
    { path: "color", label: "Color" },
    { path: "pantone_value", label: "Pantone" },
    {
      key: "colorDiv",
      content: (resource) => (
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: `${resource.color}`,
          }}
        />
      ),
    },
  ];

  return <List status={status} columns={columns} list={resourceList} />;
};

export default ResList;
