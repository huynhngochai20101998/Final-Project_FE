import React from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
// import http from "core/services/httpService";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, FastField, ErrorMessage } from "formik";

import "./PostCreatrion.scss";
import InputField from "../custom-field/inputField";
const PostCreatrion = () => {
  let history = useHistory();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Bạn phải nhập tiêu đề bài viết"),
    topic: Yup.string().required("Bạn phải nhập chủ đề bài viết").nullable(),
    sessions: Yup.number().required("Bạn phải nhập số buổi").nullable(),
    numberMember: Yup.number()
      .min(3, "Thấp nhất 3 thành viên")
      .max(10, "Nhiều nhất 10 thành viên")
      .required("Bạn phải nhập số thành viên")
      .nullable(),
    sumWeek: Yup.number().required("Bạn phải nhập tổng số tuần học").nullable(),
    content: Yup.string().required("Bạn phải nhập nội dung bài viết")
  });
  return (
    <HomeLayout>
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
                      title: "",
                      topic: "",
                      sessions: 1,
                      numberMember: 3,
                      sumWeek: 1,
                      content: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      // http.post("/api/posts", values).then(() => {
                      //   alert("Bạn đã đăng thành công");
                      //   actions.setSubmitting(false);
                      //   actions.resetForm({
                      //     values: {
                      //       title: "",
                      //       numberMember: 1,
                      //       content: ""
                      //     }
                      //   });
                      //   history.push("/");
                      // });
                    }}
                  >
                    {(formikProps) => {
                      const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isSubmitting
                      } = formikProps;
                      return (
                        <Form>
                          <FastField
                            name="title"
                            component={InputField}
                            label="Tiêu đề"
                            placeholder=""
                          />
                          <div className="PostCreate__form__content__select">
                            <div className="PostCreate__form__content__select__topic">
                              <FormGroup>
                                <Label for="exampleSelect">Chủ đề</Label>
                                <Input
                                  name="topic"
                                  type="select"
                                  value={values.select}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  invalid={
                                    errors["select"] && touched["select"]
                                  }
                                >
                                  <option>Java</option>
                                  <option>NodeJS</option>
                                  <option>NestJS</option>
                                </Input>
                                <ErrorMessage
                                  name={"select"}
                                  component={FormFeedback}
                                />
                              </FormGroup>
                            </div>
                            <div className="PostCreate__form__content__select__number">
                              <FastField
                                name="sessions"
                                component={InputField}
                                label="Số buổi/tuần"
                                placeholder=""
                                type="number"
                              />
                              <FastField
                                name="numberMember"
                                component={InputField}
                                label="Số thành viên"
                                placeholder=""
                                type="number"
                              />
                              <FastField
                                name="sumWeek"
                                component={InputField}
                                label="Tổng số tuần học"
                                placeholder=""
                                type="number"
                              />
                            </div>
                          </div>
                          <FastField
                            name="content"
                            component={InputField}
                            label="Nội dung"
                            placeholder=""
                            type="textarea"
                          />
                          <div className="PostCreate__form__button">
                            <Button
                              type="reset"
                              onClick={() => history.push("/")}
                            >
                              Hủy
                            </Button>
                            <Button type="submit">
                              {isSubmitting && (
                                <Spinner color="light" size="sm" />
                              )}
                              Đăng
                            </Button>
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
    </HomeLayout>
  );
};

export default PostCreatrion;
