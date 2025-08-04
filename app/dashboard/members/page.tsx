"use client";

import { useEffect, useState } from "react";
import { createMember, getMembers } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, UserCheck, UserX } from "lucide-react";
import toast from "react-hot-toast";
import { DialogDescription } from "@radix-ui/react-dialog";
import type { Member } from "@/lib/types";

export default function MembersPage() {
	const [members, setMembers] = useState<Member[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newMember, setNewMember] = useState({
		fullName: "",
		phoneNumber: "",
		meterNumber: "",
		address: "",
		meterType: "",
	});
	const [btnLoading, setBtnLoading] = useState(true);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const data = await getMembers();
				setMembers(data);
			} catch (err) {
				if (err instanceof Error) {
					console.error(err);
					setError(err.message || "Error fetching members");
				} else {
					console.error("Unknown error", err);
					setError("An unexpected error occurred");
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchMembers();
	}, []);

	if (isLoading) return <p className="text-gray-600">Loading members...</p>;
	if (error) return <p className="text-red-600">{error}</p>;

	const activeMembers = members.filter((member) => member.isActive).length;
	const inactiveMembers = members.filter((member) => !member.isActive).length;

	const toggleMemberStatus = (id: string) => {
		setMembers(
			members.map((member) =>
				member.id === id ? { ...member, isActive: !member.isActive } : member
			)
		);
	};

	const handleAddMember = async () => {
		try {
			setBtnLoading(false);
			const payload = {
				customerName: newMember.fullName,
				customerPhoneNumber: newMember.phoneNumber,
				meterNumber: newMember.meterNumber,
				address: newMember.address,
				meterType: newMember.meterType,
			};

			const response = await createMember(payload);

			if (response?.success || response?.message === "Success") {
				const member: Member = {
					id: Date.now().toString(),
					...newMember,
					isActive: true,
				};

				setMembers([...members, member]);
				setNewMember({
					fullName: "",
					phoneNumber: "",
					meterNumber: "",
					address: "",
					meterType: "",
				});
				setIsModalOpen(false);
				toast.success("User added to Testing Estate estate");
			} else if (response?.statusCode === 400) {
				if (newMember.meterType === "") {
					toast.error(response?.data.meterType || "Meter Type cannot be empty");
					setBtnLoading(true);
				} else if (newMember.phoneNumber === "") {
					toast.error(
						response?.data.phoneNumber || "Phone Number cannot be empty"
					);
					setBtnLoading(true);
				} else if (newMember.meterNumber === "") {
					toast.error(
						response?.data.meterNumber || "Meter Number cannot be empty"
					);
					setBtnLoading(true);
				} else if (newMember.address === "") {
					toast.error(response?.data.address || "Address cannot be empty");
					setBtnLoading(true);
				} else {
					toast.error(response?.message);
					setBtnLoading(true);
				}
			} else {
				toast.error("Failed to add member");
				setBtnLoading(true);
			}
		} catch (error: unknown) {
			console.error(error);
			toast.error("An error occurred while creating member.");
			setBtnLoading(true);
		}
	};
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Members
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					Manage estate members and their information
				</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Members</CardTitle>
						<Users className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{members.length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Members
						</CardTitle>
						<UserCheck className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">
							{activeMembers}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Inactive Members
						</CardTitle>
						<UserX className="h-4 w-4 text-red-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-red-600">
							{inactiveMembers}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Members Table */}
			<Card>
				<CardHeader>
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
						<CardTitle>All Members</CardTitle>
						<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
							<DialogTrigger asChild>
								<Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
									<Plus className="h-4 w-4 mr-2" />
									Add New Member
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-md">
								<DialogHeader>
									<DialogTitle>Add New Member</DialogTitle>
								</DialogHeader>

								<div className="space-y-4">
									<div>
										<Label htmlFor="fullName">Customer Name</Label>
										<Input
											id="fullName"
											value={newMember.fullName}
											onChange={(e) =>
												setNewMember({ ...newMember, fullName: e.target.value })
											}
											placeholder="Enter full name"
										/>
									</div>
									<div>
										<Label htmlFor="phoneNumber">Phone Number</Label>
										<Input
											id="phoneNumber"
											value={newMember.phoneNumber}
											onChange={(e) =>
												setNewMember({
													...newMember,
													phoneNumber: e.target.value,
												})
											}
											placeholder="080 xxx xx xxx"
										/>
									</div>
									<div>
										<Label htmlFor="meterNumber">Meter Number</Label>
										<Input
											id="meterNumber"
											value={newMember.meterNumber}
											onChange={(e) =>
												setNewMember({
													...newMember,
													meterNumber: e.target.value,
												})
											}
											placeholder="01XXXXXXXXXXXXX"
										/>
									</div>
									<div>
										<Label htmlFor="address">Address</Label>
										<Input
											id="address"
											value={newMember.address}
											onChange={(e) =>
												setNewMember({ ...newMember, address: e.target.value })
											}
											placeholder="Enter address"
										/>
									</div>
									<div>
										<Label htmlFor="meterType">Meter Type</Label>
										<Input
											id="meterType"
											value={newMember.meterType}
											onChange={(e) =>
												setNewMember({
													...newMember,
													meterType: e.target.value,
												})
											}
											placeholder="Single Phase Meter, Three Phase, etc."
										/>
									</div>
									<Button
										onClick={handleAddMember}
										className=" cursor-pointer w-full bg-green-600 hover:bg-green-700">
										{btnLoading ? "Add Member" : "Adding..."}
									</Button>
									<DialogDescription className="text-xs">
										Modal for adding a new member
									</DialogDescription>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Full Name</TableHead>
									<TableHead>Phone Number</TableHead>
									<TableHead>Meter Number</TableHead>
									<TableHead>Address</TableHead>
									<TableHead>Meter Type</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Activation</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{members.map((member) => (
									<TableRow key={member.id}>
										<TableCell className="font-medium">
											{member.fullName}
										</TableCell>
										<TableCell>{member.phoneNumber}</TableCell>
										<TableCell>{member.meterNumber}</TableCell>
										<TableCell>{member.address}</TableCell>
										<TableCell>
											<Badge
												variant={
													member.meterType === "Prepaid"
														? "default"
														: "secondary"
												}>
												{member.meterType}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge
												variant={member.isActive ? "default" : "destructive"}>
												{member.isActive ? "Active" : "Inactive"}
											</Badge>
										</TableCell>
										<TableCell>
											<Switch
												checked={member.isActive}
												onCheckedChange={() => toggleMemberStatus(member.id)}
											/>
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
