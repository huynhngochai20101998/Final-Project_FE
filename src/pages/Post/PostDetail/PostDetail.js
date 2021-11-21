import React, { useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";

import ImgAvatar from "../../../assets/images/user-avatar.png";
import IconVote from "../../../assets/icons/vote-star.svg";

import "./PostDetail.scss";
import Schedule from "../../../components/Post/Schedule/Schedule";
import { moveHome } from "store/post";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const PostDetail = () => {
  return (
    <HomeLayout>
      <div className="post-detail-container">
        <PostDetailContent />
      </div>
    </HomeLayout>
  );
};

export const PostDetailContent = () => {
  const [report, setReport] = useState(false);
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const postCurrent = JSON.parse(localStorage.getItem("postCurrent"));

  return (
    <div className="post-detail">
      <div className="post-detail__header d-flex justify-content-between">
        <div className="post-detail__header-start">
          <a href="#" className="user d-flex flex-row">
            <div className="user-avatar">
              <img src={ImgAvatar} alt="" className="img" />
            </div>
            <div className="user-name">
              <p className="text m-0 p-0">
                {`${userInfo.first_name} ${userInfo.last_name}` || ""}
              </p>
              <p className="text-white tr">
                {moment(postCurrent.created_at).format("DD/MM/YYYY") || ""}
              </p>
            </div>
          </a>
        </div>
        <div className="post-detail__header-end d-flex align-items-center pt-1">
          <div className="report mx-2 d-flex justify-content-center  align-items-center">
            <i
              className="fas fa-flag icon-report"
              style={
                postCurrent.reported ? { color: "red" } : { color: "white" }
              }
              onClick={() => setReport(!report)}
            />
          </div>
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
      <div className="post-detail__body d-flex flex-column justify-content-center ">
        <div className="content">
          <h4 className="content__title no-gutters">
            <p>{postCurrent.title}</p>
          </h4>
          <p className="content__topic">{`#${postCurrent.topic_id}`}</p>
          <span className="content__require-member">
            <p className="content__require-member-label">
              {`Yêu cầu thành viên :  ${postCurrent.members} Nguời`}
            </p>
          </span>
          <div className="content__text">
            <p>{postCurrent.content}</p>
          </div>
        </div>
        <div className="schedule d-flex justify-content-center">
          {userInfo ? (
            <Schedule />
          ) : (
            <div>
              <Link exact to="/login" className="text-white fs-6">
                Đăng Nhập để có thể đăng ký tham gia nhóm
              </Link>
            </div>
          )}
        </div>
      </div>
      <button
        className="float-end btn btn-info me-2"
        onClick={() => {
          dispatch(moveHome());
        }}
      >
        Hoàn Tất
      </button>
    </div>
  );
};

export default PostDetail;
