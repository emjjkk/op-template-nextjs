import { FaSpinner } from "react-icons/fa6";

export default function LoadingScreen() {
    return (
        <section className="w-screen h-screen flex flex-col items-center justify-center">
            <FaSpinner className="text-3xl animate-spin mb-5" />
            <p className="text-sm text-slate-500">This is a full-stack template built with NextJS<br />https://github.com/emjjkk/op-template-nextjs</p>
        </section>
    )
}