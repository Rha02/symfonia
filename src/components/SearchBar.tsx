"use client";
import { useRef, useState } from "react";
import { Search } from "./icons";
import { SearchResult } from "@/models";

export default function SearchBar() {
    const [results, setResults] = useState<SearchResult[]>([])
    const [query, setQuery] = useState("");
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const sendQuery = async (q: string) => {
        if (!q.trim()) return

        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        const data = await res.json();
        setResults(data)
    }

    const onSearch = (e: React.InputEvent<HTMLInputElement>) => {
        const q = e.currentTarget.value;
        setQuery(q)

        // Reset timer if input is updated and timer is not complete
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current)
        }

        debounceTimer.current = setTimeout(() => sendQuery(q), 250);
    }

    return (
        <section className="w-1/2 relative">
            <div className="relative flex items-center border border-indigo-300 shadow rounded-lg overflow-hidden">
                <div className="flex items-center justify-center bg-indigo-500 px-4 py-1 h-full">
                    <Search color="white" width={20} />
                </div>
                <input className="w-full bg-white pl-4 pr-2 py-1 outline-none" type="text" placeholder="Search" onInput={onSearch}/>
            </div>

            { query.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-indigo-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    { results.length > 0 ? (
                        <ul className="px-2 pt-2 pb-1 text-indigo-900">
                            {results.map((result) => (
                                <li key={result.symbol} className="flex justify-between hover:bg-indigo-100 px-2 py-1 rounded transition ease-in-out">
                                    <div>
                                        <h6 className="font-semibold mr-4">
                                            {result.symbol}
                                        </h6>
                                        <p>{result.name}</p>
                                    </div>
                                    <div className="font-semibold">
                                        ${result.price}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="px-4 py-3 text-sm text-gray-400">No results found!</p>
                    )}
                </div>
            ) }
        </section>
    )
}