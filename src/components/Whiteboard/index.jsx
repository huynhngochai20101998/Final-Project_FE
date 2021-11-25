import React, { useEffect } from "react";
import "./WhiteBoard.scss";
export default function WhiteBoard() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.whiteboard.team/dist/api.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    script.onload = function () {
      new window.api.WhiteboardTeam("#wt-container", {
        clientId: "8203320339f92298c2afceead3101df9",
        boardCode: "3a678154-46ef-11ec-81d3-0242ac130003"
      });
    };
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "550px",
        backgroundColor: "#3F4156",
        borderRadius: "5px"
      }}
      id="wt-container"
    ></div>
  );
}
