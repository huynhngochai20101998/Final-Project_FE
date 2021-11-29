import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
function PostList(props) {
  const {
    created_at,
    title,
    slug,
    id,
    members,
    content,
    first_name,
    last_name,
    profile_image_url
  } = props.post;
  const fullName = first_name + " " + last_name;
  return (
    <div className="PostList__form">
      <div className="PostList__form__info-user">
        <div>
          <img src={profile_image_url} />
          <span>{fullName}</span>
        </div>
        <div>{moment(created_at).format("DD/MM/YYYY")}</div>
      </div>
      <div className="PostList__form__info-post">
        <h5>{title}</h5>
        <p>Số lượng thành viên {members} người</p>
        <p>{content}</p>
      </div>
      <div className="PostList__form__see-more">
        <Link to={`/post-details/${slug}.${id}`}>
          <Button>Xem thêm</Button>
        </Link>
      </div>
    </div>
  );
}

export default PostList;
