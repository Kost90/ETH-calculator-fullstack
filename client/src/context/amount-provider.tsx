import { createContext, useContext, useState } from "react";

type Actions = "buy" | "sell";

type AmountProviderProps = {
  children: React.ReactNode;
  Action?: Actions;
};

type AmountProviderState = {
  amount: number;
  price: number;
  setAmount: (count: number) => void;
  setPrice:(price:number) => void;
};

const initialState: AmountProviderState = {
  amount: 0,
  price: 0,
  setAmount: () => null,
  setPrice:() => null,
};

const AmountProviderContext = createContext<AmountProviderState>(initialState);

export function AmountProvider({
  children,
  Action = "buy",
  ...props
}: AmountProviderProps) {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const value = {
    amount,
    setAmount: (count: number) => {
      setAmount(count);
    },
    price,
    setPrice: (price: number) => {
      setPrice(price);
    },
  };

  return (
    <AmountProviderContext.Provider {...props} value={value}>
      {children}
    </AmountProviderContext.Provider>
  );
}

export const useAmount = () => {
  const context = useContext(AmountProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
