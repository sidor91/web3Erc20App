import { Request, Response, NextFunction } from "express";
import { HttpError, validatePrivateKey } from "../helpers";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	const privateKey = req.headers.authorization?.replace("Bearer ", "");
	if (!privateKey || !validatePrivateKey(privateKey)) {
		next(HttpError(401, "Not authorized"));
	}
	req.privateKey = privateKey;
	next();
};
