import React from "react";
import { HomeUserLayout } from "layout/HomeLayout/HomeLayout";

const PostCreatrion = () => {
  return (
    <HomeUserLayout>
      <div classNameName="form-create-post">
        <div className="container">
          <form>
            <h2>Thêm Bài Viết Mới</h2>
            <div className="form-group row">
              <label htmlFor="inputName" className="col-sm-1-12 col-form-label">
                ádasdsad
              </label>
              <div className="col-sm-1-12">
                <input
                  type="text"
                  className="form-control"
                  name="inputName"
                  id="inputName"
                  placeholder=""
                />
              </div>
            </div>
            <fieldset className="form-group row">
              <legend className="col-form-legend col-sm-1-12">
                Group name
              </legend>
              <div className="col-sm-1-12"></div>
            </fieldset>
            <div className="form-group row">
              <div className="offset-sm-2 col-sm-10">
                <button type="submit" className="btn btn-primary">
                  Action
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeUserLayout>
  );
};

export default PostCreatrion;
