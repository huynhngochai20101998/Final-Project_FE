import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pushToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case "warn":
      toast.warn(message, {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case "info":
      toast.info(message, {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    default:
      toast(message);
  }
};

const Toast = () => {
  return (
    <ToastContainer hideProgressBar autoClose={3000} closeOnClick={false} />
  );
};

export default Toast;
export { pushToast };
