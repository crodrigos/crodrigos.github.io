import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const font = localFont({
    src: "./fonts/w95fa/w95f.woff2",
    adjustFontFallback: "Arial"
});

export const metadata: Metadata = {
	title: "Rodrigo Santos",
	description: "My personal website :P",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${font.className} h-full antialiased`}>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
