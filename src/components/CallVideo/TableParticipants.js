import { React, useState, useEffect } from "react";
import http from "core/services/httpService";
import Video from "twilio-video";
import { useHistory } from "react-router-dom";
import Participant from "./Participant";
import "./TableParticipants.scss";
import Loading from "components/Loading/Loading";

function TableScreen({ id, getroom }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isEnableAudio, setIsEnableAudio] = useState(true);
  const [isEnableVideo, setIsEnableVideo] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function getDataList() {
      try {
        const response = await http.get(`/api/groups/${id}`);
        setUserName(response.data.user_name);
        setRoomName(response.data.group_name);
        getMedia(response.data.token);
      } catch (err) {
        // history.push("/login");
        console.warn(err.message);
      }
    }
    getDataList();
    return () => {
      setUserName("");
      setRoomName("");
      setRoom(null);
    };
  }, []);

  const handleConnectRoom = (token) => {
    Video.connect(token, {
      name: roomName
    })
      .then((room) => {
        setRoom(room);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  const getRoom = (room) => {
    getroom(room);
  };

  useEffect(() => {
    if (room) {
      getRoom(room);
      const participantConnected = (participant) => {
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          participant
        ]);
      };

      const participantDisconnected = (participant) => {
        setParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p !== participant)
        );
      };

      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
      return () => {
        room.off("participantConnected", participantConnected);
        room.off("participantDisconnected", participantDisconnected);
      };
    }
  }, [room]);

  async function getMedia(data) {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      handleConnectRoom(data);
    } catch (err) {
      setIsLoading(true);
      alert(
        "room yêu cầu quyền truy cập vào máy ảnh và micrô của bạn. Hãy nhấp vào biểu tượng máy ảnh bị chặn trong thanh địa chỉ của trình duyệt"
      );
    }
  }

  const remoteParticipants = participants.map((participant) => (
    <li key={participant.sid}>
      <Participant participant={participant} userName={userName} />
    </li>
  ));

  const toggleAudio = () => {
    if (isEnableAudio) {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.disable();
      });
      setIsEnableAudio(false);
    } else {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.enable();
      });
      setIsEnableAudio(true);
    }
  };

  const toggleVideo = () => {
    if (isEnableVideo) {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.disable();
      });
      setIsEnableVideo(false);
    } else {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.enable();
      });
      setIsEnableVideo(true);
    }
  };

  const handleLogout = () => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((publication) => {
          publication.track.stop();
        });
        prevRoom.disconnect();
        history.push("/home");
      }
      return null;
    });
  };

  return (
    <div className="container-screen">
      {room ? (
        <ul className="local-participant">
          <li>
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
              userName={userName}
            />
            <div className="device">
              <i
                className={
                  isEnableAudio
                    ? "fas fa-microphone icon active"
                    : "fas fa-microphone-slash icon"
                }
                onClick={toggleAudio}
              ></i>
              <i
                className={
                  isEnableVideo
                    ? "fas fa-video icon active"
                    : "fas fa-video-slash icon"
                }
                onClick={toggleVideo}
              ></i>
              <i
                className="fas fa-sign-out-alt icon active"
                onClick={handleLogout}
              ></i>
            </div>
          </li>
          {remoteParticipants}
        </ul>
      ) : (
        <Loading visible={isLoading} />
      )}
    </div>
  );
}

export default TableScreen;
