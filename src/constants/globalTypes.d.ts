import { Request, Response, NextFunction } from "express";

declare global {
	namespace Express {
		interface Request {
			privateKey?: string;
		}
	}
}

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;
