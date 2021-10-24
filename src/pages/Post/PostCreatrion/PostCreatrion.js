import React, { useState } from "react";
import { HomeUserLayout } from "layout/HomeLayout/HomeLayout";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { api } from "core/services/apiCaller";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";

import "./PostCreatrion.scss";
const PostCreatrion = () => {
  const [valuePost, setValuePost] = useState({
    id: "",
    topic: "",
    numberMember: 1,
    content: ""
  });

  let history = useHistory();
  const { topic, numberMember, content } = valuePost;
  const onChange = (e) => {
    const { name, value } = e.target;
    setValuePost({
      ...valuePost,
      numberMember: Number(numberMember),
      [name]: value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (topic.length >= 1 && numberMember >= 1) {
      api.post("/posts", valuePost).then(() => {
        alert("Bạn đã đăng thành công");
      });
      onClear();
    }
  };

  const onClear = () => {
    setValuePost({
      topic: "",
      numberMember: 1,
      content: ""
    });
    history.push("/");
  };
  const validationSchema = Yup.object().shape({
    topic: Yup.string().required("Bạn phải nhập chủ đề bài viết"),
    numberMember: Yup.number().required("Bạn phải nhập số thành viên tham gia")
  });
  return (
    <HomeUserLayout>
      <div className="PostCreate">
        <div className="PostCreate__form">
          <div className="PostCreate__form__title">
            <h3>Đăng bài viết</h3>
          </div>
          <div className="PostCreate__form__content">
            <Formik
              initialValues={{
                topic: "",
                numberMember: null
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("values: ", values);
              }}
            >
              {(formikProps) => {
                const { errors, touched, handleBlur } = formikProps;
                return (
                  <Form onSubmit={onSubmit}>
                    <FormGroup>
                      <Label for="topic">Chủ đề</Label>
                      <Input
                        type="text"
                        name="topic"
                        id="topic"
                        placeholder=""
                        value={topic}
                        onChange={onChange}
                        onBlur={handleBlur}
                        invalid={errors["topic"] && touched["topic"]}
                      />
                      <ErrorMessage name={"topic"} component={FormFeedback} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="numberMember">Số lượng thành viên</Label>
                      <Input
                        type="number"
                        name="numberMember"
                        id="numberMember"
                        placeholder=""
                        value={numberMember === 0 ? "" : numberMember}
                        onChange={onChange}
                        onBlur={handleBlur}
                        invalid={
                          errors["numberMember"] && touched["numberMember"]
                        }
                      />
                      <ErrorMessage
                        name={"numberMember"}
                        component={FormFeedback}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="content">Nội dung</Label>
                      <Input
                        type="textarea"
                        name="content"
                        id="content"
                        placeholder=""
                        value={content}
                        onChange={onChange}
                      />
                    </FormGroup>
                    <div className="PostCreate__form__button">
                      <Button onClick={onClear}>Hủy</Button>
                      <Button type="submit">Đăng</Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </HomeUserLayout>
  );
};

export default PostCreatrion;
