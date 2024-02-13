import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log("Request body:", req.body);
	next();
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
