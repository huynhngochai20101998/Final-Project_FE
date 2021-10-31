import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Axios from "axios";
import "./PostList.scss";
export default function PostList() {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    async function getDataList() {
      try {
        const api = Axios.create({
          baseURL: "http://localhost:3000"
        });
        const response = await api.get(`/posts`);
        setPostList(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getDataList();
  }, []);

  return (
    <div className="PostList">
      {postList.map((post) => {
        return (
          <div className="PostList__form" key={post.id}>
            <div className="PostList__form__info-user">
              <div>
                <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
                <p>Nguyễn Dũng</p>
              </div>
              <div>20/10/2021</div>
            </div>
            <div className="PostList__form__info-post">
              <h5>{post.topic}</h5>
              <p>Số lượng thành viên {post.numberMember} người</p>
              <p>{post.content}</p>
            </div>
            <div className="PostList__form__see-more">
              <Button>Xem thêm</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
