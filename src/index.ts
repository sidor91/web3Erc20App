import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import routes from './web3/web3Routes'

const app = express();
const port = process.env.PORT || 3000;

app.use(
	cors(),
	express.json(),
	morgan("combined"),
	// (_, res) => {
	// 	res.status(404).json({ message: "Not found" });
	// }
);

app.use(routes)


app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

export default app;