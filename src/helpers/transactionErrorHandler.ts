import { HttpError } from "./httpError";

export const transactionErrorHandler = (error: unknown, operation: string) => {
  if (error instanceof Error) {
		console.error(`Error during ${operation}:`, error.message);
		throw HttpError(500, error.message);
	} else {
		console.error(`Unexpected error during ${operation}:`, error);
	}
}