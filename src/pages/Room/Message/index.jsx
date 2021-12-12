// disable-eslint
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { FormGroup, Input } from "reactstrap";
import { useParams } from "react-router";
import http from "core/services/httpService";
import io from "socket.io-client";
export default function Message(props) {
  const { groupData } = props;
  const path = useParams();
  const [messageList, setMessageList] = useState([]);
  const [isLoadingMess, setIsLoadingMess] = useState(true);
  // const [isJoined, setIsJoined] = useState(false);
  // eslint-disable-next-line no-undef
  const socket = io(process.env.CHAT_SOCKET_URL);

  useEffect(() => {
    socket.on("room-list", () => {});
    socket.on("server-send-message", () => {
      getMessageData();
    });
  });
  useEffect(() => {
    async function getMessageData() {
      try {
        const response = await http.get(`/api/messages?group_id=${path.id}`);
        setMessageList(response.data);
      } catch (e) {
        console.warn(e.message);
      }
    }
    getMessageData();
  }, [isLoadingMess]);
  useEffect(() => {
    if (groupData) {
      joinRoom();
    }
  }, [groupData]);
  const getMessageData = async () => {
    try {
      const response = await http.get(`/api/messages?group_id=${path.id}`);
      setMessageList(response.data);
      // setIsJoined(true);
    } catch (e) {
      console.warn(e.message);
    }
  };
  const joinRoom = () => {
    socket.emit("join-room", groupData.group_id);
  };
  const sendMessageToServer = (message) => {
    const authUser = JSON.parse(localStorage.getItem("user"));
    const messageObj = {
      group_id: groupData.group_id,
      content: message,
      user_id: authUser.id
    };
    socket.emit("user-send-message", messageObj);
  };
  return (
    <div className="Message">
      <div className="Message__title">
        <h4>Tin nhắn</h4>
        <div>
          <i className="far fa-user-circle" />
          <span>{groupData.count_members}</span>
        </div>
      </div>
      <div className="Message__body">
        {messageList.map((mess) => {
          return (
            <div className="Message__body__title" key={mess.message.id}>
              <div className="Message__body__title__user">
                <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
                <span>
                  {mess.message.user.last_name} {mess.message.user.first_name}
                </span>
              </div>
              <div className="Message__body__title__mess">
                <p>{mess.message.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="Message__chat">
        <Formik
          initialValues={{
            group_id: Number(path.id),
            content: ""
          }}
          onSubmit={(values, actions) => {
            http.post(`/api/messages`, values).then(() => {
              actions.setSubmitting(false);
              actions.resetForm({
                values: {
                  group_id: Number(path.id),
                  content: ""
                }
              });
              sendMessageToServer(values);
              setIsLoadingMess(!isLoadingMess);
            });
          }}
        >
          {(formikProps) => {
            const { values, handleChange } = formikProps;
            return (
              <Form>
                <FormGroup>
                  <Input
                    name="content"
                    type="text"
                    value={values.content}
                    onChange={handleChange}
                    placeholder="Typing here"
                  />
                </FormGroup>
                <button type="submit">
                  <i className="far fa-paper-plane" />
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
