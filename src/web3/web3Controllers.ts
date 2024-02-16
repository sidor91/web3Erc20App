import { Request, Response, NextFunction } from "express";
import { Erc20Web3Service } from "./web3Service";

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const web3Service = new Erc20Web3Service(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`);

export const sendTransactionController = async (req: Request, res: Response, next: NextFunction) => {
  const { token_addr, user_addr, recipient_addr, amount } = req.body;
  const { privateKey } = req;

  if (privateKey) {
    const recipe = await web3Service.sendTransaction({ token_addr, user_addr, recipient_addr, amount, privateKey });
    console.log(recipe)
		res.status(200).json(recipe);
	}
  
};

export const getUserBalance = async (req: Request, res: Response, next: NextFunction) => {
  const { token_addr, user_addr } = req.params;
  const balance = await web3Service.getBalance({ token_addr, user_addr });
  
  res.status(200).json(balance);
}