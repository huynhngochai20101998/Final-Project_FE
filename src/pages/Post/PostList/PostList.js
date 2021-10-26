import React from "react";
import { Button } from "reactstrap";

import "./PostList.scss";
export default function PostList() {
  return (
    <div className="PostList">
      <div className="PostList__form">
        <div className="PostList__form__info-user">
          <div>
            <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
            <p>Nguyễn Dũng</p>
          </div>
          <div>20/10/2021</div>
        </div>
        <div className="PostList__form__info-post">
          <h5>Tìm nhóm học chung JS</h5>
          <p>Số lượng thành viên 5 người</p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry Lorem Ipsum has been the industryss standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="PostList__form__see-more">
          <Button>Xem thêm</Button>
        </div>
      </div>
    </div>
  );
}
