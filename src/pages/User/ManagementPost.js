import { React, useState, useEffect } from "react";
import http from "core/services/httpService";
// import Home from "../Home/Home";
import { useParams } from "react-router";
import deFaultAvatar from "../../assets/images/default-avatar.jpg";
import PostList from "../../pages/Home/PostList";
import "./ManagementPost.scss";
import Loading from "components/Loading/Loading";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

function ManagementInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    profile_image_url: "",
    first_name: "",
    last_name: "",
    email: "",
    interest: "",
    school: "",
    description: "",
    posts: [],
    post_registered: [],
    schedules: [],
    fullName: function () {
      let fullName = this.first_name + " " + this.last_name;
      let convertToArray = fullName.toLowerCase().split(" ");
      var result = convertToArray.map(function (val) {
        return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
      });
      return result.join(" ");
    }
  });
  const path = useParams();
  const localUserID = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : "";

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await http.get(
          `/api/profile/user/${path.id === localUserID ? localUserID : path.id}`
        );
        let newUserInfo = response.data;
        setUserInfo((prev) => {
          return {
            ...prev,
            profile_image_url: newUserInfo.profile_image_url,
            first_name: newUserInfo.first_name,
            last_name: newUserInfo.last_name,
            email: newUserInfo.email,
            interest: newUserInfo.interest,
            school: newUserInfo.school,
            description: newUserInfo.description,
            posts: newUserInfo.posts,
            post_registered: newUserInfo.post_registered,
            schedules: newUserInfo.schedules
          };
        });
        testImage(newUserInfo.profile_image_url);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getUserInfo();
  }, []);

  const [toggleIndex, setToggleIndex] = useState("1");

  const toggleTab = (index) => {
    setToggleIndex(index);
  };

  function testImage(URL) {
    var tester = new Image();
    tester.onload = imageFound;
    tester.onerror = imageNotFound;
    tester.src = URL;
  }

  function imageFound() {
    return;
  }

  function imageNotFound() {
    setUserInfo((prev) => {
      return {
        ...prev,
        profile_image_url: deFaultAvatar
      };
    });
  }

  const posts = userInfo.posts.map((post) => {
    return (
      <div className="test" key={post.id}>
        <PostList
          post={post}
          nameuser={userInfo.fullName()}
          image_avatar={userInfo.profile_image_url}
        ></PostList>
      </div>
    );
  });

  const postsRegisters = userInfo.post_registered.map((postsRegister) => {
    return (
      <div className="test" key={postsRegister.id}>
        <PostList post={postsRegister}></PostList>
      </div>
    );
  });

  return (
    <HomeLayout>
      <Loading visible={isLoading} />
      <div className="container container-account-user">
        <div className="row info-user">
          <div className="col col-md-3">
            <div className="user-avatar">
              <img
                src={userInfo.profile_image_url}
                alt={userInfo.fullName()}
              ></img>
            </div>
          </div>
          <div className="col col-md-9">
            <div className="detail-user detail-header">
              <h2>{userInfo.fullName()}</h2>
              <span>{userInfo.email}</span>
            </div>
            <div className="detail-user detail-body row">
              <div className="country col-md-2">
                <h5>{userInfo.school ? "Trường Học" : ""}</h5>
                <p>{userInfo.school}</p>
              </div>
              <div className="interest col-md-2">
                <h5>{userInfo.interest ? "Sở Thích" : ""}</h5>
                <p>{userInfo.interest}</p>
              </div>
            </div>
            <div className="detail-user detail-footer">
              <p>{userInfo.description}</p>
            </div>
          </div>
        </div>
        <div className="user-post-follow">
          <Nav tabs className="container-tabs">
            <NavItem className="tabs-item">
              <NavLink
                className={
                  toggleIndex === "1" ? "active tabs-link" : "tabs-link"
                }
                onClick={() => toggleTab("1")}
              >
                <i className="fas fa-user-edit">
                  <span>Bài viết của tôi</span>
                </i>
              </NavLink>
            </NavItem>
            <NavItem className="tabs-item">
              <NavLink
                className={
                  toggleIndex === "2" ? "active tabs-link" : "tabs-link"
                }
                onClick={() => toggleTab("2")}
              >
                <i className="fas fa-eye">
                  <span>Bài viết đăng ký</span>
                </i>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={toggleIndex} className="tab-content">
            <TabPane tabId="1" id="TabPane-1">
              <Row>
                <Col sm="12">{posts}</Col>
              </Row>
            </TabPane>
            <TabPane tabId="2" id="TabPane-2">
              <Row>
                <Col sm="12">{postsRegisters}</Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </HomeLayout>
  );
}

export default ManagementInfo;
