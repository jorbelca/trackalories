import request from "supertest";
import express from "express";
import pingRouter from "../routes/pingRoutes";

const app = express();
app.use("/api/ping", pingRouter);

describe.skip("Test /api/ping endpoint", () => {
  it("should respond with 200 status and correct message", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "PONG" });
  });
});
