import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import { connection } from "../../../program/constant";
import { BalanceContext } from "../../../context/BalanceContext";
import Head from "next/head";

export default function Header() {
  const wallet = useWallet();
  const [myBalance, setMyBalance] = useState<Number>(0);
  const { balance, setBalance } = useContext(BalanceContext);

  useEffect(() => {
    getBalance();
    // eslint-disable-next-line
  }, [wallet.publicKey, wallet.connected]);

  const getBalance = async () => {
    if (wallet?.publicKey) {
      let value = await connection.getBalance(wallet.publicKey);
      setBalance(value);
    } else {
      setBalance(0);
    }
  };

  return (
    <div className="w-full flex justify-between p-[18px] border-b-[1px] border-[#d9d9d9]">
      <Head>
        <link rel="icon" href="../img/money.png" />
      </Head>
      <div className="font-extrabold text-[28px] text-[#C4ACFF] uppercase">
        {/* <h1>Click button</h1> */}
      </div>
      <div className="flex gap-[18px] items-center">
        <h1 className="font-bold text-gray">
          Balance: {(balance.valueOf() / 1000000000).toFixed(3)} SOL
        </h1>
        <div className="bg-white wallet rounded-md border border-black">
          <WalletModalProvider>
            <WalletMultiButton className="text-black" />
          </WalletModalProvider>
        </div>
      </div>
    </div>
  );
}
