const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", function (socket) {
  //join room group
  socket.on("join-room", (groupId) => {
    // join group
    socket.join(groupId);
    var roomList = [];
    for (let i of socket.adapter.rooms.keys()) {
      // console.log(i)
      roomList.push(i);
    }
    io.sockets.emit("room-list", roomList);
  });
  //server receiver message from client
  socket.on("user-send-message", (data) => {
    io.sockets.in(data.group_id).emit("server-send-message", data);
  });
  //disconnect
  socket.on("disconnect", () => {});
});
httpServer.listen(5000);
