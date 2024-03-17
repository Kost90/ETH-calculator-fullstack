import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const url = "http://localhost:3000/";

export const socket = io(url);

const useSocket = () => {
  const [data, setData] = useState(0);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      setFooEvents(value);
    }

    socket.on("connect", onConnect);
    socket.emit("data", "hello");
    socket.on("received_prices", (data: any) => {
      setData(data);
    });

    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("received_prices", onFooEvent);
    };
  }, []);

  return { data };
};

export default useSocket;
