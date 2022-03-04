import React from "react";
import Table from "./Table";

const List = (props) => {
  const { status, columns, list } = props;

  let content;
  if (status === "loading")
    content = <span className="spinner-border spinner-border-sm"></span>;
  else if (status === "succeeded" && list.length !== 0)
    content = <Table columns={columns} data={list} />;
  else content = <span>There is no data!</span>;

  return (
    <div className="table-responsive shadow-sm card border-light col-sm-8">
      {content}
    </div>
  );
};

export default List;
