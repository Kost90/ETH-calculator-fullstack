import dotenv from 'dotenv';
import express, { Express } from "express";
import { Server } from "socket.io";
import { WebSocket } from "ws";
import http from "http";
import cors from "cors";
import { getCryptoPrices } from "./controller/CryptopricesController";

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
    origin:
      "https://eth-calculator-fullstack-z6arbsbir-kostiantyn-dontsovs-projects.vercel.app",
    methods: ["GET"],
  },
});

// Soket connection
io.on("connection", (soket) => {
  let intervalId: NodeJS.Timeout | null = null;
  soket.on("data", (data) => {
    function getData() {
      return getCryptoPrices();
    }
    intervalId = setInterval(() => {
      const price = getData();
      soket.broadcast.emit("received_prices", price);
    }, 5000);
  });

  // Listen for disconnect event
  soket.on("disconnect", () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
