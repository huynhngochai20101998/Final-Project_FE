import React from "react";
import { Route } from "react-router-dom";
// import { useSelector } from "react-redux";

import SignIn from "pages/Authentication/SignIn/SignIn";
import SignUp from "pages/Authentication/SignUp/SignUp";
import VerifyCode from "pages/Authentication/VerifyCode/VerifyCode";
import ForgotPassword from "pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/Authentication/ResetPassword/ResetPassword";
import Commenting from "components/Post/Commenting/Commenting";
import Error from "pages/Error/Error";

export const routeConfig = [
  {
    path: "/signup",
    isPrivate: false,
    exact: true,
    component: SignUp
  },
  {
    path: "/verify-code",
    isPrivate: false,
    exact: true,
    component: VerifyCode
  },
  {
    path: "/signin",
    isPrivate: false,
    exact: true,
    component: SignIn
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
    path: "/test",
    isPrivate: false,
    exact: true,
    component: Commenting
  },
  { path: "*", component: Error }
];

// const PrivateRoute = (privateProps) => {
//   const { user } = useSelector((state) => state.user);

//   if (user) return <privateProps.component {...privateProps} />;

//   return <Redirect to="/login" />;
// };

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={
        (props) => (
          // route.isPrivate ? (
          //   <PrivateRoute {...route} />
          // ) : (
          <route.component {...props} />
        )
        // )
      }
    />
  );
};
