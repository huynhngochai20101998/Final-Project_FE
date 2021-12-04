import React, { useEffect, useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import WhiteBoard from "../../components/Whiteboard";
import TableParticipants from "../../components/CallVideo/TableParticipants";
import "./Room.scss";
import { useParams } from "react-router";
import http from "core/services/httpService";
export default function RoomChat() {
  const [room, setroom] = useState(null);
  const path = useParams();
  const [groupData, setGroupData] = useState({});
  useEffect(() => {
    async function getGroupData() {
      try {
        const response = await http.get(`/api/groups/${path.id}`);
        setGroupData(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getGroupData();
  }, []);

  useEffect(() => {
    return () => {
      if (room) {
        handleLogout(room);
      }
    };
  });

  const getroom = (data) => {
    setroom(data);
  };

  const handleLogout = (roomdata) => {
    roomdata.localParticipant.tracks.forEach((publication) => {
      publication.track.stop();
    });
    roomdata.disconnect();
  };

  return (
    <HomeLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <div className="white-board">
              <div className="white-board__host">
                <h6>JavaScript</h6>
                <h6>Nguyễn Dũng</h6>
              </div>
              <WhiteBoard wb_id={groupData.wb_id} />
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4"></div>
        </div>
        <TableParticipants id={path.id} getroom={getroom}></TableParticipants>
      </div>
    </HomeLayout>
  );
}
