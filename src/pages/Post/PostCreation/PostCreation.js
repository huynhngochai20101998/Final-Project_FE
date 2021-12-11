import React, { useEffect, useState } from "react";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import * as Yup from "yup";
import { Formik, Form, FastField, ErrorMessage } from "formik";
import "./PostCreation.scss";
import InputField from "../custom-field/inputField";
import http from "core/services/httpService";
import { useDispatch } from "react-redux";
import { cancelCreatePost, createCompletionPost } from "store/post";
import { pushToast } from "components/Toast";
import ScheduleCreation from "components/Post/Schedule/ScheduleCreation";
// import { pushToast } from "components/Toast";

const PostCreation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topicList, setTopicList] = useState([]);
  const dispatch = useDispatch();
  const postCreation = true;

  useEffect(() => {
    async function getDataList() {
      try {
        const response = await http.get("/api/topics");
        setTopicList(response.data.data);
      } catch (err) {
        console.warn(err.message);
      }
    }
    getDataList();
  }, []);

  // const postInfo = JSON.parse(localStorage.getItem("postInfo")) || {};

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Bạn phải nhập tiêu đề bài viết"),
    topic_id: Yup.number().required("Bạn phải chọn chủ đề bài viết").nullable(),
    number_of_lessons: Yup.number()
      .required("Bạn phải nhập số buổi")
      .nullable(),
    members: Yup.number()
      .min(3, "Tối thiểu 3 thành viên")
      .max(10, "Tối đa 10 thành viên")
      .required("Bạn phải nhập số thành viên")
      .nullable(),
    number_of_weeks: Yup.number()
      .required("Bạn phải nhập tổng số tuần học")
      .nullable(),
    content: Yup.string().required("Bạn phải nhập nội dung bài viết")
  });

  return (
    <HomeLayout>
      <div className="PostCreate">
        <div className="PostCreate__form">
          <div className="PostCreate__form__title">
            <h3>Đăng bài viết</h3>
          </div>
          <div className="PostCreate__form__content">
            <Formik
              initialValues={{
                title: "",
                topic_id: "",
                number_of_lessons: 1,
                members: 3,
                number_of_weeks: 1,
                content: ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                const formatValue = {
                  ...values,
                  topic_id: Number(values.topic_id)
                };
                http
                  .post("/api/posts", formatValue)
                  .then((res) => {
                    localStorage.setItem(
                      "postCreationId",
                      JSON.stringify(res.data.id)
                    );

                    actions.setSubmitting(false);
                    actions.resetForm({
                      values: {
                        title: formatValue.title,
                        topic_id: formatValue.topic_id,
                        number_of_lessons: formatValue.number_of_lessons,
                        members: formatValue.members,
                        number_of_weeks: formatValue.number_of_weeks,
                        content: formatValue.content
                      }
                    });

                    setIsLoading(!isLoading);
                  })
                  .catch((e) => {
                    console.warn(e.message);
                    pushToast("error", "Đã trùng tiêu đề");
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
                                invalid={
                                  errors["topic_id"] && touched["topic_id"]
                                }
                              >
                                <option value="" disabled label="Chọn chủ đề" />
                                {topicList.map((topic) => {
                                  return (
                                    <option
                                      key={topic.id}
                                      value={topic.id}
                                      label={topic.name}
                                    />
                                  );
                                })}
                              </Input>
                              <ErrorMessage
                                name={"topic_id"}
                                component={FormFeedback}
                              />
                            </FormGroup>
                          </div>
                          <div className="PostCreate__form__content__select__number">
                            <FastField
                              name="number_of_lessons"
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
                              name="number_of_weeks"
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
                            onClick={() => dispatch(cancelCreatePost())}
                          >
                            Hủy
                          </Button>
                          <Button type="submit">Đăng Bài</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="PostCreate__form__content">
                          <Label for="exampleSelect">Thời gian rảnh</Label>
                          <div className="PostCreate__form__content-chedule">
                            <ScheduleCreation postCreation={postCreation} />
                          </div>
                          <div className="PostCreate__form__button">
                            {/* <Button
                              type="reset"
                              onClick={() => setIsLoading(!isLoading)}
                            >
                              Quay lại
                            </Button> */}
                            <Button
                              className="bg-info btn text-white"
                              onClick={() => {
                                dispatch(createCompletionPost());
                              }}
                            >
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
    </HomeLayout>
  );
};

export default PostCreation;
