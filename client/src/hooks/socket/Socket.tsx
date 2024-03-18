import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const url = import.meta.env.VITE_SERVER_URL;

export const socket = io(url);

const useSocket = () => {
  const [data, setData] = useState(0);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log(isConnected)
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log(fooEvents)
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

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("received_prices", onFooEvent);
    };
  }, [socket]);

  return { data };
};

export default useSocket;
