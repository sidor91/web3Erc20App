import { isValidPrivate } from "ethereumjs-util";

export function validatePrivateKey(privateKey: string) {
	return isValidPrivate(Buffer.from(privateKey, "hex"));
}
