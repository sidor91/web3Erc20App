import Web3, { Contract } from "web3";
import { HttpError } from "../helpers/httpError";
import ERC20ABI from "../constants/erc20ABI.json";
import { TransferArgs } from "../constants/globalTypes";

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const providerUrl = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;

export class Web3Service {
	private web3: Web3;
	private contract: Contract<typeof ERC20ABI>;

	constructor(token_addr: string) {
		this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
		this.contract = new this.web3.eth.Contract(ERC20ABI, token_addr);
	}

	amountToWei(amount: number) {
		return this.web3.utils.toWei(amount.toString(), "ether");
	}

	amountFromWei(amount: BigInt) {
		return this.web3.utils.fromWei(amount.toString(), "ether");
	}

	getWallet(privateKey: string) {
		return this.web3.eth.accounts.wallet.add(`0x${privateKey}`)[0].address;
  }
  
  isEnoughBalance(balance: string, amount: number, gasEstimation: BigInt) {
    return Number(balance) > amount + Number(this.amountFromWei(gasEstimation))
  }

	async getBalance(user_addr: string): Promise<any> {
		try {
			const balance: BigInt = await this.contract.methods.balanceOf(user_addr).call();
			return this.amountFromWei(balance);
		} catch (error: any) {
			console.error("Error sending transaction:", error);
			throw HttpError(500, error.message);
		}
	}

	async sendTransaction(data: TransferArgs) {
		const { user_addr, recipient_addr, amount, token_addr, privateKey } = data;
		const wallet = this.getWallet(privateKey);

		try {
      const balance = await this.getBalance(user_addr);
      const transferMethod = this.contract.methods.transfer(recipient_addr, this.amountToWei(amount));
			const gasEstimation = await transferMethod.estimateGas({ from: wallet });
     
      if (!this.isEnoughBalance(balance, amount, gasEstimation)) {
				throw HttpError(400, "The balance is not enough to send transaction");
			}

			const { blockHash, blockNumber, gasUsed, transactionHash } = await transferMethod.send({
				from: wallet,
				gas: gasEstimation.toString(),
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
