import { isValidAddress } from "ethereumjs-util";
import { HttpError } from "./httpError";

export const isValidEtherumAddress = (addressArr: string[]) => {
	addressArr.map((addr) => {
		if (!isValidAddress(addr)) throw HttpError(400, `${addr} is not valid Etherum address`);
	});
};
