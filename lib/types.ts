export interface RawData {
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

export interface TransactionApiResponse {
	statusCode: number;
	message: string;
	data: RawData[];
}

export interface MemberFormData {
	customerName: string;
	customerPhoneNumber: string;
	meterNumber: string;
	meterType: string;
	address: string;
}

export interface APIMember {
	customerName: string;
	customerPhoneNumber: string;
	meterNumber: string;
	address: string;
	meterType: string;
	status: "Active" | "Inactive";
	createdAt: string;
	tariffIndex: string | null;
}

export interface Member {
	id: string;
	fullName: string;
	phoneNumber: string;
	meterNumber: string;
	address: string;
	meterType: string;
	isActive: boolean;
	createdAt?: string;
	trafficIndex?: string | null;
}

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

export interface DashboardStats {
	totalAmount: string;
	noOfTransaction: string;
	totalCommissionPaid: string;
	totalAmountPaid: string;
	totalCommission: string;
}
