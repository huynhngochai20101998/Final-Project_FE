import React from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import { Button, Spinner } from "reactstrap";
// import http from "core/services/httpService";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, FastField } from "formik";

import "./PostCreatrion.scss";
import InputField from "../custom-field/inputField";
import SelectField from "../custom-field/selectField";
const PostCreatrion = () => {
  let history = useHistory();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Bạn phải nhập tiêu đề bài viết"),
    topic: Yup.string().required("Bạn phải nhập chủ đề bài viết").nullable(),
    sessions: Yup.number().required("Bạn phải nhập số buổi").nullable(),
    numberMember: Yup.number()
      .required("Bạn phải nhập số thành viên")
      .nullable(),
    sumWeek: Yup.number().required("Bạn phải nhập tổng số tuần học")
  });
  const TOPIC_OPTIONS = [
    { value: "Java", label: "Java" },
    { value: "PHP", label: "PHP" },
    { value: "Javascript", label: "Javascript" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "SQL", label: "SQL" }
  ];
  const SESSIONS_OPTIONS = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 }
  ];
  const MEMBER_OPTIONS = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 }
  ];
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
                      topic: null,
                      sessions: null,
                      numberMember: null,
                      sumWeek: 3,
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
                      const { isSubmitting } = formikProps;
                      return (
                        <Form>
                          <FastField
                            name="title"
                            component={InputField}
                            label="Tiêu đề"
                            placeholder=""
                          />
                          <div>
                            <FastField
                              name="topic"
                              component={SelectField}
                              label="Chủ đề"
                              placeholder="Chọn chủ đề ?"
                              options={TOPIC_OPTIONS}
                            />
                            <FastField
                              name="sessions"
                              component={SelectField}
                              label="Số buổi/tuần"
                              placeholder="Chọn số buổi?"
                              options={SESSIONS_OPTIONS}
                            />
                            <FastField
                              name="numberMember"
                              component={SelectField}
                              label="Số lượng thành viên"
                              placeholder="Chọn số lượng thành viên?"
                              options={MEMBER_OPTIONS}
                            />
                            <FastField
                              name="sumWeek"
                              component={InputField}
                              label="Tổng số tuần học"
                              placeholder=""
                              type="number"
                            />
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
