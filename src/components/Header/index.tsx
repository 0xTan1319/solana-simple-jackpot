import {
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

export default function Header() {
    return (
        <div className="w-full flex justify-between p-[18px] border-b-[1px] border-[#d9d9d9]">
            <div className="font-extrabold text-[28px] text-[#C4ACFF] uppercase">
                <h1>wallet tracking</h1>
            </div>
            <div className="flex gap-[18px] items-center">
                <h1 className="uppercase font-bold text-white">Balance : 100 Sol</h1>
                <div className="bg-violet-500 rounded-xl wallet">
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </div>
            </div>
        </div>
    );
}
