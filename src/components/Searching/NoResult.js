import React from "react";
import "./NoResult.scss";
import noresult from "../../assets/images/no-result.png";

function NoResult() {
  return (
    <div id="noResult">
      <img src={noresult}></img>
      <div className="noResult">
        <h2>Không thấy kết quả tìm kiếm</h2>
      </div>
    </div>
  );
}

export default NoResult;
