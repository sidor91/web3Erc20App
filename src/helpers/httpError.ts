interface CustomError extends Error {
  code: number;
}

export const HttpError = (code: number, message: string): CustomError => {
	const error = new Error(message) as CustomError;
  error.code = code;
	return error;
};
