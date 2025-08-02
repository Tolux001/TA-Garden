"use client";
import { getTokenFromCookie } from "@/lib/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<
	{ isAuthenticated: boolean; isLoading: boolean } | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = getTokenFromCookie();
		if (!token) {
			setIsAuthenticated(false);
			router.push("/");
		} else {
			setIsAuthenticated(true);
			router.push("/dashboard");
		}
		setIsLoading(false);
	}, [router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
