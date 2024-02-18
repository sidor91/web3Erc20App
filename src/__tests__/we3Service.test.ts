import axios from "axios";
import { IncomingMessage, Server, ServerResponse } from "http";
import app from "../app";

const { PORT, MOCK_PRIVATE_KEY, MOCK_USER_ADDRESS, MOCK_TOKEN_ADDRESS, MOCK_RECIPIENT_ADDRESS, MOCK_TRANSFER_AMOUNT } =
	process.env;

 const headers = {
		Authorization: `Bearer ${MOCK_PRIVATE_KEY}`,
		ContentType: "application/json",
 };


describe("Test user balance service method", () => {
	let server: Server<typeof IncomingMessage, typeof ServerResponse>;
	beforeAll( () => (server =  app.listen(PORT)));
  afterAll(() => server.close());

  test("It should return Greater Than Or Equal of 0", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
		const response = await axios.get(`/balance/${MOCK_TOKEN_ADDRESS}/${MOCK_USER_ADDRESS}`, {
			headers,
			baseURL: `http://localhost:${PORT}`,
		});
    expect(response?.data.balance).toBeGreaterThanOrEqual(0);
	});
});

describe("Test transfer controller", () => {
	let server: Server<typeof IncomingMessage, typeof ServerResponse>;
	beforeAll( () => (server = app.listen(PORT)));
	afterAll(() => server.close());

  test("It should return hash started with 0x", async () => {
		const body = {
			token_addr: MOCK_TOKEN_ADDRESS,
			recipient_addr: MOCK_RECIPIENT_ADDRESS,
			amount: Number(MOCK_TRANSFER_AMOUNT),
    };
    
    await new Promise((resolve) => setTimeout(resolve, 2000));

		const response = await axios.post("/transfer", body, { headers, baseURL: `http://localhost:${PORT}` });
		expect(response?.data.blockHash).toMatch(/^0x/);
	});
});
