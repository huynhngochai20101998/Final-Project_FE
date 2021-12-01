import { React, useState, useEffect } from "react";
import http from "core/services/httpService";
import Video from "twilio-video";
import { useHistory } from "react-router-dom";
import Participant from "./Participant";
import "./TableParticipants.scss";
import Loading from "components/Loading/Loading";

function TableScreen() {
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
        const response = await http.get("/api/groups/6");
        setUserName(response.data.user_name);
        setRoomName(response.data.group_name);
        handleConnectRoom(response.data.token);
      } catch (err) {
        // history.push("/login");
        console.log(err);
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
        console.error(err);
      });
  };

  useEffect(() => {
    if (room) {
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

  const remoteParticipants = participants.map((participant) => (
    <li key={participant.sid} className="remote-participants ">
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
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
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
            <h4>Màn hình của Bạn</h4>
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
            {remoteParticipants}
          </li>
        </ul>
      ) : (
        <Loading visible={isLoading} />
      )}
    </div>
  );
}

export default TableScreen;
