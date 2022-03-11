import React from "react";
import { get } from "lodash";
import { useNavigate, createSearchParams } from "react-router-dom";

const Table = (props) => {
  const { columns, data, trLink } = props;
  const navigate = useNavigate();

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
          <tr
            key={item.id}
            onClick={() => {
              if (trLink)
                navigate(`${trLink}?${createSearchParams({ id: item.id })}`);
            }}
            className="clickable"
          >
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
