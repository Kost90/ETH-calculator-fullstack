import { WebSocket } from "ws";

const url = "wss://stream.binance.com:9443/ws/ethusdt@trade";
const ws = new WebSocket(url);

let result: any = null;
let priceCallback = null;

ws.onmessage = (e) => {
  const tradeData = JSON.parse(e.data.toString());
  const price = parseFloat(tradeData.p);
  result = price;
  if (price !== null) {
    return price;
  }
};

export const getCryptoPrices = () => {
  priceCallback = result;
  if (priceCallback !== undefined) {
    return priceCallback;
  }
};

module.exports = { getCryptoPrices };
