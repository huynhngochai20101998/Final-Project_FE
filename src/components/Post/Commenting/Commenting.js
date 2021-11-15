import http from "core/services/httpService";
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import "./Commenting.scss";

const Commenting = () => {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    async function getDataList() {
      try {
        const response = await http.get("/api/comments");
        setCommentList(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getDataList();
  }, []);
  return (
    <div className="Commenting">
      <div className="Commenting__input">
        <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
        <Input />
        <button>Gửi</button>
      </div>
      {commentList.map((comment) => {
        <div className="Commenting__list" key={comment.id}>
          <img src={comment.user.image} />
          <div className="Commenting__list__frame">
            <span>
              {comment.user.first_name} {comment.user.last_name}
            </span>
            <p>{comment.content}</p>
          </div>
        </div>;
      })}
    </div>
  );
};

export default Commenting;
