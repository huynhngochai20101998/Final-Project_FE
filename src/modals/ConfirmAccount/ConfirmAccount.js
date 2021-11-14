import React from "react";
import { Modal } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { sendEmailConfirmAcc } from "store/user";
import "./ConfirmAccount.scss";

const ConfirmAccount = ({ isShowing, toggle }) => {
  // const dispatch = useDispatch();

  // const tokenConfirm = localStorage.getItem("tokenConfirmAcc");

  const handleSend = () => {
    // dispatch(sendEmailConfirmAcc(tokenConfirm));
    toggle();
  };

  return (
    <Modal
      show={isShowing}
      onHide={toggle}
      dialogClassName="modal-confirm-account no-gutters"
      centered
    >
      <Modal.Body>
        <p className="text text-white">
          Tài khoản của bạn chưa được kích hoạt, vui lòng kiểm tra email. Nếu
          không nhận được email kích hoạt, hãy yêu cầu gửi lại.
        </p>
        <div className="d-flex flex-row content justify-content-between">
          <button className="btn btn-info" onClick={toggle}>
            Hủy
          </button>
          <button
            className="btn btn-info btn-send"
            onClick={() => handleSend()}
          >
            Gửi Email
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmAccount;
