import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "@/lib/authContext";

export const metadata: Metadata = {
	title: "MacroTech Estate Portal",
	description: "Admin dashboard for MacroTech Estate management",
	generator: "tolux001.vercel.app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<>
					<AuthProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem
							disableTransitionOnChange>
							{children}
							<Toaster position="top-right" />
						</ThemeProvider>
					</AuthProvider>
				</>
			</body>
		</html>
	);
}
