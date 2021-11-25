import React from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import WhiteBoard from "../../components/Whiteboard";
import "./Room.scss";
export default function RoomChat() {
  return (
    <HomeLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <div className="white-board">
              <div className="white-board__host">
                <h6>JavaScript</h6>
                <h6>Nguyễn Dũng</h6>
              </div>
              <WhiteBoard />
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4"></div>
        </div>
      </div>
    </HomeLayout>
  );
}
