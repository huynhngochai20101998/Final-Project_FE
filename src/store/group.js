import { createSlice } from "@reduxjs/toolkit";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
// import http from "core/services/httpService";

const slice = createSlice({
  name: "user",
  initialState: {
    loading: false
  },
  reducers: {
    setLoading: (state, action) => {
      const { payload } = action;

      state.loading = payload.loading;
    }
  }
});

export default slice.reducer;

const { setLoading } = slice.actions;

export const createGroup = (values) => async (dispatch) => {
  try {
    const { postId, nameGroup } = values;
    console.log("adfajnfakn", postId);
    dispatch(setLoading({ loading: true }));
    const res = await http.post(`/api/post/${postId}/create-group`, {
      name: nameGroup
    });

    console.log("okokoko", res);

    dispatch(setLoading({ loading: false }));

    if (res.success) {
      pushToast("success", res.message);
      // window.location.href = "/home";
    } else {
      pushToast("error", res.message);
      // window.location.href = "/home";
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));

    pushToast("error", e.message);
    window.location.href = "/home";
  }
};

export const removeMember = (values) => async (dispatch) => {
  try {
    const { memberID, postId } = values;
    localStorage.setItem("aaaaa", `${memberID} ${postId}`);

    dispatch(setLoading({ loading: true }));

    // const res = await http.post(`/api/post/${postId}/remove-members`, {
    //   member_id: memberID
    // });
    dispatch(setLoading({ loading: false }));

    // if (res.success) {
    //   window.location.reload();
    // } else {
    //   pushToast("error", res.message);
    // }
  } catch (e) {
    return e;
  }
};
