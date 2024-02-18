import { Request, Response, NextFunction } from "express";
import { Web3Erc20Service } from "../services/web3Erc20/Service";

declare global {
	namespace Express {
		interface Request {
      privateKey?: string;
      web3Service?: Web3Erc20Service;
		}
	}
}

export interface CustomError extends Error {
	code: number;
}

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;
