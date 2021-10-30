import React from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import { Link } from "react-router-dom";

import imgAvatar from "../../../assets/images/avatar.svg";
import imgSchedule from "../../../assets/images/schedule.svg";

import "./PostDetail.scss";

const PostDetail = () => {
  return (
    <HomeLayout>
      <div className="post-detail">
        <h2>Post Detail</h2>
        <div className="post-detail__header">
          <div className="post-detail__header-start">
            <Link to="#" className="avatar">
              <img src={imgAvatar} className="img" />
            </Link>
          </div>
          <div className="post-detail__header-end">
            <img src={imgSchedule} alt="" />
          </div>
        </div>
        <div className="post-detail__body"></div>
      </div>
    </HomeLayout>
  );
};

export default PostDetail;
