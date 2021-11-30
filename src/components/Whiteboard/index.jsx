import React, { useEffect } from "react";
import "./WhiteBoard.scss";
// import http from "../../core/services/httpService";
// export default function WhiteBoard(props) {
export default function WhiteBoard() {
  useEffect(async () => {
    //get group info by group_id
    // let wbId = null;
    try {
      // const response = await http.get(`/api/groups/${props.group_id}`);
      // wbId = response.data.group.wb_id;
    } catch (e) {
      console.log(e);
    }
    const script = document.createElement("script");
    script.src = "https://www.whiteboard.team/dist/api.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    script.onload = function () {
      new window.api.WhiteboardTeam("#wt-container", {
        clientId: "8203320339f92298c2afceead3101df9",
        boardCode: "b3b8728f-96c1-4829-a4c7-5c4e2948f4b4"
      });
    };
  }, []);

  return (
    <div>
      {/*<button onClick={test}>test</button>*/}
      <div
        className="fuck"
        style={{
          width: "100%",
          height: "550px",
          backgroundColor: "#3F4156",
          borderRadius: "5px"
        }}
        id="wt-container"
      />
    </div>
  );
}
