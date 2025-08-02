"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	Users,
	CreditCard,
	FileText,
	LogOut,
	Leaf,
	Menu,
	X,
} from "lucide-react";
import { LogoutUser } from "@/lib/auth";
import toast from "react-hot-toast";

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Members", href: "/dashboard/members", icon: Users },
	{ name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
	{ name: "Reports", href: "/dashboard/reports", icon: FileText },
];

export function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		LogoutUser();
		router.push("/");
		toast.success("Logged out successfully!");
	};

	return (
		<>
			{/* Mobile menu button */}
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<Button
					variant="outline"
					size="icon"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
					{isMobileMenuOpen ? (
						<X className="h-4 w-4 backdrop-blur-sm" />
					) : (
						<Menu className="h-4 w-4" />
					)}
				</Button>
			</div>

			{/* Sidebar */}
			<div
				className={cn(
					"fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				)}>
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
						<div className="bg-green-600 p-2 rounded-lg">
							<Leaf className="h-6 w-6 text-white" />
						</div>
						<span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
							MacroPayPoint
						</span>
					</div>

					{/* Navigation */}
					<nav className="flex-1 px-4 py-6 space-y-2">
						{navigation.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
										isActive
											? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
											: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									)}
									onClick={() => setIsMobileMenuOpen(false)}>
									<item.icon className="h-5 w-5 mr-3" />
									{item.name}
								</Link>
							);
						})}
					</nav>

					{/* Logout */}
					<div className="cursor-pointer px-4 py-4 border-t border-gray-200 dark:border-gray-700">
						<Button
							onClick={handleLogout}
							variant="ghost"
							className=" w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
							<LogOut className="h-5 w-5 mr-3" />
							Logout
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}
		</>
	);
}
