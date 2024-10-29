import { useEffect, useState } from "react";

const useSocket = (url: string) => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(url);

    const handleReceivedMessage = (event: { data: string }) => {
      const parsedData = JSON.parse(event.data);
      const price = Number(parsedData.p);
      setData(parseFloat(price.toFixed(2)));
    };

    socket.addEventListener("message", handleReceivedMessage);

    return () => {
      socket.removeEventListener("message", handleReceivedMessage);
      socket.close();
    };
  }, [url]);

  return { data };
};

export default useSocket;
