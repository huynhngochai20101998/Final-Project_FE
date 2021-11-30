import React from "react";
import "./NoResult.scss";
import noresult from "../../assets/images/no-results.png";

function NoResult() {
  return (
    <div id="noResult">
      <img src={noresult}></img>
      <div className="noResult">
        <h2>Không tìm thấy kết quả hãy thử tạo bài viết</h2>
      </div>
    </div>
  );
}

export default NoResult;
