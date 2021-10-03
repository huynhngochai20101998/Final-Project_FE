import React from "react";
import { HomeUserLayout } from "layout/HomeLayout/HomeLayout";
import "./PostCreatrion.scss";
import { Formik, Form } from "formik";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import * as Yup from "yup";
import SelectField from "./SelectField";

const PostCreatrion = () => {
  var tagTopic = [
    {
      value: "1",
      label: "HTML"
    },
    {
      value: "2",
      label: "CSS"
    },
    {
      value: "3",
      label: "Javascript"
    }
  ];
  const validate = Yup.object({
    title: Yup.string().required("Tiêu đề không được để trống"),
    // tagSelect: Yup.array().min(1, "Chọn ít nhất 1 thẻ"),
    contentPost: Yup.string().required("Nội dung không được để trống")
  });
  return (
    <HomeUserLayout>
      <Formik
        initialValues={{
          title: "",
          tagSelect: [],
          contentPost: ""
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <div className="form-create-post">
            <div className="container">
              <h2>Thêm Bài Viết Mới</h2>
              <Form>
                <InputField
                  label="Tiêu đề bài viết"
                  name="title"
                  type="text"
                ></InputField>
                <SelectField
                  label="chủ đề"
                  name="tagSelect"
                  options={tagTopic}
                  value={formik.values.tagSelect}
                  onChange={(value) => formik.setFieldValue("tagSelect", value)}
                ></SelectField>
                <TextAreaField
                  label="Nội dung"
                  name="contentPost"
                  rows="6"
                ></TextAreaField>
                <div className="form-group row">
                  <div className="col-sm-1-12">
                    <button type="submit" className="btn btn-primary">
                      Đăng
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </HomeUserLayout>
  );
};

export default PostCreatrion;
