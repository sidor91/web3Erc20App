import { Request, Response, NextFunction } from "express";

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

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;
