import React, { useEffect, useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import WhiteBoard from "../../components/Whiteboard";
import TableParticipants from "../../components/CallVideo/TableParticipants";
import "./Room.scss";
import { useParams } from "react-router";
import http from "core/services/httpService";
import { Form, Formik } from "formik";
import { FormGroup, Input } from "reactstrap";
export default function RoomChat() {
  const [room, setroom] = useState(null);
  const path = useParams();
  const [groupData, setGroupData] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    async function getMessageData() {
      try {
        const response = await http.get(`/api/messages?group_id=${path.id}`);
        setMessageList(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getMessageData();
  }, [isLoading]);
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
  console.log(groupData?.owner?.username);
  return (
    <HomeLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <div className="white-board">
              <div className="white-board__host">
                <h6
                  style={{ textTransform: "uppercase", marginBottom: "none" }}
                >
                  {groupData.group_name}
                </h6>
                <h6 style={{ textTransform: "capitalize" }}>
                  {groupData?.owner?.username}
                </h6>
              </div>
              <WhiteBoard wb_id={groupData.wb_id} />
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <div className="Message">
              <div className="Message__title">
                <h4>Tin nhắn</h4>
                <div>
                  <i className="far fa-user-circle"></i>
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
                          {mess.message.user.last_name}{" "}
                          {mess.message.user.first_name}
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
                      setIsLoading(!isLoading);
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
                          ></Input>
                        </FormGroup>
                        <button type="submit">
                          <i className="far fa-paper-plane"></i>
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <TableParticipants id={path.id} getroom={getroom}></TableParticipants>
      </div>
    </HomeLayout>
  );
}
