import Button from "../Button";

export default function NFTCard(props: { imgUrl: string, tokenId: string, description: string, checkAll: boolean }) {
    return (
        <div className="w-full rounded-[8px] relative">
            <img src={props.imgUrl} alt="nftcard" className="rounded-t-[8px] w-full" />
            <div className="bg-black text-white p-[15px] rounded-b-[8px]">
                <h1 className="text-[18px] py-[8px] font-bold">NFT Name : {props.tokenId}</h1>
                <span className="text-[10px] font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis dignissim diam, vitae imperdiet ipsum condimentum quis. Donec velit elit, aliquet in elit ac, congue elementum metus.</span>
            </div>
            <div className="absolute z-50 top-0 right-0">
                <input className="form-check-input appearance-none h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" checked={props.checkAll}  >
                </input>
            </div>
        </div>
    )
}