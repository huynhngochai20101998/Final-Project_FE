import React, { useState, useEffect } from "react";
import "./infoMemberItem.scss";
import { setLoading } from "store/post";
import { useDispatch } from "react-redux";
import http from "core/services/httpService";
import moment from "moment";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { removeMember } from "store/group";

const InfoMemberItem = (props) => {
  const memberID = props.member;
  const [member, setMember] = useState();
  const dispatch = useDispatch();
  const path = useParams();

  useEffect(() => {
    async function getMember() {
      dispatch(setLoading({ loading: true }));

      const res = await http.get(`/api/profile/user/${memberID}`);

      dispatch(setLoading({ loading: false }));

      if (res.success) {
        setMember(res.data);
      }
    }

    getMember();
  }, []);

  const removeMemberPost = () => {
    const postId = path.id;

    dispatch(removeMember({ memberID, postId }));
  };

  return (
    <div className="content-item grid-container">
      <div className="content-item-column item-name">
        <Link to={`/personal-info-user/${member?.id}`} className="link-user">
          {`${member?.first_name} ${member?.last_name}`}
        </Link>
      </div>{" "}
      <div className="content-item-column item-age">
        {moment(member?.birthday, "MM/DD/YYYY").fromNow()}
      </div>
      <div className="content-item-column item-intro">
        {member?.description}
      </div>
      <div className="content-item-column item-delete">
        <div className="btn-delete" onClick={removeMemberPost}>
          <i className="fas fa-times" />
        </div>
      </div>
    </div>
  );
};

export default InfoMemberItem;
