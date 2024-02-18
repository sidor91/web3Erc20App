import { CustomError } from "../constants/globalTypes";

export const HttpError = (code: number, message: string): CustomError => {
	const error = new Error(message) as CustomError;
  error.code = code;
	return error;
};
