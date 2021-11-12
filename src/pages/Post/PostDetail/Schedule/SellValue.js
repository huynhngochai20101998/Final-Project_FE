import React, { useState } from "react";

import "./Sell.scss";

const SellValue = (props) => {
  const [valueSchedule, setValueSchedule] = useState(false);

  const valueSell = {
    post_id: 1,
    day_id: parseInt(props.dayID),
    time_id: parseInt(props.timeID),
    value: valueSchedule ? 1 : 0
  };

  const clickCheckBox = () => {
    console.log("alo");
    setValueSchedule(!valueSchedule);
  };

  console.log(valueSell);

  return (
    <div className="sell">
      <input type="checkbox" id="scheduleCheckbox" onClick={clickCheckBox} />
    </div>
  );
};

export default SellValue;
