import React from "react";
import { Button } from "reactstrap";

export default function PostList() {
  return (
    <div className="PostList">
      <div className="PostList__form">
        <div className="PostList__form__info-user">
          <div>
            <img src="" />
            <p>Nguyễn Dũng</p>
          </div>
          <div>20/10/2021</div>
        </div>
        <div className="PostList__form__info-post">
          <h4>Tìm nhóm học chung JS</h4>
          <p>Số lượng thành viên 5 người</p>
          <p>abc</p>
        </div>
        <Button>Xem thêm</Button>
      </div>
    </div>
  );
}
