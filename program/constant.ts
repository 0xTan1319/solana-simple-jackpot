import { 
    PublicKey, 
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { IDL } from "./idl";

const PROGRAM_ID = new PublicKey(
    "2LcmngU55MzrMPtScPtAx6NHpTfJdiHyqza8RtJbLd1i"
  );

const LAMPORTS = 1000000000;
const MINIMUM_LAMPORTS = 890880;

const GLOBAL_AUTHORITY_SEED = "global-authority";
const SOL_VAULT_SEED = "sol-vault";

const TREASURY_ACCOUNTS = [
    new PublicKey("G2sc5mU3eLRkbRupnupzB3NTzZ85bnc9L1ReAre9dzFU"),
    new PublicKey("kVGZXZHFsZKRmR9DPQHaVQppvuD3LB4H8QzHxsrquTG")
];

let wallet;
let program: any;
const connection = new anchor.web3.Connection(
  anchor.web3.clusterApiUrl("devnet"),
  "confirmed"
);

if (typeof window !== "undefined") {
  let cloneWindow: any = window;
  wallet = cloneWindow;
  const providerInit = new anchor.AnchorProvider(
    connection,
    wallet["solana"],
    anchor.AnchorProvider.defaultOptions()
  );

  program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, providerInit);
}

export {
    LAMPORTS,
    MINIMUM_LAMPORTS,

    GLOBAL_AUTHORITY_SEED,
    SOL_VAULT_SEED,

    TREASURY_ACCOUNTS,

    PROGRAM_ID,
    program,
    connection
}
