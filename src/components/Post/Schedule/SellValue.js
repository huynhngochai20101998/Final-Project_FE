import { pushToast } from "components/Toast";
import http from "core/services/httpService";

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "store/post";

import "./Sell.scss";

const styleCheckbox = {
  outline: "2px solid #0066cc"
};

const SellValue = (props) => {
  const myPost = props?.myPost;
  const checkedCreator = props?.mySchedule;
  const creatorID = props.userId;
  const style = props.style;
  const userSchedule = props.userSchedule;
  const dayID = props.dayID;
  const timeID = props.timeID;

  const userID = JSON.parse(localStorage.getItem("user")).id;

  if (creatorID == userID) {
    return (
      <RenderSellRoleCreator
        dayID={dayID}
        timeID={timeID}
        checkedCreator={checkedCreator}
        myPost={myPost}
        style={style}
      />
    );
  } else {
    return (
      <RenderSellRoleUser
        dayID={dayID}
        timeID={timeID}
        checkedCreator={checkedCreator}
        userSchedule={userSchedule}
        style={style}
      />
    );
  }
};

export default SellValue;

export const RenderSellRoleUser = (props) => {
  const dispatch = useDispatch();
  const path = useParams();

  const [valueSchedule, setValueSchedule] = useState(true);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [idSchedule, setIdSchedule] = useState();

  // eslint-disable-next-line no-unused-vars

  const checkedCreator = props.checkedCreator;
  const dayID = props.dayID;
  const timeID = props.timeID;
  const userSchedule = props.userSchedule;

  const valueSell = {
    post_id: path.id,
    day_id: props.dayID,
    time_id: props.timeID,
    value: valueSchedule
  };

  let disable = true;
  let checkCreator = false;
  let userChecked = false;

  checkedCreator?.map((item) => {
    if (item?.day_id == dayID && item?.time_id == timeID) {
      disable = false;
      checkCreator = true;
    }
  });

  userSchedule?.map((item) => {
    if (item?.day_id == dayID && item?.time_id == timeID) {
      console.log("item", item?.day_id, item?.time_id);
      userChecked = true;
    }
  });

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
        pushToast("error", "Thất bại!");
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
      setCheckSuccess(checkSuccess);
      pushToast("warn", "thất bại");
    }
  };

  return (
    <div
      className="sell"
      style={checkCreator ? { border: "1px solid #71c6dd" } : props.style}
    >
      <input
        // style={checkCreator && myPost ? styleCheckbox : {}}
        className="sell-checkbox"
        type="checkbox"
        id="scheduleCheckbox"
        disabled={disable}
        checked={userChecked || checkSuccess ? true : false}
        onClick={checkSuccess ? deleteCheck : clickCheckBox}
        onChange={() => {}}
      />
    </div>
  );
};

export const RenderSellRoleCreator = (props) => {
  const dispatch = useDispatch();
  const path = useParams();

  const [valueSchedule, setValueSchedule] = useState(true);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [idSchedule, setIdSchedule] = useState();

  const myPost = props.myPost;
  const style = props.style;
  const checkedCreator = props.checkedCreator;
  const dayID = props.dayID;
  const timeID = props.timeID;

  let checkCreator = false;

  const valueSell = {
    post_id: path.id,
    day_id: props.dayID,
    time_id: props.timeID,
    value: valueSchedule
  };

  checkedCreator?.map((item) => {
    if (item?.day_id == dayID && item?.time_id == timeID) {
      checkCreator = true;
    }
  });

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
        pushToast("error", "Thất bại!");
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
      setCheckSuccess(checkSuccess);
      pushToast("warn", "thất bại");
    }
  };

  return (
    <div
      className="sell"
      style={!myPost && checkCreator ? { border: "1px solid #71c6dd" } : style}
    >
      <input
        style={checkCreator && myPost ? styleCheckbox : {}}
        className="sell-checkbox"
        type="checkbox"
        id="scheduleCheckbox"
        disabled
        checked={checkCreator ? true : false}
        onClick={checkSuccess ? deleteCheck : clickCheckBox}
        onChange={() => {}}
      />
    </div>
  );
};
