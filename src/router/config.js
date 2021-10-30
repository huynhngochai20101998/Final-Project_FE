import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import SignUp from "pages/Authentication/SignUp/SignUp";
import ForgotPassword from "pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/Authentication/ResetPassword/ResetPassword";
import Error from "pages/Error/Error";
import PostCreatrion from "pages/Post/PostCreatrion/PostCreatrion";
import Login from "pages/Authentication/Login/Login";
import Home from "pages/Home/Home";
import PostDetail from "pages/Post/PostDetail/PostDetail";

export const routeConfig = [
  {
    path: "/signup",
    isPrivate: false,
    exact: true,
    component: SignUp
  },
  {
    path: "/login",
    isPrivate: false,
    exact: true,
    component: Login
  },
  {
    path: "/forgot-password",
    isPrivate: false,
    exact: true,
    component: ForgotPassword
  },
  {
    path: "/reset-password",
    isPrivate: false,
    exact: true,
    component: ResetPassword
  },
  {
    path: "/post-creation",
    isPrivate: true,
    exact: true,
    component: PostCreatrion
  },
  {
    path: "/post-details",
    isPrivate: false,
    exact: true,
    component: PostDetail
  },
  {
    path: "/home",
    isPrivate: false,
    exact: true,
    component: Home
  },
  { path: "*", component: Error }
];

const PrivateRoute = (privateProps) => {
  const { user } = useSelector((state) => state.user);

  if (user) return <privateProps.component {...privateProps} />;

  return <Redirect to="/login" />;
};

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) =>
        route.isPrivate ? (
          <PrivateRoute {...route} />
        ) : (
          <route.component {...props} />
        )
      }
    />
  );
};
