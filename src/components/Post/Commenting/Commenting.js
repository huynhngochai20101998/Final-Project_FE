import http from "core/services/httpService";
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import "./Commenting.scss";

const Commenting = () => {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    async function getDataList() {
      try {
        const response = await http.get("");
        setCommentList(response.data.data);
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
      {commentList.map((comments) => {
        console.log(comments);
        <div className="Commenting__list" key={comments.id}>
          <img src={comments.image} />
          <div className="Commenting__list__frame">
            <span>{comments.userName}</span>
            <p>{comments.comments}</p>
          </div>
        </div>;
      })}
    </div>
  );
};

export default Commenting;
