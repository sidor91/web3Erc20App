import { agent as request } from "supertest";
import app from "../app";

describe("Test the root path", () => {
	test("It should response the GET method", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test the Not Found path", () => {
	test("It should response the GET method", async () => {
		const response = await request(app).get("/not-found-path");
		expect(response.statusCode).toBe(404);
	});
});
