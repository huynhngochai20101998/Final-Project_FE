import http from "core/services/httpService";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { setLoading } from "store/post";
import "./Schedule.scss";
import SellTimeName from "./SellTimeName";
import SellValue from "./SellValue";

const styleSell = (bgColor, textColor) => {
  let style = {
    backgroundColor: bgColor,
    color: textColor
  };

  return style;
};

const Schedule = (props) => {
  const path = useParams();
  const dispatch = useDispatch();
  const [mySchedulePost, setMySchedulePost] = useState();
  const [userSchedule, setUserSchedule] = useState([]);

  // const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const userIdPost = props.userIdPost;
  const myPost = props?.myPost;
  const postCreation = props.postCreation;

  useEffect(() => {
    const callAPIGetPostSchedule = async () => {
      try {
        dispatch(setLoading({ loading: true }));

        const res = await http.get(`/api/posts/${path.id}`);
        dispatch(setLoading({ loading: false }));

        if (res.success) {
          setMySchedulePost(res.data.schedules);
        }
      } catch (err) {
        return null;
      }
    };

    const callAPIUserSchedule = async () => {
      try {
        dispatch(setLoading({ loading: true }));

        const res = await http.get(`/api/user/schedules/${path.id}`);
        dispatch(setLoading({ loading: false }));

        if (res.success) {
          setUserSchedule(res.data);
        }
      } catch (e) {
        return null;
      }
    };

    callAPIGetPostSchedule();
    callAPIUserSchedule();
  }, []);

  return (
    <div className="schedule-wrapper">
      <div className="schedule">
        <div className="schedule-collumn">
          <SellTimeName
            values="Giờ/Thứ"
            style={styleSell("#71C6DD", "#000000")}
          />
          <SellTimeName
            values="7h - 9h"
            style={styleSell("#51546E", "#ffffff")}
          />
          <SellTimeName
            values="9h30 - 11h30"
            style={styleSell("#696D97", "#ffffff")}
          />
          <SellTimeName
            values="13h30 - 15h30"
            style={styleSell("#51546E", "#ffffff")}
          />
          <SellTimeName
            values="16h - 18h"
            style={styleSell("#696D97", "#ffffff")}
          />
          <SellTimeName
            values="19h - 21h"
            style={styleSell("#51546E", "#ffffff")}
          />
        </div>
        <div className="schedule-collumn">
          <SellTimeName
            values="Thứ 2"
            style={styleSell("#71C6DD", "#000000")}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="1"
            timeID="1"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="1"
            timeID="2"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="1"
            timeID="3"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="1"
            timeID="4"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="1"
            timeID="5"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
        </div>
        <div className="schedule-collumn">
          <SellTimeName
            values="Thứ 3"
            style={styleSell("#71C6DD", "#000000")}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="2"
            timeID="1"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="2"
            timeID="2"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="2"
            timeID="3"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="2"
            timeID="4"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="2"
            timeID="5"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
        </div>
        <div className="schedule-collumn">
          <SellTimeName
            values="Thứ 4"
            style={styleSell("#71C6DD", "#000000")}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="3"
            timeID="1"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="3"
            timeID="2"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="3"
            timeID="3"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="3"
            timeID="4"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="3"
            timeID="5"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
        </div>
        <div className="schedule-collumn">
          <SellTimeName
            values="Thứ 5"
            style={styleSell("#71C6DD", "#000000")}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="4"
            timeID="1"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="4"
            timeID="2"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="4"
            timeID="3"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="4"
            timeID="4"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="4"
            timeID="5"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
        </div>
        <div className="schedule-collumn">
          <SellTimeName
            values="Thứ 6"
            style={styleSell("#71C6DD", "#000000")}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="5"
            timeID="1"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="5"
            timeID="2"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="5"
            timeID="3"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="5"
            timeID="4"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="5"
            timeID="5"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
        </div>
        <div className="schedule-collumn">
          <SellTimeName
            values="Thứ 7"
            style={styleSell("#71C6DD", "#000000")}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="6"
            timeID="1"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="6"
            timeID="2"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="6"
            timeID="3"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="6"
            timeID="4"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="6"
            timeID="5"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
        </div>
        <div className="schedule-collumn">
          <SellTimeName
            values="Chủ Nhât"
            style={styleSell("#71C6DD", "#000000")}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="7"
            timeID="1"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="7"
            timeID="2"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="7"
            timeID="3"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#696D97", "#ffffff")}
            dayID="7"
            timeID="4"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
          <SellValue
            style={styleSell("#51546E", "#ffffff")}
            dayID="7"
            timeID="5"
            mySchedule={mySchedulePost}
            userId={userIdPost}
            myPost={myPost}
            postCreation={postCreation}
            userSchedule={userSchedule}
          />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
