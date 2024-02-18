import { Request, Response } from "express";
import { isValidEtherumAddress } from "../../helpers/isValidEtherumAddress";

export const sendTransactionController = async (req: Request, res: Response) => {
	const { recipient_addr, amount } = req.body;
  const { privateKey, web3Service } = req;
  isValidEtherumAddress([recipient_addr]);

  if (privateKey && web3Service) {
		const recipe = await web3Service.sendTransaction({ recipient_addr, amount, privateKey });

		res.status(200).json(recipe);
  } 
};

export const getUserBalance = async (req: Request, res: Response) => {
  const { user_addr } = req.params;
  const { web3Service } = req;
  isValidEtherumAddress([user_addr]);

  if (web3Service) {
    const balance = await web3Service.getBalance(user_addr);

		res.status(200).json(balance);
  }
};
