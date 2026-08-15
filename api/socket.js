import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("Bir kullanıcı bağlandı");

      socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
      });

      socket.on("chat file", (fileUrl) => {
        io.emit("chat file", fileUrl);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
