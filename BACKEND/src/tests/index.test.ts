// src/tests/server.test.ts
import request from "supertest";
import { app } from "../index";
import mongoose from "mongoose";

const newUser = {
  username: "testUser",
  email: "testuser@example.com",
  password: "securePassword123",
  sex: "Female",
  weight: 65,
  height: 160,
  activity: 1,
  birthdate: new Date("1992-1-12"),
};

const mealData = {
  date: new Date("2024-09-12"),
  data: [
    {
      name: "Pizza",
      calories: 300,
      protein: 12,
      carbs: 36,
      fat: 10,
    },
  ],
};

let token: string;
let userID: number;
describe("Servidor Express", () => {
  //Cerrar la conexión y limpiar  la base de datos después de todas las pruebas
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  test('NODE_ENV should be "test"', () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  // Test básico para verificar si el servidor responde al endpoint /api/ping
  it("ping a /api/ping", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "PONG" });
  });

  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/register")
      .send(newUser)
      .expect(200); // Asegúrate de que el código de éxito es el que esperas (201 o el que uses)

    // Verificar que la respuesta contiene el mensaje "Registered"
    expect(response.text).toBe("Registered");
  });
  it("should fail when email already exists", async () => {
    // Segundo registro con el mismo email - debería fallar
    let newUser2 = { ...newUser };
    newUser2.username = "test";
    const response = await request(app)
      .post("/api/register")
      .send(newUser2)
      .expect(400); // Asumiendo que 400 es el código de error para duplicados

    expect(response.body.message).toContain("User validation failed: email");
  });

  it("should login a user successfully", async () => {
    const loginData = {
      email: newUser.email,
      password: newUser.password,
    };

    const response = await request(app)
      .post("/api/login")
      .send(loginData)
      .expect(200);

    // Verificamos que el cuerpo de la respuesta tenga los campos esperados
    expect(response.body).toHaveProperty("username", newUser.username);
    expect(response.body).toHaveProperty("email", newUser.email);
    expect(response.body).toHaveProperty("activity", newUser.activity);
    expect(response.body).toHaveProperty("height", newUser.height);
    expect(response.body).toHaveProperty("weight", newUser.weight);
    expect(response.body).toHaveProperty("sex", newUser.sex);
    expect(response.body).toHaveProperty(
      "birthdate",
      newUser.birthdate.toISOString()
    );
    expect(response.body).toHaveProperty("token");

    // Validar que el token sea un string y no esté vacío
    expect(typeof response.body.token).toBe("string");
    expect(response.body.token).not.toBe("");
    token = response.body.token;
    userID = response.body.userID;
  });

  it("should fail login with incorrect password", async () => {
    const loginWithWrongData = {
      email: newUser.email,
      password: "wrongPassword123",
    };

    const response = await request(app)
      .post("/api/login")
      .send(loginWithWrongData)
      .expect(400);

    // Verificamos que el mensaje de error esté presente en la respuesta
    expect(response.text).toBe("Wrong password");
  });

  it("Ping to /api/personal using the token stored, should resolve the personal data of the user ", async () => {
    const response = await request(app)
      .get("/api/personal")
      .set("Authorization", `Bearer ${token}`) // Envía el token en el header de autorización
      .send({
        userID: userID,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("activity");
    expect(response.body).toHaveProperty("height");
    expect(response.body).toHaveProperty("weight");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("birthdate");
  });

  it("Debe poder agregar una nueva comida", async () => {
    const response = await request(app)
      .post("/api/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userID: userID,
        date: mealData.date,
        data: mealData.data,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data"); // Asegurarse de que se devuelva la comida
    expect(response.body.data).toContainEqual(mealData.data[0]);
  });

  it("NO Debe poder agregar una nueva comida si no proporciona un token", async () => {
    const response = await request(app).post("/api/meals").send({
      userID: userID,
      date: mealData.date,
      data: mealData.data,
    });
    expect(response.status).toBe(401); // Debe retornar no autorizado
    expect(response.body).toHaveProperty("error", "Token missing or invalid");
  });

  it("No debe permitir agregar una comida con un token inválido", async () => {
    const response = await request(app)
      .post("/api/meals")
      .set("Authorization", "Bearer invalid_token") // Token inválido
      .send({
        userID: userID,
        date: mealData.date,
        data: mealData.data,
      });

    expect(response.status).toBe(401); // Token inválido, no autorizado
    expect(response.body).toHaveProperty(
      "error",
      "Token missing, invalid or timed out"
    );
  });



  it("Debe obtener las comidas del usuario con token válido", async () => {
    const response = await request(app)
      .get("/api/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userID: userID,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Las comidas deberían ser un array
  });

  it("No debe obtener comidas si no se proporciona el token", async () => {
    const response = await request(app).get("/api/meals").send({
      userID: userID,
    });

    expect(response.status).toBe(401); // Sin token, debe ser no autorizado
    expect(response.body).toHaveProperty("error", "Token missing or invalid");
  });

  it("No debe obtener comidas con token inválido", async () => {
    const response = await request(app)
      .get("/api/meals")
      .set("Authorization", "Bearer invalid_token") // Token inválido
      .send({
        userID: userID,
      });

    expect(response.status).toBe(401); // Token inválido, debe ser no autorizado
    expect(response.body).toHaveProperty("error", "Token missing, invalid or timed out");
  });
});
