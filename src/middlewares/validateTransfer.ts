import {Request, Response, NextFunction} from 'express'
import { transferValidationSchema } from "../schemas/validateTransfer";
import { HttpError } from '../helpers';

export const validateTransfer = (req: Request, res: Response, next: NextFunction) => {
	const { error } = transferValidationSchema.validate(req.body);
	if (error) {
		throw HttpError(400, error.details[0].message);
	}
	next();
};