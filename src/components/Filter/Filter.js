import { React, useState, useEffect } from "react";
import http from "core/services/httpService";
import { Link } from "react-router-dom";
import "./Filter.scss";
const Filter = () => {
  const [listTopic, setListTopic] = useState([]);

  useEffect(() => {
    async function getTopic() {
      try {
        const response = await http.get("api/topics");
        let newListTopic = response.data.data;
        setListTopic(newListTopic);
      } catch (error) {
        console.log(error);
      }
    }
    getTopic();
  }, []);

  let x = document.getElementsByClassName("link-filter");
  const handleClick = (e) => {
    Array.from(x).forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  };

  const topics = listTopic.map((topic) => {
    return (
      <li key={topic.id}>
        <Link
          to={`/home?topic=${topic.id}`}
          className="link-filter"
          onClick={(e) => handleClick(e)}
        >
          {topic.name}
        </Link>
        <span className="number-post">{topic.post_count}</span>
      </li>
    );
  });

  const countTotalPost = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].post_count;
    }
    return sum;
  };

  return (
    <div className="search-filter-component">
      <div className="container">
        <h2>CHỦ ĐỀ</h2>
        <ul>
          <li>
            <Link
              to={`/home`}
              className="link-filter active"
              onClick={(e) => handleClick(e)}
            >
              Tất cả
            </Link>
            <span className="number-post">{countTotalPost(listTopic)}</span>
          </li>
          {topics}
        </ul>
      </div>
    </div>
  );
};
export default Filter;
