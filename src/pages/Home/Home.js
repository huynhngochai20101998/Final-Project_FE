import React from "react";

import "./Home.scss";

import {
  HomeUserLayout,
  HomeVisitorLayout
} from "layout/HomeLayout/HomeLayout";

export const HomeVisitor = () => {
  return (
    <HomeVisitorLayout>
      <div>Home</div>
    </HomeVisitorLayout>
  );
};

export const HomeUser = () => {
  return (
    <HomeUserLayout>
      <div>Home</div>
    </HomeUserLayout>
  );
};
