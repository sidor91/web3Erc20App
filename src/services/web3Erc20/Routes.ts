import express from "express";
import { controllerWrapper } from "../../decorators/controllerWrapper";
import { sendTransactionController, getUserBalance } from "./Controllers";
import { authenticate, isValidErc20TokenAddress } from "../../middlewares";

const router = express.Router();

router.post("/transfer", authenticate, isValidErc20TokenAddress, controllerWrapper(sendTransactionController));

router.get(
	"/balance/:token_addr/:user_addr",
	authenticate,
	isValidErc20TokenAddress,
	controllerWrapper(getUserBalance)
);

export default router;
