"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoPrices = void 0;
const ws_1 = require("ws");
const url = "wss://stream.binance.com:9443/ws/ethusdt@trade";
const ws = new ws_1.WebSocket(url);
let result = null;
let priceCallback = null;
ws.onmessage = (e) => {
    const tradeData = JSON.parse(e.data.toString());
    const price = parseFloat(tradeData.p);
    result = price;
    if (price !== null) {
        return price;
    }
};
const getCryptoPrices = () => {
    priceCallback = result;
    if (priceCallback !== undefined) {
        return priceCallback;
    }
};
exports.getCryptoPrices = getCryptoPrices;
module.exports = { getCryptoPrices: exports.getCryptoPrices };
//# sourceMappingURL=CryptopricesController.js.map