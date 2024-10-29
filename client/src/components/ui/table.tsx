import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn-ui/table";
import useSocket from "@/hooks/socket/Socket";
import clsx from "clsx";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_URL;

function PriceTable() {
  const { data } = useSocket(url);
  const [prevPrice, setPrevPrice] = useState(0);
  const [prevData, setPrevData] = useState(0);

  useEffect(() => {
    if (prevData > 0) {
      setPrevPrice(prevData);
    }
    setPrevData(data);
  }, [data]);

  return (
    <Table className="w-full md:max-w-96 m-auto mb-10 md:mb-20">
      <TableCaption>A list of current ETH price.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">ETH</TableCell>
          <TableCell
            className={clsx(
              "text-right",
              { "text-green-500": data > prevPrice },
              { "text-red-600": data < prevPrice }
            )}
          >{`${data}$`}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PriceTable;
