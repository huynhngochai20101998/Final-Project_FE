import React, { useState, useRef, useEffect } from "react";
import http from "core/services/httpService";

function ShowHint(props) {
  const [listTitle, setListTitle] = useState([]);
  const [logMessage, setLogMessage] = useState("");
  const typingTimeOutRef = useRef(null);
  const { value } = props.inputvalues;

  useEffect(() => {
    //kiểm tra có sự kiện click vào gợi ý hay không
    if (!props.inputvalues.checkEvent) {
      //clear settime out
      if (typingTimeOutRef.current) {
        clearTimeout(typingTimeOutRef.current);
      }

      //khi người dùng gõ đợi sau 300ms gọi api
      typingTimeOutRef.current = setTimeout(() => {
        async function getTitle() {
          try {
            const response = await http.get(`/api/search/${value}`);
            const newlistTitle = response.data.map((item) => {
              return item;
            });
            setListTitle(newlistTitle);
            props.preparesubmit(newlistTitle); //gửi dữ liệu để submit
          } catch (err) {
            console.log(err);
            setListTitle([]);
            setLogMessage("không tìm thấy");
            props.preparesubmit([]);
          }
        }

        //nếu như input có dữ liệu thì mới thực hiện gọi api
        if (props.inputvalues.value) {
          getTitle();
          setLogMessage("");
        } else {
          setListTitle([]); //nếu input rỗng reset mảng
          setLogMessage(""); //nếu input rỗng reset logmessage
          props.preparesubmit([]);
        }

        return () => {
          setListTitle([]);
        };
      }, 100);
    }
  }, [props.inputvalues.value]); //khi input thay đổi hàm effect thực thi

  //khi người dùng click vào gợi ý truyền dữ liệu vào input và xét lại mảng rỗng
  const onClickText = (data) => {
    props.onclicktext(data);
    setListTitle([]);
  };

  return (
    <ul className="list-result container">
      {listTitle.length === 0 ? (
        <li>{logMessage}</li>
      ) : (
        listTitle.slice(0, 5).map((item) => (
          <li key={item.id} onClick={() => onClickText(item.title)}>
            {item.title}
          </li>
        ))
      )}
    </ul>
  );
}

export default ShowHint;
