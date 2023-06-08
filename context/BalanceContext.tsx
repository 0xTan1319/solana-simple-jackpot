import React, { createContext, useState } from "react";

interface BalanceContextProps {
  balance: number;
  setBalance: (newBalance: number) => void;
}

export const BalanceContext = createContext<BalanceContextProps>({
  balance: 0,
  setBalance: () => {},
});

export const BalanceProvider: React.FC = ({ children }) => {
  const [balance, setBalance] = useState(0);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
