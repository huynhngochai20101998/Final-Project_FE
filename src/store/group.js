import { createSlice } from "@reduxjs/toolkit";
import { pushToast } from "components/Toast";
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

export const createGroup = (value) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));

    console.log("okokoko", value);

    dispatch(setLoading({ loading: false }));
    // pushToast("success", res.message);
  } catch (e) {
    dispatch(setLoading({ loading: false }));

    pushToast("error", e.message);
  }
};
