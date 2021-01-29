const server = require("http").createServer((request, response) => {
  response.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
  });

  response.end("Hey you there");
});

const socketIo = require("socket.io");

const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

// For each client, we're gonna work with a socket
io.on("connection", (socket) => {
  console.log("connection ", socket.id);
  // Its gonna link the user id to the socket
  socket.on("join-room", (roomId, userId) => {
    // Add users to same room
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("disconnect", () => {
      console.log("Disconnected!", roomId, userId);
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

const startServer = () => {
  const { address, port } = server.address();
  console.log(`App running at ${address}:${port}`);
};

server.listen(process.env.PORT || 3001, startServer);
