const { createSlice } = require("@reduxjs/toolkit");

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

export const getTopic = () => (dispatch) => {
  dispatch(setLoading({ payload: true }));
};
