import { isValidPrivate } from "ethereumjs-util";

export function validatePrivateKey(privateKey: string) {
  try {
		const isValid = isValidPrivate(Buffer.from(privateKey, "hex"));
		return isValid;
	} catch (error) {
		return false;
	}
}