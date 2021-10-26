import React from "react";
import { HomeUserLayout } from "layout/HomeLayout/HomeLayout";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { api } from "core/services/apiCaller";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";

import "./PostCreatrion.scss";
const PostCreatrion = () => {
  let history = useHistory();
  const validationSchema = Yup.object().shape({
    topic: Yup.string().required("Bạn phải nhập chủ đề bài viết"),
    numberMember: Yup.number().required("Bạn phải nhập số thành viên tham gia")
  });
  return (
    <HomeUserLayout>
      <div className="PostCreate">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="PostCreate__form">
                <div className="PostCreate__form__title">
                  <h3>Đăng bài viết</h3>
                </div>
                <div className="PostCreate__form__content">
                  <Formik
                    initialValues={{
                      topic: "",
                      numberMember: 1,
                      content: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                      api.post("/posts", values).then(() => {
                        alert("Bạn đã đăng thành công");
                        actions.setSubmitting(false);
                        actions.resetForm({
                          values: {
                            topic: "",
                            numberMember: 1,
                            content: ""
                          }
                        });
                        history.push("/");
                      });
                    }}
                  >
                    {(formikProps) => {
                      const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                      } = formikProps;
                      return (
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Label for="topic">Chủ đề</Label>
                            <Input
                              type="text"
                              name="topic"
                              id="topic"
                              placeholder=""
                              value={values.topic}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={errors["topic"] && touched["topic"]}
                            />
                            <ErrorMessage
                              name={"topic"}
                              component={FormFeedback}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="numberMember">
                              Số lượng thành viên
                            </Label>
                            <Input
                              type="number"
                              name="numberMember"
                              id="numberMember"
                              placeholder=""
                              value={values.numberMember}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={
                                errors["numberMember"] &&
                                touched["numberMember"]
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
                              value={values.content}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <div className="PostCreate__form__button">
                            <Button
                              type="reset"
                              onClick={() => history.push("/")}
                            >
                              Hủy
                            </Button>
                            <Button type="submit">Đăng</Button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </HomeUserLayout>
  );
};

export default PostCreatrion;
