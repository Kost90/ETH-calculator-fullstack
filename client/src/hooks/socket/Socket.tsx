import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const url = import.meta.env.VITE_SERVER_URL;

// export const url = "http://localhost:3000";

export const socket = io(url);

const useSocket = () => {
  const [data, setData] = useState(0);
  const [event, setEvents] = useState(false);

  function onReceivedEvent() {
    setEvents(!event);
  }

  useEffect(() => {
    socket.on("received_prices", (data: any) => {
      console.log(data)
      setData(data);
    });

    return () => {
      socket.off("received_prices", onReceivedEvent);
    };
  }, [socket]);

  return { data };
};

export default useSocket;
