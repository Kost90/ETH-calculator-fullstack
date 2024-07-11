import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const url = import.meta.env.VITE_SERVER_URL;

// export const url = "http://localhost:3000";

export const socket = io(url);

const useSocket = () => {
  const [data, setData] = useState(0);
  const [event, setEvents] = useState(false);

  function handelChangeEvent() {
    setEvents(!event);
  }

  useEffect(() => {
    const handleReceivedPrices = (data: number) => {
      const price = data;

      console.log(data);
      setData(price);
    };

    socket.on("received_prices", handleReceivedPrices);

    return () => {
      socket.off("received_prices", handelChangeEvent);
    };
  }, []);

  return { data };
};

export default useSocket;
