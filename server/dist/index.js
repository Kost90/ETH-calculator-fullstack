"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        origin: "*",
        methods: ["GET"],
    },
});
ws.on("message", (event) => __awaiter(void 0, void 0, void 0, function* () {
    let parse = yield JSON.parse(event.toString());
    let data = parseFloat(parse.p);
    io.timeout(5000).emit("received_prices", data);
}));
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map