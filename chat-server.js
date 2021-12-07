const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", function (socket) {
  console.log("someone join " + socket.id);
  console.log(socket.adapter.rooms);
  socket.on("disconnect", () => {
    console.log(socket.id + " has left");
  });
});
console.log("listen on port 5000");
httpServer.listen(5000);
