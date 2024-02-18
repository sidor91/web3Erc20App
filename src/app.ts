import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import web3Routes from "./services/web3Erc20/Routes";

const app = express();

app.use(helmet(), cors(), express.json(), morgan("combined"));

app.use(web3Routes);

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "Success" });
});

app.use((req: Request, res: Response) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err: Error, req: Request, res: Response) => {
	console.error(err.stack);
	res.status(500).json({ message: err.message || "Server error" });
});

export default app;
