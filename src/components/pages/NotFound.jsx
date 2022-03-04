import React from "react";
import { toast } from "react-toastify";
import toasts from "../../config/toast.js";

const NotFound = (props) => {
  const { message } = props;
  const { notFoundToast } = toasts;

  return (
    <div className="text-center">
      <h1>{message}</h1>
      <div className="d-none">{toast.info(notFoundToast)}</div>
    </div>
  );
};

export default NotFound;
