import { ContractExecutionError } from "web3";
import { HttpError } from "./httpError";

export const transactionErrorHandler = (error: unknown, operation: string) => {
  if (error instanceof ContractExecutionError) {
    const errorMessage = error.innerError?.message || error.message;
		console.error(`Error during ${operation}:`, errorMessage);
		throw HttpError(500, errorMessage);
	} else {
		console.error(`Unexpected error during ${operation}:`, error);
	}
};
