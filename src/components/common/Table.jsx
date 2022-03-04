import React from "react";
import { get } from "lodash";

const Table = (props) => {
  const { columns, data } = props;

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return get(item, column.path);
  };

  const createKey = (item, column) => {
    return item.id + (column.key || column.path);
  };

  return (
    <table className="table align-middle table-striped ">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.path || column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
