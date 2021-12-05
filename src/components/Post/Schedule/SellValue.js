import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "store/post";

import "./Sell.scss";

const styleCheckbox = {
  outline: "2px solid #0066cc"
};

const SellValue = (props) => {
  const dispatch = useDispatch();
  const [valueSchedule, setValueSchedule] = useState(true);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [idSchedule, setIdSchedule] = useState();
  const myPost = props?.myPost;

  let checkCreator = false;

  const dayID = props.dayID;
  const timeID = props.timeID;

  const checkedCreator = props?.mySchedule;
  // const userPostID = props.userId;
  // const myInfoId = JSON.parse(localStorage.getItem("user")).id;

  checkedCreator?.map((item) => {
    if (item?.day_id == dayID && item?.time_id == timeID) {
      checkCreator = true;
    }
  });

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
      console.log(valueSell);

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
        style={checkCreator ? styleCheckbox : {}}
        className="sell-checkbox"
        type="checkbox"
        id="scheduleCheckbox"
        disabled={myPost && props.disabled}
        checked={checkCreator ? checkSuccess : false}
        onClick={checkSuccess ? deleteCheck : clickCheckBox}
      />
    </div>
  );
};

export default SellValue;
