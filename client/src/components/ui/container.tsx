import { useEffect, useState } from "react";
import { useAmount } from "@/context/amount-provider";
import useSocket from "@/hooks/socket/Socket";
import { calcFunc } from "@/lib/utils";

function Container() {
  const [result, setResult] = useState(0);
  const { data } = useSocket();
  const { amount } = useAmount();

  useEffect(() => {
    if (amount > 0) {
      const total = calcFunc(amount, data);
      setResult(total);
    }
  }, [amount]);

  return (
    <div className="md:max-w-96 w-full p-10 border-2 rounded-md">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        You will receive USDT:
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-green-500">
        {result}
      </p>
    </div>
  );
}

export default Container;
