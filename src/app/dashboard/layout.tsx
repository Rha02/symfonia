import SearchBar from "@/components/SearchBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <SearchBar />
            <div className="mt-4">
                {children}
            </div>
        </div>
    );
}