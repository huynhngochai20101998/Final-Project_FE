import React, { useEffect, useState } from "react";
import http from "core/services/httpService";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import "./Home.scss";
import { Link } from "react-router-dom";
import Loading from "components/Loading/Loading";
import InfinitScroll from "react-infinite-scroll-component";
import NoResult from "../../components/Searching/NoResult";
import PostList from "./PostList";
import Filter from "../../components/Filter/Filter";
// import { useSelector } from "react-redux";
const Home = (props) => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noMore, setNoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [noResult, setNoResult] = useState(false);
  let getParameter = props.location.search;

  useEffect(() => {
    async function getDataList() {
      try {
        const response = await http.get(
          `/api/post/search${getParameter ? getParameter : "?"}&page=1`
        );
        setPostList(response.data.data);
        setIsLoading(false);
        setNoResult(false);
      } catch (err) {
        if (getParameter) {
          setNoResult(true);
          setIsLoading(false);
        }
      }
    }
    getDataList();
  }, [getParameter, noResult]);

  const fetchPosts = async () => {
    const res = await http.get(
      `/api/post/search${getParameter ? getParameter : "?q="}&page=${page}`
    );
    return res.data.data;
  };

  const fetchData = async () => {
    const postServer = await fetchPosts();
    setPostList([...postList, ...postServer]);
    if (postServer.length === 0 || postServer.length < 5) {
      setNoMore(false);
    }
    setPage(page + 1);
  };

  const posts = postList.map((post) => {
    return <PostList key={post.id} post={post}></PostList>;
  });
  return (
    <HomeLayout>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 col-md-3 col-lg-3 ">
            <Filter />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <div className="PostList">
              <div className="PostList__add">
                <Link to="/post-creation">
                  <button className="PostList__add-post">
                    <i className="fas fa-plus" aria-hidden="true"></i> Tạo bài
                    viết
                  </button>
                </Link>
              </div>
              {isLoading ? (
                <Loading visible={isLoading} />
              ) : (
                <InfinitScroll
                  dataLength={postList.length}
                  next={fetchData}
                  hasMore={noMore}
                  loader={
                    <div className="text-center">
                      <div
                        className="spinner-grow text-light m-3 "
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div
                        className="spinner-grow text-light m-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div
                        className="spinner-grow text-light m-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                  endMessage=""
                >
                  {noResult ? <NoResult /> : posts}
                </InfinitScroll>
              )}
            </div>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3 "></div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
