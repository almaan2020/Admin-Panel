import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getResource } from "../../../store/slices/resourceSlice";

const ResDetail = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { resourceInfo } = useSelector((state) => state.resource);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const { id } = Object.fromEntries([...searchParams]);
    dispatch(getResource(id));
    setLoading(false);
  }, [dispatch, searchParams]);

  return (
    <div className="shadow-sm card border-light col-sm-8">
      {loading && <span className="spinner-border spinner-border-sm"></span>}
      {!loading && resourceInfo.data && (
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-around mb-3">
            <div className="d-flex flex-column justify-content-between">
              <div className="p-2 fw-bold">{resourceInfo.data.name}</div>
              <div className="p-2">Year:&nbsp;{resourceInfo.data.year}</div>
              <div className="p-2 fst-italic">
                Site:&nbsp;{resourceInfo.support.url}
              </div>
              <div className="p-2 text-secondary">
                {resourceInfo.support.text}
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "8px",
                  backgroundColor: `${resourceInfo.data.color}`,
                }}
              />
              <br></br>
              <div className="p-2">{resourceInfo.data.pantone_value}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResDetail;
