import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSchedule } from "store/post";

import "./Sell.scss";

const SellValue = (props) => {
  const dispatch = useDispatch();
  const [valueSchedule, setValueSchedule] = useState(true);

  const valueSell = {
    post_id: JSON.parse(localStorage.getItem("postCreationId")),
    day_id: parseInt(props.dayID),
    time_id: parseInt(props.timeID),
    value: valueSchedule
  };

  const clickCheckBox = () => {
    setValueSchedule(!valueSchedule);

    dispatch(addSchedule(valueSell));
  };

  return (
    <div className="sell" style={props.style}>
      <input
        type="checkbox"
        id="scheduleCheckbox"
        disabled={props.disabled}
        // checked={props.checked}
        onClick={clickCheckBox}
      />
    </div>
  );
};

export default SellValue;
