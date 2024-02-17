import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import routes from "./web3/web3Routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet(), cors(), express.json(), morgan("combined"));

app.use(routes);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack); 
	res.status(500).json({ message: err.message || "Server error" });
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

export default app;
