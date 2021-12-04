import React, { useEffect, useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import WhiteBoard from "../../components/Whiteboard";
import TableParticipants from "../../components/CallVideo/TableParticipants";
import "./Room.scss";
import { useParams } from "react-router";
import http from "core/services/httpService";
import { Form, Formik } from "formik";
import { FormGroup, Input } from "reactstrap";
import axios from "axios";
export default function RoomChat() {
  const path = useParams();
  const [groupData, setGroupData] = useState({});
  const [messageList, setMessageList] = useState([]);
  const api = axios.create({
    baseURL: `https://fathomless-depths-07369.herokuapp.com`
  });
  // console.log(groupData);
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
        const response = await api.get(`/api/messages?group_id=${path.id}`);
        setMessageList(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getMessageData();
  }, []);
  console.log(messageList);
  console.log(groupData);
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
          <div className="col-sm-4 col-md-4 col-lg-4">
            <div className="Message">
              <div className="Message__title">
                <h4>Tin nhắn</h4>
                <div>
                  <i className="far fa-user-circle"></i>
                  <span>5</span>
                </div>
              </div>
              <div className="Message__body">
                <div className="Message__body__title">
                  <div className="Message__body__title__user">
                    <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
                    <span>Nguyen Dung22</span>
                  </div>
                  <div className="Message__body__title__mess">
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Magni, facilis! Consequuntur pariatur recusandae
                      cupiditate ea autem illo expedita dolorum porro alias
                      sapiente facere, iste sed optio eum nisi minus nam?
                    </p>
                  </div>
                </div>
              </div>
              <div className="Message__chat">
                <Formik
                  initialValues={{
                    group_id: Number(path.id),
                    content: ""
                  }}
                  // validationSchema={validationSchema}
                  onSubmit={(values, actions) => {
                    api.post(`/api/messages`, values).then(() => {
                      actions.setSubmitting(false);
                      actions.resetForm({
                        values: {
                          group_id: Number(path.id),
                          content: ""
                        }
                      });
                      // setIsLoading(!isLoading);
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
        <TableParticipants id={path.id}></TableParticipants>
      </div>
    </HomeLayout>
  );
}
