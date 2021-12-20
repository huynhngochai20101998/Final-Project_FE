import { React, useState } from "react";
import "./Modal.scss";
import { useHistory } from "react-router-dom";
import http from "core/services/httpService";
function Modal(props) {
  const [checkConfirm, setCheckConfirm] = useState(true);
  const history = useHistory();

  const handleDeltePost = () => {
    http
      .delete(`api/posts/${props.pathId}`)
      .then(() => {
        setCheckConfirm(false);
        history.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelDelete = () => {
    setCheckConfirm(false);
    props.isConfirm();
  };

  return (
    <div className="modal-container">
      <div
        className={!checkConfirm ? "modal fade" : "active"}
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Cảnh báo
              </h5>
            </div>
            <div className="modal-body">
              Bài viết bị xoá sẽ không thể khôi phục. Bạn thực sự muốn xoá bài
              viết?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleCancelDelete}
              >
                Huỷ
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeltePost}
              >
                Xoá bài viết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
