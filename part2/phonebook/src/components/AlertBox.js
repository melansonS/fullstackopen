import React from "react";

const AlertBox = ({ message, error }) => {
  if (message === null) return null;
  return <div className={`alert-box ${error ? "error" : ""}`}>{message}</div>;
};

export default AlertBox;
