import React, { useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import http from "core/services/httpService";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, FastField, ErrorMessage } from "formik";
import "./PostCreatrion.scss";
import InputField from "../custom-field/inputField";
const PostCreatrion = () => {
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Bạn phải nhập tiêu đề bài viết"),
    topic_id: Yup.number().required("Bạn phải chọn chủ đề bài viết").nullable(),
    sessions: Yup.number().required("Bạn phải nhập số buổi").nullable(),
    members: Yup.number()
      .min(3, "Tối thiểu 3 thành viên")
      .max(10, "Tối đa 10 thành viên")
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
                      topic_id: "",
                      sessions: 1,
                      members: 3,
                      sumWeek: 1,
                      content: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                      const formatValue = {
                        ...values,
                        topic_id: Number(values.topic_id)
                      };
                      http.post("/api/posts", formatValue).then(() => {
                        alert("Bạn đã đăng thành công");
                        actions.setSubmitting(false);
                        actions.resetForm({
                          values: {
                            title: "",
                            topic_id: "",
                            sessions: 1,
                            members: 3,
                            sumWeek: 1,
                            content: ""
                          }
                        });
                        history.push("/");
                      });
                      console.log(formatValue);
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
                          {isLoading ? (
                            <>
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
                                      name="topic_id"
                                      type="select"
                                      value={values.topic_id}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      // defaultValue=""
                                      invalid={
                                        errors["topic_id"] &&
                                        touched["topic_id"]
                                      }
                                    >
                                      <option
                                        value=""
                                        disabled
                                        label="Chọn chủ đề"
                                      />
                                      <option value="1" label="java" />
                                      <option value="2" label="javascript" />
                                      <option value="3" label="Nestjs" />
                                    </Input>
                                    <ErrorMessage
                                      name={"topic_id"}
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
                                    name="members"
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
                                <Button
                                  onClick={() => setIsLoading(!isLoading)}
                                >
                                  Tiếp tục
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="PostCreate__form__content">
                                <Label for="exampleSelect">
                                  Thời gian rảnh
                                </Label>

                                <div className="PostCreate__form__button">
                                  <Button
                                    type="reset"
                                    onClick={() => setIsLoading(!isLoading)}
                                  >
                                    Quay lại
                                  </Button>
                                  <Button type="submit">
                                    {isSubmitting && (
                                      <Spinner color="light" size="sm" />
                                    )}
                                    Hoàn tất
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
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
