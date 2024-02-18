import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers/httpError";
import { Web3Erc20Service } from "../services/web3Erc20/Service";

export const isValidErc20TokenAddress = (req: Request, res: Response, next: NextFunction) => {
  const tokenAddressBody = req.body.token_addr;
  const tokenAddressParams = req.params.token_addr;

  const tokenAddress = tokenAddressBody || tokenAddressParams;
	try {
    const web3Service = new Web3Erc20Service(tokenAddress);
    req.web3Service = web3Service;
		next();
	} catch (error) {
		throw HttpError(400, `${tokenAddress} is not valid ERC20 address`);
	}
};


