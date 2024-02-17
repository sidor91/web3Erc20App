import { Request, Response } from "express";
import { Web3Service } from "./web3Service";

export const sendTransactionController = async (req: Request, res: Response) => {
	const { token_addr, user_addr, recipient_addr, amount } = req.body;
	const { privateKey } = req;
	const web3Service = new Web3Service(token_addr);

	if (privateKey) {
		const recipe = await web3Service.sendTransaction({ token_addr, user_addr, recipient_addr, amount, privateKey });

		res.status(200).json(recipe);
	}
};

export const getUserBalance = async (req: Request, res: Response) => {
	const { token_addr, user_addr } = req.params;
	const web3Service = new Web3Service(token_addr);
	const balance = await web3Service.getBalance(user_addr);

	res.status(200).json(balance);
};
