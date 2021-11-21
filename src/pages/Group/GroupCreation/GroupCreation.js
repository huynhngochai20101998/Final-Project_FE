import HomeLayout from "layout/HomeLayout/HomeLayout";
import React from "react";
import "./GroupCreation.scss";

import ImgAvatar from "../../../assets/images/user-avatar.png";
import IconVote from "../../../assets/icons/vote-star.svg";
import moment from "moment";
import InfoMemberItem from "./InfoMemberItem";
import Schedule from "components/Post/Schedule/Schedule";

const GroupCreation = () => {
  return (
    <HomeLayout>
      <div className="group-wrapper ">
        <div className="group-creation">
          <div className="group-creation__header d-flex justify-content-between">
            <div className="group-creation__header-start">
              <a href="#" className="user d-flex flex-row">
                <div className="user-avatar">
                  <img src={ImgAvatar} alt="" className="img" />
                </div>
                <div className="user-name">
                  <p className="text m-0 p-0">{`Tamaumi KIS` || ""}</p>
                  <p className="text-white tr">
                    {moment("20/10/2021").format("DD/MM/YYYY") || ""}
                  </p>
                </div>
              </a>
            </div>
            <div className="group-creation__header-end d-flex align-items-center pt-1">
              <div className="vote d-flex flex-row justify-content-center align-items-center">
                <div className="vote-icon d-flex flex-row justify-content-center align-items-center">
                  <img src={IconVote} className="icon mx-2" alt="" />
                </div>
                <div className="vote-quantity mx-1 fs-3 text-white po">
                  {/* {postCurrent.rating} */}3
                </div>
              </div>
            </div>
          </div>
          <div className="group-creation__body d-flex justify-content-center">
            <div className="group-creation__body-content">
              <div className="content-table">
                <div className="content-table-column column-name">Tên</div>
                <div className="content-table-column column-age">Tuổi</div>
                <div className="content-table-column column-intro">
                  Giới Thiệu
                </div>
                <div className="content-table-column column-schedule">
                  Lịch Học
                </div>
                <div className="content-table-column column-btn-delete">
                  Xóa
                </div>
              </div>
              <InfoMemberItem />
            </div>
            <div className="schedule">
              <Schedule />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default GroupCreation;
