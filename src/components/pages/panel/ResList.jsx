import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getlist } from "../../../store/slices/resourceSlice";
import List from "../../common/List";

const ResList = () => {
  const dispatch = useDispatch();
  const { resourceList, status, total } = useSelector(
    (state) => state.resource
  );

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const { page } = Object.fromEntries([...searchParams]);
    dispatch(getlist(page));
  }, [dispatch, searchParams]);

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
            width: "14px",
            height: "14px",
            borderRadius: "4px",
            backgroundColor: `${resource.color}`,
          }}
        />
      ),
    },
  ];

  return (
    <List
      status={status}
      columns={columns}
      list={resourceList}
      itemCounts={total}
      trLink={"/panel/resource-detail"}
    />
  );
};

export default ResList;
