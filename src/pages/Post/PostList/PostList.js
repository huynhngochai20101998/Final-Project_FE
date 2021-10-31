import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
// import Axios from "axios";
import http from "core/services/httpService";
import "./PostList.scss";
import { Link } from "react-router-dom";
export default function PostList() {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    async function getDataList() {
      try {
        const response = await http.get("/api/posts");
        setPostList(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getDataList();
  }, []);

  return (
    <div className="PostList">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <div className="PostList__add">
              <Link to="/post-create">
                <button className="PostList__add-post">
                  <i className="fas fa-plus" aria-hidden="true"></i> Tạo bài
                  viết
                </button>
              </Link>
            </div>
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
                    <h5>{post.title}</h5>
                    <p>Số lượng thành viên {post.members} người</p>
                    <p>{post.content}</p>
                  </div>
                  <div className="PostList__form__see-more">
                    <Button>Xem thêm</Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4"></div>
        </div>
      </div>
    </div>
  );
}
