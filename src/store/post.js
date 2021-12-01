import { createSlice } from "@reduxjs/toolkit";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";

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

export const addSchedule = (value) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));

    const res = await http.post("/api/schedules", value);

    dispatch(setLoading({ loading: false }));

    if (res.success) {
      pushToast("success", res.message);
    } else {
      pushToast("error", "Trùng thời gian!");
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));

    pushToast("error", e.message);
    console.log("error:", e);
  }
};

export const postDetail = (post) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));

    const res = await http.get(`/api/posts/${post.slug}`);

    dispatch(setLoading({ loading: false }));

    if (res.success) {
      localStorage.setItem("postCurrent", JSON.stringify(res.data));

      // dispatch(showPostDetailSuccess());

      window.location.href = "/post-details";
    } else {
      pushToast("error", res.message);
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

    return console.log("error", e.message);
  }
};

export const createCompletionPost = () => (dispatch) => {
  pushToast("success", "Hoàn tất");

  dispatch(setLoading({ loading: true }));
  setTimeout(() => {
    localStorage.removeItem("postCreationId");

    dispatch(setLoading({ loading: false }));
    window.location.href = "/home";
  }, 3000);
};

export const cancelCreatePost = () => () => {
  window.location.href = "/home";
};
