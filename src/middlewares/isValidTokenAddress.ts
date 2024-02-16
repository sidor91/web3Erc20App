import { Request, Response, NextFunction } from "express";
import { isValidAddress } from "ethereumjs-util";
import { HttpError } from "../helpers/httpError";

export const isValidErc20TokenAddress = (req: Request, res: Response, next: NextFunction) => {
  const tokenAddressBody = req.body.token_addr;
  const tokenAddressParams = req.params.token_addr;

  const tokenAddress = tokenAddressBody || tokenAddressParams;
	try {
		const isValid = isValidAddress(tokenAddress);
		if (!isValid) next(HttpError(400, "Token address is not valid ERC20 token address"));
		next();
	} catch (error) {
		return error;
	}
};
