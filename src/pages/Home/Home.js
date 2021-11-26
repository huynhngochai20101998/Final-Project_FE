import HomeLayout from "layout/HomeLayout/HomeLayout";
import moment from "moment";
import "./Home.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import ListView from "./ListView";
function PostView(post) {
  return (
    <div className="PostList__form" key={post.id}>
      <div className="PostList__form__info-user">
        <div>
          <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
          <span>Nguyễn Dũng</span>
        </div>
        <div>{moment(post.created_at).format("DD/MM/YYYY")}</div>
      </div>
      <div className="PostList__form__info-post">
        <h5>{post.title}</h5>
        <p>Số lượng thành viên {post.members} người</p>
        <p>{post.content}</p>
      </div>
      <div className="PostList__form__see-more">
        <Link to={`/post-details/${post.slug}.${post.id}`}>
          <Button>Xem thêm</Button>
        </Link>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <HomeLayout>
      <ListView postView={PostView} />
    </HomeLayout>
  );
}
