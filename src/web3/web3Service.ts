import Web3 from "web3";
import { HttpError } from "../helpers/httpError";
import ERC20ABI from "../constants/erc20ABI.json";
import { TransferArgs, BalanceArgs } from "../constants/globalTypes";

export class Erc20Web3Service {
	private web3: Web3;

	constructor(providerUrl: string) {
		this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
	}

	amountToWei(amount: number) {
		return this.web3.utils.toWei(amount.toString(), "ether");
	}

	amountFromWei(amount: BigInt) {
		return this.web3.utils.fromWei(amount.toString(), "ether");
	}

	async getBalance(data: BalanceArgs): Promise<any> {
		try {
			const { user_addr, token_addr } = data;
			const contract = new this.web3.eth.Contract(ERC20ABI, token_addr);
			const balance: BigInt = await contract.methods.balanceOf(user_addr).call();
      
			return this.amountFromWei(balance);
		} catch (error: any) {
			console.error("Error sending transaction:", error);
			throw HttpError(500, error.message);
		}
	}

	async sendTransaction(data: TransferArgs) {
		const { user_addr, recipient_addr, amount, token_addr, privateKey } = data;
		const contract = new this.web3.eth.Contract(ERC20ABI, token_addr);
		const wallet = this.web3.eth.accounts.wallet.add(`0x${privateKey}`);

		try {
			// const allowance = await contract.methods.allowance(user_addr, recipient_addr).call();
      // console.log(`Allowance: ${allowance}`);
      const balance = await this.getBalance({ user_addr, token_addr });
      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = '50000';

      const totalPrice = amount + Number(this.amountFromWei(gasPrice));

      if (Number(balance) < totalPrice) {
        throw HttpError(400, 'Not enough balance for sending transaction');
			}
      
			const {blockHash, blockNumber, gasUsed, transactionHash, events } = await contract.methods.transfer(recipient_addr, this.amountToWei(amount)).send({
				from: wallet[0].address,
				gasPrice: gasPrice.toString(),
				gas: gasLimit,
      });
      
      const data = {
        token: token_addr,
				blockHash,
				blockNumber: Number(blockNumber),
				gasUsed: this.amountFromWei(gasUsed),
				transactionHash,
				from: user_addr,
				to: recipient_addr,
				amount,
			};
      return data;
		} catch (error: any) {
			console.error("Error sending transaction:", error.message);
			throw HttpError(500, error.message);
		}
	}
}
