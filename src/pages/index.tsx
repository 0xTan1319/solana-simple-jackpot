import { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

import { TREASURY_ACCOUNTS, connection, program } from "../../program/constant";
import {
  createClaimTx,
  createOpenBoxTx,
  getUserState,
} from "../../program/scripts";
import { AnchorProvider } from "@project-serum/anchor";
import { BarLoader } from "react-spinners";
import { successAlert, errorAlert, infoAlert } from "../components/ToastGroup";

import { BalanceContext } from "../../context/BalanceContext";

const Home: NextPage = () => {
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const [myClaimable, setMyClaimable] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { balance, setBalance } = useContext(BalanceContext);

  useEffect(() => {
    getClaimable();
    // eslint-disable-next-line
  }, [wallet.publicKey, wallet.connected]);

  const getClaimable = async () => {
    if (wallet?.publicKey) {
      let value = await getUserState(wallet.publicKey, program, connection);
      setMyClaimable(value);
    }
  };

  const getBalance = async () => {
    if (wallet?.publicKey) {
      let value = await connection.getBalance(wallet.publicKey);
      setBalance(value);
    } else {
      setBalance(0);
    }
  };

  const openBox = async () => {
    if (anchorWallet?.publicKey) {
      setLoading(true);

      try {
        const tx =
          myClaimable > 0
            ? await createClaimTx(anchorWallet, program)
            : await createOpenBoxTx(anchorWallet, TREASURY_ACCOUNTS, program);

        const provider = new AnchorProvider(connection, anchorWallet, {});
        const txId = await provider.sendAndConfirm(tx, [], {
          commitment: "confirmed",
        });

        console.log("txHash: ", txId);

        getClaimable();
        getBalance();
        successAlert("Transaction completed.");
        setLoading(false);
      } catch (e) {
        console.log(e);
        errorAlert("Failed to click button.");
      }
    } else {
      infoAlert("Please connect your wallet.");
    }
  };

  return (
    <main className="w-full">
      <div className="lg:container mx-auto">
        <div className="w-full text-center gap-[20px] mt-[17px]">
          <h1 className="font-bold text-3xl text-gray">
            {myClaimable > 0
              ? `You earned ${myClaimable.toFixed(3)} SOL`
              : "This button does something sometimes."}
          </h1>

          <button
            className="text-white text-3xl rounded-xl mt-10 px-10 py-5 bg-blue-500 hover:bg-blue-600 transition-all
          duration-300"
            onClick={openBox}
          >
            {myClaimable > 0 ? "Claim" : "Click Me"}
          </button>
        </div>
      </div>
      {loading && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-black flex
      bg-opacity-10 backdrop-blur-md"
        >
          <BarLoader color="black" />
        </div>
      )}
    </main>
  );
};

export default Home;
