import { Search } from "./icons";

export default function SearchBar() {
    return (
        <section className="w-1/2">
            <div className="relative flex items-center border border-indigo-300 shadow rounded-lg overflow-hidden">
                <div className="flex items-center justify-center bg-indigo-500 px-4 py-1 h-full">
                    <Search color="white" width={20} />
                </div>
                <input className="w-full bg-white pl-4 pr-2 py-1 outline-none" type="text" placeholder="Search" />
            </div>
        </section>
    )
}