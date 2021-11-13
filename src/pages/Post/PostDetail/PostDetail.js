import React, { useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";

import ImgAvatar from "../../../assets/images/user-avatar.png";
import IconVote from "../../../assets/icons/vote-star.svg";

import "./PostDetail.scss";
import Schedule from "./Schedule/Schedule";

const PostDetail = () => {
  const [report, setReport] = useState(false);

  const userInfo = {
    userAvatar: ImgAvatar,
    userName: "Nguyễn Ngọc Dũng"
  };

  const valuePost = {
    postTitle: "Tìm nhóm cùng học javascript",
    postTopic: "javascript",
    requireMember: 5,
    reported: report,
    rating: 5,
    createAt: "15/10/2021",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedarcu nunc sagittis ornare a convallisalesuada egestas duis nonut. Vel est bibendum etiam ornare. iaculis nunc luctus. Netustellus sapien vitae, arcu et volutpat integer arcu."
  };

  return (
    <HomeLayout>
      <div className="post-detail-container">
        <div className="post-detail">
          <div className="post-detail__header d-flex justify-content-between">
            <div className="post-detail__header-start">
              <a href="#" className="user d-flex flex-row">
                <div className="user-avatar">
                  <img src={userInfo.userAvatar} alt="" className="img" />
                </div>
                <div className="user-name">
                  <p className="text m-0 p-0">{userInfo.userName}</p>
                  <p className="text-white tr">{valuePost.createAt}</p>
                </div>
              </a>
            </div>
            <div className="post-detail__header-end d-flex align-items-center pt-1">
              <div className="report mx-2 d-flex justify-content-center  align-items-center">
                <i
                  className="fas fa-flag icon-report"
                  style={
                    valuePost.reported ? { color: "red" } : { color: "white" }
                  }
                  onClick={() => setReport(!report)}
                />
              </div>
              <div className="vote d-flex flex-row justify-content-center align-items-center">
                <div className="vote-icon d-flex flex-row justify-content-center align-items-center">
                  <img src={IconVote} className="icon mx-2" alt="" />
                </div>
                <div className="vote-quantity mx-1 fs-3 text-white po">
                  {valuePost.rating}
                </div>
              </div>
            </div>
          </div>
          <div className="post-detail__body d-flex flex-column justify-content-center ">
            <div className="content">
              <h4 className="content__title no-gutters">
                <p>{valuePost.postTitle}</p>
              </h4>
              <p className="content__topic">{`#${valuePost.postTopic}`}</p>
              <span className="content__require-member">
                <p className="content__require-member-label">
                  {`Yêu cầu thành viên :  ${valuePost.requireMember} Nguời`}
                </p>
              </span>
              <div className="content__text">
                <p>{valuePost.content}</p>
              </div>
            </div>
            <div className="schedule d-flex justify-content-center">
              <Schedule />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default PostDetail;
