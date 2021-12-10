import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { FormGroup, Input } from "reactstrap";
import { useParams } from "react-router";
import http from "core/services/httpService";
export default function Message(props) {
  const { groupData } = props;
  const path = useParams();
  const [messageList, setMessageList] = useState([]);
  const [isLoadingMess, setIsLoadingMess] = useState(true);
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
  return (
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
  );
}
