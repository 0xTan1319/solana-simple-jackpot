import * as anchor from '@project-serum/anchor';
import {
    PublicKey,
    Keypair,
    Connection,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';

import {
    LAMPORTS,
    GLOBAL_AUTHORITY_SEED,
    SOL_VAULT_SEED,
    MINIMUM_LAMPORTS,
} from './constant';

import { GlobalPool } from './types';

export const createOpenBoxTx = async (
    wallet: AnchorWallet,
    treasuryAccounts: PublicKey[],
    program: anchor.Program,
) => {
    const userAddress = wallet.publicKey;

    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)], 
        program.programId );
    // console.log('GlobalPool: ', globalPool.toBase58());

    const [solVault, solBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(SOL_VAULT_SEED)], 
        program.programId );
    // console.log('solVault: ', solVault.toBase58());

    const [playerVault, playerBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(SOL_VAULT_SEED), userAddress.toBuffer()], 
        program.programId );
    // console.log('playerVault: ', playerVault.toBase58());

    // console.log("Treasury Accounts:", treasuryAccounts.map((address) => address.toBase58()));

    const tx = await program.methods
        .openBox()
        .accounts({
            player: userAddress, 
            globalPool,
            solVault,
            playerVault, 
            systemProgram: SystemProgram.programId })
        .remainingAccounts(treasuryAccounts.map((address) => {
            return {
                pubkey: address,
                isWritable: true,
                isSigner: false,
            }}))
        .transaction();
    
    return tx;
}

export const createClaimTx = async (
    wallet: AnchorWallet,
    program: anchor.Program,
) => {
    const userAddress = wallet.publicKey;

    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)], 
        program.programId );
    // console.log('GlobalPool: ', globalPool.toBase58());

    const [playerVault, playerBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(SOL_VAULT_SEED), userAddress.toBuffer()], 
        program.programId );
    // console.log('playerVault: ', playerVault.toBase58());

    const tx = await program.methods
        .claimReward()
        .accounts({
            player: userAddress, 
            playerVault, 
            systemProgram: SystemProgram.programId, 
        })
        .transaction();

    return tx;
}

export const getGlobalState = async (program: anchor.Program): Promise<GlobalPool | null> => {

    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)], 
        program.programId );
    // console.log("globalPool: ", globalPool.toBase58());
    try
    {
        let globalState = await program.account.globalPool.fetch(globalPool);
        return globalState as unknown as GlobalPool;
    }
    catch
    {
        return null;
    }
}

export const getUserState = async (
    userAddress: PublicKey, 
    program: anchor.Program, 
    connection: Connection
): Promise<number> => {
    // console.log('userAddress: ', userAddress.toBase58());

    const [playerVault, playerBump] = PublicKey.findProgramAddressSync(
        [Buffer.from(SOL_VAULT_SEED), userAddress.toBuffer()], 
        program.programId );
    // console.log('playerVault: ', playerVault.toBase58());

    let balance = (await connection.getBalance(playerVault) - MINIMUM_LAMPORTS) / 1000000000;
    if (balance < 0)
        balance = 0;
        
    console.log(`Amount: ${balance}`);

    return balance;
}
