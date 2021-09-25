import React from "react";

import "./Home.scss";

import {
  HomeUserLayout,
  HomeVisitorLayout
} from "layout/HomeLayout/HomeLayout";

export const HomeVisitor = () => {
  return (
    <HomeVisitorLayout>
      <div>Home visitor</div>
      <div>Home visitor</div>
      <div>Home visitor</div>
    </HomeVisitorLayout>
  );
};

export const HomeUser = () => {
  return (
    <HomeUserLayout>
      <div>Home user</div>
    </HomeUserLayout>
  );
};
