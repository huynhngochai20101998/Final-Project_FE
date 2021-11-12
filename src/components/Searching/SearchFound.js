import { Button } from "reactstrap";
import "../../pages/Post/PostList/PostList.scss";
import NoResult from "./NoResult";

function SearchResult(props) {
  const { state } = props.location;

  return (
    <div className="PostList">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            {!state || state.length <= 0 ? (
              <NoResult></NoResult>
            ) : (
              state.map((post) => {
                return (
                  <div className="PostList__form" key={post.id}>
                    <div className="PostList__form__info-user">
                      <div>
                        <img src="https://via.placeholder.com/256x186?fbclid=IwAR18p3QwgMQ0wYEmlIqxKZFbDBTFAhNZD8R4VyH6DxWdI6GULxDei-7L87M" />
                        <p>Nguyễn Dũng</p>
                      </div>
                      <div>20/10/2021</div>
                    </div>
                    <div className="PostList__form__info-post">
                      <h5>{post.title}</h5>
                      <p>Số lượng thành viên {post.members} người</p>
                      <p>{post.content}</p>
                    </div>
                    <div className="PostList__form__see-more">
                      <Button>Xem thêm</Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4"></div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
