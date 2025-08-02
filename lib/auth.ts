import type { Transaction } from "@/app/dashboard/transactions/page";
interface RawData {
	operationId: string;
	customerName: string;
	customerId: string;
	cardIdentity: string;
	amountCharge: number;
	token: string;
	status: string;
	timeOut?: string;
	timeIn?: string;
}
interface TransactionApiResponse {
	statusCode: number;
	message: string;
	data: RawData[];
}

export const getTokenFromCookie = (): string | null => {
	const match = document.cookie.match(/(^| )token=([^;]+)/);
	return match ? match[2] : null;
};

const apiUrl = "https://admin-paypointapi.macrotech.com.ng/pay-point/";

async function fetchFunction<T = unknown>(
	endpoint: string,
	method: string,
	data?: T
) {
	const token = getTokenFromCookie();
	const request_data = await fetch(`${apiUrl}${endpoint}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			"x-api-key": "28042025",
			Authorization: `Bearer ${token}`,
		},
		body: data ? JSON.stringify(data) : undefined,
	});
	return request_data;
}

// utils/auth.ts
export const loginUser = async (identity: string, password: string) => {
	const res = await fetchFunction("private-estate/login", "POST", {
		identity,
		password,
	});

	const data = await res.json();

	if (!res.ok) throw new Error(data.message || "Login failed");

	// For saving token in cookie
	document.cookie = `token=${data.data.token}; path=/; secure; samesite=strict`;

	return data;
};

export const LogoutUser = () => {
	// Remove the token cookie by setting it to expire in the past
	document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};

export const getDashboardStats = async () => {
	const res = await fetchFunction("private-estate/dashboard-analytics", "GET");

	const data = await res.json();

	if (!res.ok)
		throw new Error(data.message || "Failed to fetch dashboard data");
	return data;
};

export const getTransactions = async (): Promise<Transaction[]> => {
	const res = await fetchFunction("private-estate/transaction-list", "GET");
	const data: TransactionApiResponse = await res.json();
	if (!res.ok) throw new Error(data.message || "Failed to fetch");

	return data.data.map(
		(item): Transaction => ({
			id: item.operationId,
			fullName: item.customerName,
			phoneNumber: item.customerId,
			meterNumber: item.cardIdentity,
			amount: item.amountCharge,
			token: item.token,
			status:
				item.status === "0"
					? "Completed"
					: item.status === "1"
					? "Pending"
					: "Failed",
			date: item.timeOut ?? item.timeIn ?? "",
		})
	);
};

export const getMembers = async () => {
	const res = await fetchFunction("private-estate/list-estate-member", "GET");
	const result = await res.json();

	if (!res.ok || !result?.data?.data) {
		throw new Error(result?.message || "Failed to fetch members");
	}

	const new_data = result.data.data.map((member: any, index: number) => ({
		id: (index + 1).toString(),
		fullName: member.customerName,
		phoneNumber: member.customerPhoneNumber,
		meterNumber: member.meterNumber,
		address: member.address,
		meterType: member.meterType,
		isActive: member.status === "Active",
		createdAt: new Date(member.createdAt).toLocaleDateString(),
		trafficIndex: null,
	}));
	return new_data;
};

export const createMember = async (formData: any) => {
	const res = await fetchFunction(
		"private-estate/create-estate-member",
		"POST",
		formData
	);

	const data = await res.json();
	return data;
};
