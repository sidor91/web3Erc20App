import { ContractExecutionError } from "web3";
import { HttpError } from "./httpError";

export const transactionErrorHandler = (error: unknown, operation: string) => {
  if (error instanceof ContractExecutionError) {
    const errorMessage = error.innerError?.message || error.message;
    const errorCode = error.innerError.code || error.code;
    
		console.error(`Error during ${operation}:`, errorMessage);
		throw HttpError(errorCode, errorMessage);
	} else if (error instanceof Error) {
    console.error(`Unexpected error during ${operation}:`, error);
    throw HttpError(500, error.message);
	}
};
