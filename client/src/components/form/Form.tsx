import { FormEvent, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useAmount } from "@/context/amount-provider";
import { Button } from "../ui/button";

interface IFormData {
  ethAmount: number;
  [key: string]: any;
}

export function Form({ setAmount }: { setAmount: (count: number) => void }) {
  const [isSell, setIsSell] = useState(false);
  const ref = useRef(null);

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data: IFormData = {
      ethAmount: 0,
    };
    const formdata = new FormData(e.currentTarget);
    formdata.forEach((value, key) => (data[key] = value));
    setAmount(Number(data.ethAmount));
    setIsSell(!isSell);
    e.currentTarget.reset();
  };

  return (
    <form
      className="flex flex-col gap-2 p-10 border-2 rounded-md w-full"
      onSubmit={handelSubmit}
    >
      <Label>ETH Amount:</Label>
      <Input type="text" placeholder="Amount" name="ethAmount" required></Input>
      <div className="flex items-center space-x-2">
        <Switch
          id="sell"
          ref={ref}
          name="action"
          value={"sell"}
          onClick={() => {
            setIsSell(!isSell);
          }}
          checked={isSell}
        />
        <Label htmlFor="sell">Sell</Label>
      </div>
      <Button className="w-20" type="submit" disabled={!isSell}>
        Submit
      </Button>
    </form>
  );
}

function FormWrapper() {
  const { setAmount } = useAmount();

  return (
    <div className="flex flex-col items-center justify-center w-full md:max-w-96">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        ETH calculator:
      </h2>
      <Form setAmount={setAmount} />
    </div>
  );
}

export default FormWrapper;
