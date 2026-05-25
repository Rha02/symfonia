export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <nav className="bg-indigo-600 py-2 flex justify-between px-8">
                <h3 className="text-lg text-indigo-100 font-bold">
                    Navbar
                </h3>
                <button className="bg-indigo-50 text-indigo-800 font-semibold px-2 py-1 rounded hover:bg-indigo-100 transition ease-in-out duration-150">
                    Button
                </button>
            </nav>
            <div>
                {children}
            </div>
        </div>
    );
}