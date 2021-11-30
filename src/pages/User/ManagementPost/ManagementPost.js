import { React, useState, useEffect } from "react";
import http from "core/services/httpService";
// import Home from "../Home/Home";
import { useParams } from "react-router";
import deFaultAvatar from "../../../assets/images/default-avatar.jpg";
import "./ManagementPost.scss";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button
} from "reactstrap";

function ManagementInfo() {
  const [userInfo, setUserInfo] = useState({
    profile_image_url: "",
    first_name: "",
    last_name: "",
    email: "",
    interest: "",
    school: "",
    description: "",
    posts: [],
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
  const localUserID = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await http.get(
          `/api/profile/user/${path.id === localUserID ? localUserID : path.id}`
        );
        let newUserInfo = response.data[0];
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
            schedules: newUserInfo.schedules
          };
        });
        testImage(newUserInfo.profile_image_url);
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

  return (
    <div className="container-account-user">
      <div className="container">
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
                  <span>Bài viết</span>
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
                  <span>Theo dõi</span>
                </i>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={toggleIndex} className="tab-content">
            <TabPane tabId="1" id="TabPane-1">
              <Row>
                <Col sm="12"></Col>
              </Row>
            </TabPane>
            <TabPane tabId="2" id="TabPane-2">
              <Row>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default ManagementInfo;
