import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
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
    topic_name,
    profile_image_url,
    user_id
    // active
  } = props.post;
  const history = useHistory();
  const fullName = first_name + " " + last_name;
  const handleToPersonalPage = () => {
    history.push(`/personal-info-user/${user_id}`);
  };

  return (
    <div className="PostList__form">
      <div className="PostList__form__info-user">
        <div>
          <img src={profile_image_url} onClick={handleToPersonalPage} />
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
        <p className="topic">{topic_name}</p>
        <Button
          onClick={() => {
            localStorage.setItem(
              "postCreationId",
              JSON.stringify(props.post.id)
            );

            window.location.href = `/post-details/${slug}.${id}`;
          }}
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
}

export default PostList;
