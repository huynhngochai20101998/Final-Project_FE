const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});
httpServer.listen(3000);

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log(io.sockets.adapter.rooms);
  socket.on("disconnect", () => {
    console.log(socket.id + " has disconnected");
  });
});
