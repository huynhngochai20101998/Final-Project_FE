import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import http from "core/services/httpService";
import HomeLayout from "layout/HomeLayout/HomeLayout";
import "./Home.scss";
import { Link } from "react-router-dom";
import Loading from "components/Loading/Loading";
import InfinitScroll from "react-infinite-scroll-component";
import moment from "moment";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noMore, setNoMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    async function getDataList() {
      try {
        const response = await http.get("/api/posts?page=1");
        setPostList(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getDataList();
  }, []);

  const fetchPosts = async () => {
    const res = await http.get(`/api/posts?page=${page}`);
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
  return (
    <HomeLayout>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
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
                  {postList.map((post) => {
                    return (
                      <div className="PostList__form" key={post.id}>
                        <div className="PostList__form__info-user">
                          <div>
                            <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
                            <span>Nguyễn Dũng</span>
                          </div>
                          <div>
                            {moment(post.created_at).format("DD/MM/YYYY")}
                          </div>
                        </div>
                        <div className="PostList__form__info-post">
                          <h5>{post.title}</h5>
                          <p>Số lượng thành viên {post.members} người</p>
                          <p>{post.content}</p>
                        </div>
                        <div className="PostList__form__see-more">
                          <Link to={`/post-details/${post.slug}.${post.id}`}>
                            <Button>Xem thêm</Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </InfinitScroll>
              )}
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 "></div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
