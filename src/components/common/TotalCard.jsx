import React from "react";

const TotalCard = (props) => {
  const { title, icon, value } = props;
  return (
    <div className="shadow-sm card border-light col-sm-4">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-around mb-3">
          <span className={`fa fa-3x fa-${icon}`}></span>
          <div className="d-flex flex-column  align-items-center">
            <h5>{title}</h5>
            <h3 className="mb-1">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCard;
