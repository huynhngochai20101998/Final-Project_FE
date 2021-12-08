const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", function (socket) {
  console.log("someone join " + socket.id);

  //join room group
  socket.on("join-room", (groupId) => {
    // join group
    socket.join(groupId);
    var roomList = [];
    for (let i of socket.adapter.rooms.keys()) {
      // console.log(i)
      roomList.push(i);
    }
    console.log(socket.adapter.rooms);
    io.sockets.emit("room-list", roomList);
  });
  //server receiver message from client
  socket.on("user-send-message", (data) => {
    console.log(data, socket.id);
    io.sockets.in(data.group_id).emit("server-send-message", data);
  });
  //disconnect
  socket.on("disconnect", () => {
    console.log(socket.id + " has left");
  });
});
console.log("listen on port 5000");
httpServer.listen(5000);
