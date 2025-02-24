import express from "express";
import http from "http";
import { Server } from "socket.io";
import gameSocket from "./socket/gameSocket";

const PORT = process.env.PORT || 8000;
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

gameSocket(io);

httpServer.listen(PORT, () => {
  console.log(`server running on PORT : ${PORT}`);
});
