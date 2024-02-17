import { Request, Response, NextFunction } from "express";

declare global {
	namespace Express {
		interface Request {
			privateKey?: string;
		}
	}
}

export interface TransferArgs {
	recipient_addr: string;
	amount: number;
	privateKey: string;
}

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;
