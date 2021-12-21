import { React, useState, useEffect } from "react";
import http from "core/services/httpService";
import { connect } from "twilio-video";
import { useHistory } from "react-router-dom";
import Participant from "./Participant";
import "./TableParticipants.scss";
import Loading from "components/Loading/Loading";

function TableScreen({ id, getroom }) {
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [token, setToken] = useState(null);
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
        setToken(response.data.token);
        getVideoMedia();
        getAudioMedia();
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

  const handleConnectRoom = (isTurnVideo, isTurnAudio) => {
    connect(token, {
      audio: isTurnAudio,
      name: roomName,
      video: isTurnVideo
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

  async function getVideoMedia() {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: true
      });
      const turnOnVideo = true;
      setVideo(turnOnVideo);
    } catch (err) {
      const turnOffVideo = false;
      setVideo(turnOffVideo);
      alert(
        "Máy ảnh của bạn đã bị tắt hãy bật máy ảnh để hiển thị video của bạn."
      );
    }
  }

  async function getAudioMedia() {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const turnOnAudio = true;
      setAudio(turnOnAudio);
    } catch (err) {
      const turnOffAudio = false;
      setAudio(turnOffAudio);
      alert(
        "Micro của bạn đã bị tắt hãy bật micro để ghi âm âm thanh của bạn."
      );
    }
  }
  // async function getMedia(data) {x
  //   try {
  //     await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true
  //     });
  //   } catch (err) {
  //     // setIsLoading(true);
  //     // alert(
  //     //   "room yêu cầu quyền truy cập vào máy ảnh và micrô của bạn. Hãy nhấp vào biểu tượng máy ảnh bị chặn trong thanh địa chỉ của trình duyệt"
  //     // );
  //     console.warn(err?.message);
  //   }
  // }

  useEffect(() => {
    handleConnectRoom(video, audio);
  }, [video, audio, roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <li key={participant.sid}>
      <Participant participant={participant} userName={userName} />
    </li>
  ));

  const toggleAudio = () => {
    if (audio) {
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
    } else {
      alert(
        "Micro của bạn đã bị tắt hãy bật micro để ghi âm âm thanh của bạn."
      );
    }
  };

  const toggleVideo = () => {
    if (video) {
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
    } else {
      alert(
        "Máy ảnh của bạn đã bị tắt hãy bật máy ảnh để hiển thị video của bạn."
      );
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

  useEffect(() => {
    return () => {
      window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        return handleLogout();
      });
    };
  });
  return (
    <div className="container-screen">
      {room ? (
        <ul className="local-participant d-flex justify-content-center flex-wrap">
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
