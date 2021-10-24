import React, { useState } from "react";
import { HomeUserLayout } from "layout/HomeLayout/HomeLayout";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "core/services/apiCaller";
import { useHistory } from "react-router-dom";

import "./PostCreatrion.scss";
const PostCreatrion = () => {
  const [values, setValues] = useState({
    id: "",
    topic: "",
    numberMember: 1,
    content: ""
  });

  let history = useHistory();
  const { topic, numberMember, content } = values;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      numberMember: Number(numberMember),
      [name]: value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    api.post("/posts", values).then(() => {
      alert("Bạn đã đăng thành công");
    });
    onClear();
  };

  const onClear = () => {
    setValues({
      topic: "",
      numberMember: 1,
      content: ""
    });
    history.push("/");
  };

  return (
    <HomeUserLayout>
      <div className="PostCreate">
        <div className="PostCreate__form">
          <div className="PostCreate__form__title">
            <h3>Đăng bài viết</h3>
          </div>
          <div className="PostCreate__form__content">
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
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleNumber">Số lượng thành viên</Label>
                <Input
                  type="number"
                  name="numberMember"
                  id="exampleNumber"
                  placeholder=""
                  value={numberMember == 0 ? "" : numberMember}
                  onChange={onChange}
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
          </div>
        </div>
      </div>
    </HomeUserLayout>
  );
};

export default PostCreatrion;
