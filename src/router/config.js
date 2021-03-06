import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import SignUp from "pages/Authentication/SignUp/SignUp";
import ForgotPassword from "pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/Authentication/ResetPassword/ResetPassword";
import Error from "pages/Error/Error";
import PostCreatrion from "pages/Post/PostCreatrion/PostCreatrion";
import Login from "pages/Authentication/Login/Login";
import PostList from "pages/Post/PostList/PostList";
import { HomeUser } from "pages/Home/Home";

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
    path: "/post-list",
    isPrivate: false,
    exact: true,
    component: PostList
  },
  {
    path: "/post-create",
    isPrivate: false,
    exact: true,
    component: PostCreatrion
  },
  {
    path: "/home",
    isPrivate: false,
    exact: true,
    component: HomeUser
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
