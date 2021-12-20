import React, { useEffect, useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import IconVote from "../../../assets/icons/vote-star.svg";
import "./PostDetail.scss";
import Schedule from "../../../components/Post/Schedule/Schedule";
import { createCompletionPost } from "store/post";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useParams } from "react-router";
import http from "core/services/httpService";
import Commenting from "components/Post/Commenting/Commenting";
import Loading from "components/Loading/Loading";
import Modal from "./Modal.js";
const PostDetail = () => {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const path = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [userPost, setUserPost] = useState({});
  const [topic, setTopic] = useState();
  const [report, setReport] = useState(false);
  const [postCurrent, setPostCurrent] = useState({});
  const [myPost, setMyPost] = useState(false);
  // const myInfor = JSON.parse(localStorage.getItem("user"));

  const userIdPost = postCurrent.user_id;
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(async () => {
    await http.get(`/api/posts/${path.id}`).then((res) => {
      setPostCurrent(res.data);

      if (res.success) {
        if (res.data?.user_id == userId) {
          setMyPost(true);
        }

        http.get(`/api/profile/user/${res?.data?.user_id}`).then((resB) => {
          setUserPost(resB?.data);
        });

        http.get(`/api/topics/${res.data.topic_id}`).then((resC) => {
          if (resC.success) {
            setTopic(resC.data);
          }
        });
      }
      setIsLoading(!isLoading);
    });
  }, []);

  const logConfirmDelete = () => {
    setIsDelete(true);
  };

  const isConfirm = () => {
    setIsDelete(false);
  };

  return (
    <HomeLayout>
      <div className="post-detail-container">
        {isDelete ? <Modal pathId={path.id} isConfirm={isConfirm}></Modal> : ""}
        {isLoading ? (
          <Loading visible={isLoading} />
        ) : (
          <div className="post-detail-container">
            <div className="post-detail">
              <div className="post-detail__header d-flex justify-content-between">
                <div className="post-detail__header-start">
                  <a href="#" className="user d-flex flex-row">
                    <div className="user-avatar">
                      <img
                        src={userPost.profile_image_url}
                        alt=""
                        className="img"
                      />
                    </div>
                    <div className="user-name">
                      <p className="text m-0 p-0">
                        {`${userPost?.first_name} ${userPost.last_name}` ||
                          "Unknown"}
                      </p>
                      <p className="text-white tr">
                        {moment(postCurrent.created_at).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </a>
                </div>
                <div className="post-detail__header-end d-flex align-items-center pt-1">
                  <div className="report mx-2 d-flex justify-content-center  align-items-center">
                    <i
                      className="fas fa-flag icon-report"
                      style={
                        postCurrent.reported
                          ? { color: "red" }
                          : { color: "white" }
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
                  {userId === userIdPost ? (
                    <div
                      className="dots d-flex flex-row justify-content-center align-items-center"
                      onClick={logConfirmDelete}
                    >
                      <div className="dots-icon d-flex flex-row justify-content-center align-items-center">
                        <i className="fas fa-trash-alt icon mx-2"></i>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="post-detail__body d-flex flex-column justify-content-center ">
                <div className="content">
                  <h4 className="content__title no-gutters">
                    <p>{postCurrent.title}</p>
                  </h4>
                  <p className="content__topic">{`#${topic?.name}`}</p>
                  <span className="content__require-member">
                    <p className="content__require-member-label">
                      {`Yêu cầu thành viên :  ${postCurrent.members} Nguời`}
                    </p>
                  </span>
                  <div className="content__text">
                    <p>{postCurrent.content}</p>
                  </div>
                </div>
                <div className="schedule d-flex justify-content-center align-items-center">
                  <Schedule userIdPost={postCurrent.user_id} myPost={myPost} />
                  {userIdPost == userId && (
                    <span
                      className="next-step"
                      onClick={() => {
                        history.push(
                          `/post-details/create-groups/${path.slug}.${postCurrent.id}`
                        );
                      }}
                    >
                      <i className="fas fa-arrow-right fs-3 text-info icon-next"></i>
                    </span>
                  )}
                </div>
              </div>
              <button
                className="float-end post-detail__finish btn-info"
                onClick={() => {
                  dispatch(createCompletionPost());
                }}
              >
                Hoàn Tất
              </button>
              <Commenting />
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default PostDetail;
