import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSchedule } from "store/post";

import "./Sell.scss";

const SellValue = (props) => {
  const dispatch = useDispatch();
  const [valueSchedule, setValueSchedule] = useState(true);

  const postCurrent = JSON.parse(localStorage.getItem("postCurrent"));

  const valueSell = {
    post_id: postCurrent?.id,
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
        // disabled={props.disabled}
        // checked={props.checked}
        onClick={clickCheckBox}
      />
    </div>
  );
};

export default SellValue;
