import React from "react";
import "./Sell.scss";

const SellTimeName = (props) => {
  return (
    <div className="sell" style={props.style}>
      <div className="sell-content">{props.values}</div>
    </div>
  );
};

export default SellTimeName;
