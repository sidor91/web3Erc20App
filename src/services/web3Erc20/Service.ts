import Web3, { Contract } from "web3";
import ERC20ABI from "../../constants/erc20ABI.json";
import { TransferArgs } from "./types";
import { transactionErrorHandler } from "../../helpers/transactionErrorHandler";

const { INFURA_API_KEY } = process.env;
const providerUrl = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;

export class Web3Erc20Service {
	private token: string;
	private web3: Web3;
	private contract: Contract<typeof ERC20ABI>;

	constructor(token_addr: string) {
		this.token = token_addr;
		this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
		this.contract = new this.web3.eth.Contract(ERC20ABI, token_addr);
	}

	amountToWei(amount: number) {
		return this.web3.utils.toWei(amount.toString(), "ether");
	}

	amountFromWei(amount: bigint) {
		return this.web3.utils.fromWei(amount.toString(), "ether");
	}

	getWallet(privateKey: string) {
		return this.web3.eth.accounts.wallet.add(`0x${privateKey}`)[0].address;
	}

	private transferMethod(recipient_addr: string, amount: number) {
		return this.contract.methods.transfer(recipient_addr, this.amountToWei(amount));
	}

	async estimateGas(from: string, recipient: string, amount: number) {
		try {
			return await this.transferMethod(recipient, amount).estimateGas({ from });
		} catch (error: unknown) {
			transactionErrorHandler(error, "estimateGas");
		}
	}

	async getBalance(user_addr: string): Promise<{ balance: number } | undefined> {
		try {
			const balance: bigint = await this.contract.methods.balanceOf(user_addr).call();
			return { balance: Number(this.amountFromWei(balance)) };
		} catch (error: unknown) {
			transactionErrorHandler(error, "getBalance");
		}
	}

	async sendTransaction(data: TransferArgs) {
		const { recipient_addr, amount, privateKey } = data;

		try {
			const wallet = this.getWallet(privateKey);
			const gasEstimation = await this.estimateGas(wallet, recipient_addr, amount);

			const { blockHash, blockNumber, gasUsed, transactionHash } = await this.transferMethod(
				recipient_addr,
				amount
			).send({
				from: wallet,
				gas: gasEstimation?.toString(),
			});

			const data = {
				token: this.token,
				blockHash,
				blockNumber: Number(blockNumber),
				gasUsed: this.amountFromWei(gasUsed),
				transactionHash,
				from: wallet,
				to: recipient_addr,
				amount,
			};

			return data;
		} catch (error: unknown) {
			transactionErrorHandler(error, "sendTransaction");
		}
	}
}
