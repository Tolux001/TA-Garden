"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/auth";
import toast from "react-hot-toast";

export interface Transaction {
	id: string;
	fullName: string;
	phoneNumber: string;
	meterNumber: string;
	amount: number;
	token: string;
	status: "Completed" | "Pending" | "Failed";
	date: string;
}

export default function TransactionsPage() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const data = await getTransactions();
				setTransactions(data);
				if (data === null || data.length === 0) {
					toast.error("No transaction data found");
				}
			} catch (error) {
				console.error("Error fetching transactions:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchTransactions();
	}, []);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Completed":
				return "default";
			case "Pending":
				return "secondary";
			case "Failed":
				return "destructive";
			default:
				return "default";
		}
	};

	const totalAmount = transactions
		.filter((t) => t.status === "Completed")
		.reduce((sum, t) => sum + t.amount, 0);

	// const pendingTransactions = transactions.filter(
	// 	(t) => t.status === "Pending"
	// ).length;TODO

	const completedTransactions = transactions.filter(
		(t) => t.status === "Completed"
	).length;

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Transactions
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					View and manage all estate transactions
				</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Transactions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{transactions.length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Completed</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">
							{completedTransactions}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Amount</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							₦{totalAmount.toLocaleString()}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardHeader>
					<CardTitle>Filter Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search by name, phone, or meter number..."
								className="pl-10"
							/>
						</div>
						<Select>
							<SelectTrigger className="w-full md:w-48">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="failed">Failed</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Transactions Table */}
			<Card>
				<CardHeader>
					<CardTitle>All Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Full Name</TableHead>
									<TableHead>Phone Number</TableHead>
									<TableHead>Meter Number</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Token</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{transactions.map((transaction) => (
									<TableRow key={transaction.id}>
										<TableCell className="font-medium">
											{transaction.fullName}
										</TableCell>
										<TableCell>{transaction.phoneNumber}</TableCell>
										<TableCell>{transaction.meterNumber}</TableCell>
										<TableCell>
											₦{transaction.amount.toLocaleString()}
										</TableCell>
										<TableCell className="font-mono text-sm">
											{transaction.token}
										</TableCell>
										<TableCell>
											<Badge variant={getStatusColor(transaction.status)}>
												{transaction.status}
											</Badge>
										</TableCell>
										<TableCell>
											{new Date(transaction.date).toLocaleDateString()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
