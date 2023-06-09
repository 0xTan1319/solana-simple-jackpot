import { useState, useEffect, useContext, useMemo } from "react";
import type { NextPage } from "next";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

import * as anchor from "@project-serum/anchor";
import { IDL } from "../../program/idl";

import {
  PROGRAM_ID,
  TREASURY_ACCOUNTS,
  connection,
} from "../../program/constant";
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
    if (wallet?.publicKey && anchorWallet) {
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      const program = new anchor.Program(
        IDL as anchor.Idl,
        PROGRAM_ID,
        provider
      );

      let value = await getUserState(wallet.publicKey, program, connection);
      setMyClaimable(value);
    }
  };

  const getBalance = async () => {
    if (wallet?.publicKey) {
      let value = await connection.getBalance(wallet.publicKey);
      console.log("value", value);
      setBalance(value);
    } else {
      setBalance(0);
    }
  };

  const openBox = async () => {
    if (anchorWallet?.publicKey) {
      setLoading(true);

      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      const program = new anchor.Program(
        IDL as anchor.Idl,
        PROGRAM_ID,
        provider
      );

      try {
        const tx =
          myClaimable > 0
            ? await createClaimTx(anchorWallet, program)
            : await createOpenBoxTx(anchorWallet, TREASURY_ACCOUNTS, program);

        const txId = await provider.sendAndConfirm(tx, [], {
          commitment: "confirmed",
        });

        console.log("txHash: ", txId);

        getClaimable();
        getBalance();
        successAlert("Transaction completed.");
      } catch (e) {
        console.log(e);
        errorAlert("Failed to click button.");
      }
    } else {
      infoAlert("Please connect your wallet.");
    }
    setLoading(false);
  };

  return (
    <main className="w-full z-40">
      <div className="lg:container mx-auto">
        <div className="w-full text-center gap-[20px] mt-[17px]">
          <div className="z-40 flex items-center justify-center flex-col absolute top-0 left-0 right-0 bottom-20 space-y-6">
            <h1 className="font-bold text-3xl text-gray">
              {myClaimable > 0
                ? `You earned ${myClaimable.toFixed(3)} SOL`
                : "This button does something sometimes."}
            </h1>
            <button
              className="text-black text-3xl rounded-md px-10 py-5 bg-white transition-all
          duration-300 border border-black hover:bg-gray-900 hover:text-white"
              onClick={openBox}
            >
              {myClaimable > 0 ? "Claim" : "Click Me"}
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-black flex
      bg-opacity-10 backdrop-blur-md z-[51]"
        >
          <BarLoader color="black" />
        </div>
      )}
    </main>
  );
};

export default Home;
