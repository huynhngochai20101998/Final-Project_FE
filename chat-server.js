const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", function (socket) {
  console.log("co nguoi ket noi" + socket.id);
});
httpServer.listen(5000);
console.log("listening on http://localhost:5000");
