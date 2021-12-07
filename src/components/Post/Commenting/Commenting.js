import http from "core/services/httpService";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Yup from "yup";
import { FormFeedback, FormGroup, Input } from "reactstrap";
import { ErrorMessage } from "formik";
import "./Commenting.scss";

const Commenting = () => {
  const path = useParams();
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getImgUser = JSON.parse(localStorage.getItem("user")).profile_image_url;
  useEffect(() => {
    async function getCommentList() {
      try {
        const response = await http.get(`/api/comments/post/${path.id}`);
        setCommentList(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getCommentList();
  }, [isLoading]);

  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Bạn phải nhập nội dung comment")
  });

  return (
    <div className="Commenting">
      <Formik
        initialValues={{
          post_id: Number(path.id),
          content: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          http.post(`/api/comments`, values).then(() => {
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                post_id: Number(path.id),
                content: ""
              }
            });
            setIsLoading(!isLoading);
          });
        }}
      >
        {(formikProps) => {
          const { values, errors, touched, handleChange } = formikProps;
          return (
            <Form>
              <div className="Commenting__input">
                <div className="Commenting__img-user">
                  <img src={getImgUser} />
                </div>
                <FormGroup>
                  <Input
                    name="content"
                    type="text"
                    value={values.content}
                    onChange={handleChange}
                    invalid={errors["content"] && touched["content"]}
                    placeholder="Comment here"
                  ></Input>
                  <ErrorMessage name={"content"} component={FormFeedback} />
                </FormGroup>
                <button type="submit">Gửi</button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {commentList.map((comment) => {
        return (
          <div className="Commenting__list" key={comment.id}>
            <div className="Commenting__img-user">
              <img src={comment.user.profile_image_url} />
            </div>
            <div className="Commenting__list__frame">
              <span>
                {comment.user.first_name} {comment.user.last_name}
              </span>
              <p>{comment.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Commenting;
