import { Request, Response, NextFunction } from "express";
import { Controller } from "../constants/globalTypes";

export const controllerWrapper = (controller: Controller) => {
	const func = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controller(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return func;
};
