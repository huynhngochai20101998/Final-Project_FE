import React from "react";
import { Input } from "reactstrap";
import "./Commenting.scss";

const Commenting = () => {
  return (
    <div className="Commenting">
      <div className="Commenting__input">
        <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
        <Input />
        <button>Gửi</button>
      </div>
      <div className="Commenting__list">
        <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
        <div className="Commenting__list__frame">
          <span>Nguyễn Dũng</span>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab ea a,
            illum optio vero error excepturi nam tenetur consequuntur est quae
            pariatur praesentium itaque. Dicta rem fugit et provident corporis?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Commenting;
