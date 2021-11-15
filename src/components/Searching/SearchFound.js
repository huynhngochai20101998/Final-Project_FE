import HomeLayout from "layout/HomeLayout/HomeLayout";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { postDetail } from "store/post";
import "../../pages/Home/Home.scss";
import NoResult from "./NoResult";

function SearchResult(props) {
  const { state } = props.location;
  const dispatch = useDispatch();

  return (
    <HomeLayout>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <div className="PostList">
              {!state || state.length <= 0 ? (
                <NoResult></NoResult>
              ) : (
                state.map((post) => {
                  const formatDate = post.created_at.slice(0, 10).split("-");
                  const datePost = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`;

                  const showPostDetail = () => {
                    dispatch(postDetail(post));
                  };

                  return (
                    <div className="PostList__form" key={post.id}>
                      <div className="PostList__form__info-user">
                        <div>
                          <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
                          <span>Nguyễn Dũng</span>
                        </div>
                        <div>{datePost}</div>
                      </div>
                      <div className="PostList__form__info-post">
                        <h5>{post.title}</h5>
                        <p>Số lượng thành viên {post.members} người</p>
                        <p>{post.content}</p>
                      </div>
                      <div className="PostList__form__see-more">
                        <Button onClick={showPostDetail}>Xem thêm</Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 "></div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default SearchResult;
