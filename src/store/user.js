import { createSlice } from "@reduxjs/toolkit";
import { setUserLocal, removeUserLocal } from "core/localStore";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { ERRORS, USER_ROLE } from "core/constants";
// Slice

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    loading: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { payload } = action;

      state.user = payload?.user;

      setUserLocal(payload?.token, payload?.user);

      if (payload?.user?.role === USER_ROLE.USER) {
        window.location.href = "/home";
      } else if (payload?.user?.role === USER_ROLE.ADMIN) {
        window.location.href = "/admin";
      }
    },

    logoutSuccess: (state) => {
      state.user = null;
      removeUserLocal();
      window.location.href = "/login";
    },

    setLoading: (state, action) => {
      const { payload } = action;
      state.loading = payload.loading;
    }
  }
});

export default slice.reducer;

// Actions

const { logoutSuccess, loginSuccess, setLoading } = slice.actions;

export const login = (values) => async (dispatch) => {
  // window.location.href = "/home";
  try {
    dispatch(setLoading({ loading: true }));

    const res = await http.post("/api/login", {
      email: values.email,
      password: values.password
    });

    let user = {
      ...res.data.user
    };

    let token = res.data.access_token;

    const rememberMe = {
      isRemember: values.isRemember,
      email: values.email,
      password: values.password
    };

    dispatch(setLoading({ loading: false }));

    if (!res.success) {
      pushToast("error", res?.message);
    } else if (res?.data?.user?.role[0] === USER_ROLE.ADMIN) {
      pushToast("error", ERRORS.ACCOUNT_PERMISSION);
    } else {
      dispatch(loginSuccess({ user, token, rememberMe }));
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

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

export const forgotPass = (values) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const res = await http.post("/api/forgot-password", {
      email: values.email
    });

    dispatch(setLoading({ loading: false }));

    if (res.success) {
      pushToast("success", res.status);
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e?.response?.data.message);

    return console.error(e?.response?.data.message);
  }
};
