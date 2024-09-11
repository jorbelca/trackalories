// src/tests/server.test.ts
import request from "supertest";
import { app } from "../index";

describe("Servidor Express", () => {
  // src/tests/environment.test.ts
  test('NODE_ENV should be "test"', () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  // Test básico para verificar si el servidor responde al endpoint /api/ping
  it("debería responder con un mensaje en /api/ping", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "PONG" });
  });
});
