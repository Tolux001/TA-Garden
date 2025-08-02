"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Download, FileText, Calendar, Users } from "lucide-react";

export default function ReportsPage() {
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");
	const [selectedMember, setSelectedMember] = useState("");
	const [reportType, setReportType] = useState("");

	const handleDownloadReport = () => {
		// Simulate report download
		alert("Report download started!");
	};

	const handleViewReport = () => {
		// Simulate report viewing
		alert("Report generated and displayed!");
	};

	const reportTypes = [
		{ value: "transactions", label: "Transaction Report" },
		{ value: "members", label: "Member Report" },
		{ value: "revenue", label: "Revenue Report" },
		{ value: "usage", label: "Usage Report" },
	];

	const members = [
		"John Doe",
		"Jane Smith",
		"Mike Johnson",
		"Sarah Wilson",
		"David Brown",
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Reports
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					Generate and download various reports for analysis
				</p>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Available Reports
						</CardTitle>
						<FileText className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">12</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">This Month</CardTitle>
						<Calendar className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">45</div>
						<p className="text-xs text-gray-500">Reports generated</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Members</CardTitle>
						<Users className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,000</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Data Range</CardTitle>
						<Calendar className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">2Y</div>
						<p className="text-xs text-gray-500">Historical data</p>
					</CardContent>
				</Card>
			</div>

			{/* Report Generation */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Generate Report</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label htmlFor="reportType">Report Type</Label>
							<Select value={reportType} onValueChange={setReportType}>
								<SelectTrigger>
									<SelectValue placeholder="Select report type" />
								</SelectTrigger>
								<SelectContent>
									{reportTypes.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="dateFrom">From Date</Label>
								<Input
									id="dateFrom"
									type="date"
									value={dateFrom}
									onChange={(e) => setDateFrom(e.target.value)}
								/>
							</div>
							<div>
								<Label htmlFor="dateTo">To Date</Label>
								<Input
									id="dateTo"
									type="date"
									value={dateTo}
									onChange={(e) => setDateTo(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<Label htmlFor="member">Filter by Member (Optional)</Label>
							<Select value={selectedMember} onValueChange={setSelectedMember}>
								<SelectTrigger>
									<SelectValue placeholder="Select member" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Members</SelectItem>
									{members.map((member) => (
										<SelectItem key={member} value={member}>
											{member}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex gap-2">
							<Button onClick={handleViewReport} className="flex-1">
								<FileText className="h-4 w-4 mr-2" />
								View Report
							</Button>
							<Button
								onClick={handleDownloadReport}
								variant="outline"
								className="flex-1 bg-transparent">
								<Download className="h-4 w-4 mr-2" />
								Download
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent Reports</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-3 border rounded-lg">
								<div>
									<p className="font-medium">Transaction Report</p>
									<p className="text-sm text-gray-500">
										Generated on Jan 15, 2024
									</p>
								</div>
								<Button size="sm" variant="outline">
									<Download className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex items-center justify-between p-3 border rounded-lg">
								<div>
									<p className="font-medium">Member Report</p>
									<p className="text-sm text-gray-500">
										Generated on Jan 14, 2024
									</p>
								</div>
								<Button size="sm" variant="outline">
									<Download className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex items-center justify-between p-3 border rounded-lg">
								<div>
									<p className="font-medium">Revenue Report</p>
									<p className="text-sm text-gray-500">
										Generated on Jan 13, 2024
									</p>
								</div>
								<Button size="sm" variant="outline">
									<Download className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex items-center justify-between p-3 border rounded-lg">
								<div>
									<p className="font-medium">Usage Report</p>
									<p className="text-sm text-gray-500">
										Generated on Jan 12, 2024
									</p>
								</div>
								<Button size="sm" variant="outline">
									<Download className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Report Templates */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Report Templates</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<Button
							variant="outline"
							className="h-20 flex flex-col bg-transparent">
							<FileText className="h-6 w-6 mb-2" />
							Daily Summary
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col bg-transparent">
							<Calendar className="h-6 w-6 mb-2" />
							Weekly Report
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col bg-transparent">
							<Users className="h-6 w-6 mb-2" />
							Member Activity
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col bg-transparent">
							<Download className="h-6 w-6 mb-2" />
							Export All Data
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
