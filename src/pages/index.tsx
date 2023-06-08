import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { PublicKey } from "@solana/web3.js";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { CREATOR_ADDRESS } from "../config";

import Button from "../components/Button";
import NFTCard from "../components/NFTCard";
import { web3 } from '@project-serum/anchor';



export interface NFTType {
  imgUrl: string;
  tokenId: string;
  description: string;
}

const Home: NextPage = () => {
  const wallet = useWallet();
  const [nftList, setNftList] = useState<NFTType[]>([]);
  const [myBalance, setMyBalance] = useState<Number>(0);
  const [selectState, setSlectState] = useState<boolean>(false);

  useEffect(() => {
    getAllNfts();
    // eslint-disable-next-line
  }, [wallet.publicKey, wallet.connected]);

  const selectAll = () => {

  }


  const getAllNfts = async () => {
    const solConnection = new web3.Connection(web3.clusterApiUrl("devnet"));
    if (wallet?.publicKey) {
      let balance = await solConnection.getBalance(wallet.publicKey)
      setMyBalance(balance)
    }

    if (wallet.publicKey === null) return;
    try {
      const nftList = await getParsedNftAccountsByOwner({
        publicAddress: wallet.publicKey.toBase58(),
        connection: solConnection,
      });

      let list: NFTType[] = [];
      if (nftList.length > 0) {
        for (let item of nftList) {
          if (item.data?.creators)
            if (item.data?.creators[0].address === CREATOR_ADDRESS) {

              try {
                const response = await fetch(item?.data.uri, {
                  method: "GET",
                });
                const responsedata = await response.json();
                console.log(responsedata)
                list.push({
                  imgUrl: responsedata.image,
                  tokenId: item?.data.name,
                  description: responsedata.description

                });

              } catch (error) {
                console.error("Unable to fetch data:", error);
              }
            }
        }
      }

      console.log("nftList =>", list)
      setNftList(list);
    } catch (error) {
      console.log(error);
    }
  };

  const selectAllNFT = () => {
    setSlectState(true)
  }
  const clearSelectNFT = () => {
    setSlectState(false)
  }
  const sendNFT = () => {
    setSlectState(false)
  }

  return (
    <main className="w-full">
      <div className="lg:container mx-auto">
        <div className="w-full justify-start flex gap-[20px] mt-[17px]">
          <h1 className="font-bold text-lg text-white">Total NFT : {nftList.length}</h1>
          <h1 className="font-bold text-lg text-white">Balance: {myBalance}</h1>

          <Button bgColor="0797FF" btnText="select all" onclickfunction={selectAllNFT} />
          <Button bgColor="0797FF" btnText="clear" onclickfunction={clearSelectNFT} />
          <Button bgColor="92FF07" btnText="send" onclickfunction={sendNFT} />

        </div>
        <div className="w-full grid grid-cols-4 mt-[27px] gap-[25px]">
          {nftList.length > 0 && nftList.map((data, key) => (
            < NFTCard imgUrl={data.imgUrl} tokenId={data.tokenId} description={data.description} key={key} checkAll={selectState} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
