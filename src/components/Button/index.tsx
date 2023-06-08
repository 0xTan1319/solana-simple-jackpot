export default function Button(props: { bgColor: string, btnText: string, onclickfunction: () => void }) {
    return (
        <button className={`bg-[#${props.bgColor}] uppercase text-white rounded-[8px] w-[130px] py-2 text-[12px]`} onClick={props.onclickfunction}>
            {props.btnText}
        </button>
    )
}