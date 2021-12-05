import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "store/post";

import "./Sell.scss";

const SellValue = (props) => {
  const dispatch = useDispatch();
  const [valueSchedule, setValueSchedule] = useState(true);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [idSchedule, setIdSchedule] = useState();

  const valueSell = {
    post_id: JSON.parse(localStorage.getItem("postCreationId")),
    day_id: parseInt(props.dayID),
    time_id: parseInt(props.timeID),
    value: valueSchedule
  };

  const clickCheckBox = async () => {
    setValueSchedule(!valueSchedule);

    try {
      dispatch(setLoading({ loading: true }));

      const res = await http.post("/api/schedules", valueSell);
      dispatch(setLoading({ loading: false }));

      if (res.success) {
        setCheckSuccess(true);
        setIdSchedule(res.data.id);
        pushToast("success", res.message);
      } else {
        setCheckSuccess(false);
        pushToast("error", "Trùng thời gian!");
      }
    } catch (e) {
      setCheckSuccess(false);
      pushToast("error", "Trùng thời gian!");
    }

    // dispatch(addSchedule(valueSell));
  };

  const deleteCheck = async () => {
    try {
      if (checkSuccess) {
        const res = await http.delete(`/api/schedules/${idSchedule}`);
        if (res.success) {
          setCheckSuccess(false);
          pushToast("success", "xoa lich thanh cong");
        }
      }
    } catch (e) {
      pushToast("warn", "thất bại");
    }
  };

  return (
    <div className="sell" style={props.style}>
      <input
        type="checkbox"
        id="scheduleCheckbox"
        disabled={props.disabled}
        checked={checkSuccess}
        onClick={checkSuccess ? deleteCheck : clickCheckBox}
      />
    </div>
  );
};

export default SellValue;
