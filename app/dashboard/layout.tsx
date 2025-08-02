"use client";

import type React from "react";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Sidebar />
			<div className="lg:pl-64">
				<Header />
				<main className="p-6">{children}</main>
			</div>
		</div>
	);
}
