import { createSlice } from "@reduxjs/toolkit";
import { setUserLocal, removeUserLocal } from "core/localStore";
import { pushToast } from "../components/Toast";
import { USER_ROLE } from "core/constants";
// Slice

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      // localStorage.setItem("user", JSON.stringify(action.payload));
      setUserLocal(action.payload?.token, action?.payload?.user);
      console.log("action?.payload?.user?.role: ", action?.payload?.user?.role);
      if (action?.payload?.user?.role == USER_ROLE.ADMIN) {
        window.location.href = "/general-information";
      } else {
        window.location.href = "/profile-creation";
      }
    },
    logoutSuccess: (state) => {
      state.user = null;
      // localStorage.removeItem("user");
      removeUserLocal();
    }
  }
});

export default slice.reducer;

// Actions

const { loginSuccess, logoutSuccess } = slice.actions;

export const login = (values) => async (dispatch) => {
  try {
    // await api.post("/api/auth/login/", { username, password });

    let role = USER_ROLE.USER;
    if (values?.email === "admin@gmail.com") {
      role = USER_ROLE.ADMIN;
    }

    let user = {
      username: values?.email,
      role: role
    };
    let token = "faketoken";

    dispatch(loginSuccess({ user: user, token: token }));
  } catch (e) {
    pushToast("error", e?.message);
    return console.error(e.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
