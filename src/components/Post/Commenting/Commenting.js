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
                  <img src="https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/158684626_1925441784290011_8047498647222352148_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=NVM_LzWUEMcAX85q2j2&_nc_ht=scontent.fdad3-2.fna&oh=5eb7af8490c4231cc7a7a11afc385691&oe=61BFDC91" />
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
