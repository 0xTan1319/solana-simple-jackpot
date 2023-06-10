import { 
    PublicKey, 
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { web3 } from "@project-serum/anchor";

const PROGRAM_ID = new PublicKey(
    "2LcmngU55MzrMPtScPtAx6NHpTfJdiHyqza8RtJbLd1i"
  );

const LAMPORTS = 1000000000;
const MINIMUM_LAMPORTS = 890880;

const GLOBAL_AUTHORITY_SEED = "global-authority";
const SOL_VAULT_SEED = "sol-vault";

const TREASURY_ACCOUNTS = [
    new PublicKey("Gp2ZYRPh5U5jBzVsFZfzpkVR98QrqGn4YfDkqNuggW2a"),
    new PublicKey("8Gbqb5ppmsocN8JMGBLNUHdn9zoZuiA6qzgwEPgN6j71")
];

const connection = new web3.Connection(
//  "https://api.mainnet-beta.solana.com/",
//  "https://try-rpc.mainnet.solana.blockdaemon.tech",
//  "https://rpc.ankr.com/solana/b995cf3ee2ea4970e665b61c6a893dd3af7764417af5276cacb82d0c2743835a",
  "https://solana-mainnet.g.alchemy.com/v2/fBWgXwTU2gd__qrvOkPKsAOaowtBMirU",
  "confirmed"
  );

export {
    LAMPORTS,
    MINIMUM_LAMPORTS,

    GLOBAL_AUTHORITY_SEED,
    SOL_VAULT_SEED,

    TREASURY_ACCOUNTS,

    PROGRAM_ID,
    connection
}
