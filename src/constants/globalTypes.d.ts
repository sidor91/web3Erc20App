import { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			privateKey?: string;
		}
	}
}

export interface TransferArgs {
	user_addr: string;
	recipient_addr: string;
	amount: number;
	token_addr: string;
	privateKey: string;
}
