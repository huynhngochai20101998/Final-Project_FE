import React from "react";
import "./Sell.scss";

const SellValue = (props) => {
  //   const [valueSchedule, setValueSchedule] = useState(false);

  return (
    <div className="sell" style={props.style}>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
    </div>
  );
};

export default SellValue;