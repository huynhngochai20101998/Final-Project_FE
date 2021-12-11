import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "store/post";

import "./SellCreation.scss";

const SellValueCreation = (props) => {
  const dispatch = useDispatch();
  const [valueSchedule, setValueSchedule] = useState(true);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [idSchedule, setIdSchedule] = useState();
  // const userPostID = props.userId;
  // const myInfoId = JSON.parse(localStorage.getItem("user")).id;

  const valueSell = {
    post_id: JSON.parse(localStorage.getItem("postCreationId")),
    day_id: props.dayID,
    time_id: props.timeID,
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
        pushToast("success", "Thêm lịch thành công");
      } else {
        setCheckSuccess(false);
        pushToast("error", "Vượt Quá Số khung giờ!");
      }
    } catch (e) {
      setCheckSuccess(false);
      pushToast("error", "Thất bại!");
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

  // const chonDetails = (input) => {
  //   if()
  // };

  return (
    <div className="sell" style={props.style}>
      <input
        className="sell-creation-checkbox"
        type="checkbox"
        id="scheduleCheckbox"
        checked={checkSuccess ? true : false}
        onClick={checkSuccess ? deleteCheck : clickCheckBox}
      />
    </div>
  );
};

export default SellValueCreation;
