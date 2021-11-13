import { createSlice } from "@reduxjs/toolkit";
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

    await http.post("/api/schedules", value);

    dispatch(setLoading({ loading: false }));
  } catch (e) {
    dispatch(setLoading({ loading: false }));

    console.log("error:", e);
  }
};
