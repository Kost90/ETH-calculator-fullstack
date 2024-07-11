import dotenv from "dotenv";
import express, { Express } from "express";
import { Server } from "socket.io";
import { WebSocket } from "ws";
import http from "http";
import cors from "cors";

dotenv.config();

const url = process.env.URL_BINANCE as string;

// Express server
const port = 3000;
const app: Express = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

// Socket init
const ws = new WebSocket(url);
const io = new Server(server, {
  cors: {
    origin: "https://eth-calculator-fullstack.vercel.app/",
    methods:["GET"],
  },
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

ws.on("message", async (event) => {
  let parse = await JSON.parse(event.toString());
  let data = parseFloat(parse.p);
  io.timeout(5000).emit("received_prices", data);
});
