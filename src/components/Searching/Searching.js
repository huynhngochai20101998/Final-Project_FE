import React, { useState } from "react";
import ShowHint from "./ShowHint";
import { useHistory } from "react-router-dom";
import "./Searching.scss";

import { useDispatch } from "react-redux";
const Searching = () => {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    value: "",
    checkEvent: false
  }); //khai báo state gán value cho input và kiểm tra sự kiện khi input onChange

  const history = useHistory();

  //khi onChange gán value và cho checkEvent là false
  const onChangeInput = (e) => {
    const value = e.target.value;
    setInputValues((prev) => {
      return {
        ...prev,
        value: value,
        checkEvent: false
      };
    });
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (inputValues.value) {
      const action = {
        type: "SET_INPUT",
        payload: inputValues.value
      };
      dispatch(action);
      history.push(`/home?q=${inputValues.value}`);
      setInputValues((prev) => {
        return {
          ...prev,
          value: ""
        };
      });
    }
  };

  //khi click vào gợi ý khi gõ input, đổ dữ liệu vào input,gán checkEvent là true để kiểm tra sự kiện click vào gợi ý
  const onClickText = (data) => {
    setInputValues((prev) => {
      return {
        ...prev,
        value: data,
        checkEvent: true
      };
    });
  };

  return (
    <div className="search-component">
      <div className="container h-100">
        <div className="d-flex justify-content-center h-100">
          <form className="searchbar" onSubmit={onSubmitSearch}>
            <input
              className="search_input"
              type="text"
              name=""
              value={inputValues.value}
              onChange={onChangeInput}
              placeholder="Tìm kiếm"
            />
            <a href="#" className="search_icon" onClick={onSubmitSearch}>
              <i className="fas fa-search"></i>
            </a>
          </form>
        </div>
        <ShowHint
          inputvalues={inputValues}
          onclicktext={onClickText}
        ></ShowHint>
      </div>
    </div>
  );
};

export default Searching;
