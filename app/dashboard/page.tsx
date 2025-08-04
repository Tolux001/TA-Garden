"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, TrendingUp, Receipt } from "lucide-react";
import { getDashboardStats, getMembers } from "@/lib/auth";
import type { Member } from "@/lib/types";
import type { DashboardStats } from "@/lib/types";

export default function DashboardPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [dashboardStats, setDashboardStats] = useState<DashboardStats>();
	const [members, setMembers] = useState<Member[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getDashboardStats();
				setDashboardStats(data);
			} catch (error) {
				console.error("Error fetching dashboard stats:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);
	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const data = await getMembers();
				setMembers(data);
			} catch (err) {
				if (err instanceof Error) {
					console.error(err);
				} else {
					console.error("Unknown error", err);
				}
			}
		};
		fetchMembers();
	}, []);

	const stats = [
		{
			title: "Total Amount",
			value: `₦${dashboardStats?.totalAmount || 0.0}`,
			icon: DollarSign,
			color: "text-blue-600",
			bgColor: "bg-blue-100 dark:bg-blue-900/20",
		},
		{
			title: "No. of Transactions",
			value: `₦${dashboardStats?.noOfTransaction || 0}`,
			icon: ShoppingCart,
			color: "text-green-600",
			bgColor: "bg-green-100 dark:bg-green-900/20",
		},
		{
			title: "Total Commission Paid",
			value: `₦${dashboardStats?.totalCommissionPaid || 0.0}`,
			icon: TrendingUp,
			color: "text-purple-600",
			bgColor: "bg-purple-100 dark:bg-purple-900/20",
		},
		{
			title: "Total Amount Paid",
			value: `₦${dashboardStats?.totalAmountPaid || 0.0}`,
			icon: Receipt,
			color: "text-orange-600",
			bgColor: "bg-orange-100 dark:bg-orange-900/20",
		},
		{
			title: "Total Commission",
			value: `₦${dashboardStats?.totalCommission || 0.0}`,
			icon: DollarSign,
			color: "text-red-600",
			bgColor: "bg-red-100 dark:bg-red-900/20",
		},
	];
	if (isLoading) return <p className="">Loading Dashboard...</p>;

	const activeMembers = members.filter((member) => member.isActive).length;
	const inactiveMembers = members.filter((member) => !member.isActive).length;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Welcome to MacroTech Estate Dashboard
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					Overview of your Estate management system
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
				{stats.map((stat, index) => (
					<Card key={index} className="hover:shadow-lg transition-shadow">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
								{stat.title}
							</CardTitle>
							<div className={`p-2 rounded-full ${stat.bgColor}`}>
								<stat.icon className={`h-4 w-4 ${stat.color}`} />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-gray-900 dark:text-white">
								{stat.value}
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 gap-6">
				{/* <Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<div className="flex-1">
									<p className="text-sm font-medium">New member registered</p>
									<p className="text-xs text-gray-500">
										President Trump - 2 minutes ago
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								<div className="flex-1">
									<p className="text-sm font-medium">
										Token purchase completed-Very poor Man
									</p>
									<p className="text-xs text-gray-500">
										₦50,000 - 5 minutes ago
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
								<div className="flex-1">
									<p className="text-sm font-medium">Member deactivated</p>
									<p className="text-xs text-gray-500">
										President Tinubu - 10 minutes ago
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card> */}

				<Card>
					<CardHeader>
						<CardTitle>Quick Stats</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600 dark:text-gray-400">
									Active Members
								</span>
								<span className="font-semibold">{activeMembers}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600 dark:text-gray-400">
									Inactive Members
								</span>
								<span className="font-semibold">{inactiveMembers}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600 dark:text-gray-400">
									Pending Transactions
								</span>
								<span className="font-semibold">-</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600 dark:text-gray-400">
									This Month&apos;s Revenue
								</span>
								<span className="font-semibold">
									{`₦${dashboardStats?.totalCommission || 0.0}`}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
