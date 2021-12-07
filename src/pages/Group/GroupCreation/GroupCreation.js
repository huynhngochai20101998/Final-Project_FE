import React, { useEffect, useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import "./GroupCreation.scss";

import IconVote from "../../../assets/icons/vote-star.svg";
import moment from "moment";
import InfoMemberItem from "./InfoMemberItem";
import Schedule from "components/Post/Schedule/Schedule";
import { useDispatch } from "react-redux";
import http from "core/services/httpService";
import { setLoading } from "store/post";
import { useParams } from "react-router";
import { createGroup } from "store/group";

const GroupCreation = () => {
  const dispatch = useDispatch();
  const [myPostDetail, setMyPostDetail] = useState();
  const [registerMember, setRegisterMember] = useState([]);
  const [nameGroup, setNameGroup] = useState();

  const myInfor = JSON.parse(localStorage.getItem("user"));

  const path = useParams();
  useEffect(() => {
    async function getPostDetail() {
      try {
        dispatch(setLoading({ loading: true }));

        const res = await http.get(`/api/posts/${path.id}`);
        dispatch(setLoading({ loading: false }));

        setMyPostDetail(res.data);

        setRegisterMember(res.data.registered_members);

        setNameGroup(res.data.title);
      } catch (err) {
        return null;
      }
    }

    getPostDetail();
  }, []);

  const onCreateGroup = () => {
    const postId = path.id;
    dispatch(createGroup({ postId, nameGroup }));
  };

  const listMember = registerMember?.map((item, index) => {
    if (JSON.parse(localStorage.getItem("user")).id == item.user_id) {
      return null;
    }
    return <InfoMemberItem key={index} member={item.user_id} />;
  });

  return (
    <HomeLayout>
      <div className="group-wrapper ">
        <div className="group-creation">
          <div className="group-creation__header d-flex justify-content-between">
            <div className="group-creation__header-start">
              <a href="#" className="user d-flex flex-row">
                <div className="user-avatar">
                  <img src={myInfor.profile_image_url} alt="" className="img" />
                </div>
                <div className="user-name">
                  <p className="text m-0 p-0">{`Tamaumi KIS` || ""}</p>
                  <p className="text-white tr">
                    {moment(myPostDetail?.created_at || "").format(
                      "DD/MM/YYYY"
                    ) || ""}
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
            <div className="row ms-4 ">
              {/* <div className="col-1"></div> */}
              <div className="name-group  mb-3 ms-4 col-3">
                <label
                  htmlFor="name"
                  className="name-group-label text-white mb-2"
                  style={{ width: "120px", margin: "auto" }}
                >
                  Tên nhóm:
                </label>
                <input
                  id="name"
                  name="name-group"
                  className="lastName-input text-white border-0 d-inline"
                  type="text"
                  style={{
                    backgroundColor: "#696d97",
                    boxShadow: "none",
                    borderRadius: "5px",
                    padding: "2px 5px",
                    fontSize: "15px"
                  }}
                  onChange={() => {
                    setNameGroup(document.getElementById("name").value);
                  }}
                />
              </div>
            </div>
            <div className="group-creation__body-content">
              <div className="content-table">
                <div className="content-table-column column-name">Tên</div>
                <div className="content-table-column column-age">Tuổi</div>
                <div className="content-table-column column-intro">
                  Giới Thiệu
                </div>
                <div className="content-table-column column-btn-delete">
                  Xóa
                </div>
              </div>
              {listMember}
            </div>
            <div className="schedule">
              <Schedule onDisable={true} />
            </div>
            <div className="box-btn">
              <div
                className="btn btn-info btn-create-group"
                onClick={onCreateGroup}
              >
                Tạo Nhóm
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default GroupCreation;
