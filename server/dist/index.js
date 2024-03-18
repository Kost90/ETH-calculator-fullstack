"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const CryptopricesController_1 = require("./controller/CryptopricesController");
dotenv_1.default.config();
const url = process.env.URL_BINANCE;
// Express server
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
// Socket init
const ws = new ws_1.WebSocket(url);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://eth-calculator-fullstack.vercel.app",
        methods: ["GET"],
    },
});
// Soket connection
io.on("connection", (soket) => {
    let intervalId = null;
    soket.on("data", (data) => {
        function getData() {
            return (0, CryptopricesController_1.getCryptoPrices)();
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
//# sourceMappingURL=index.js.map