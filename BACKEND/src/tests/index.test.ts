// src/tests/server.test.ts
import request from "supertest";
import { app } from "../index";

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

const newWeight = {
  weight: 70,
  date: new Date("2024-09-12"),
};

describe("Servidor Express", () => {
  describe("Configuración general", () => {
    test('NODE_ENV debe ser "test"', () => {
      expect(process.env.NODE_ENV).toBe("test");
    });
  });

  describe("Ping endpoint", () => {
    it("Debe hacer ping a /api/ping", async () => {
      const res = await request(app).get("/api/ping");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ message: "PONG" });
    });
  });

  describe("Endpoints de autenticación", () => {
    it("Debe registrar un nuevo usuario exitosamente", async () => {
      const response = await request(app)
        .post("/api/register")
        .send(newUser)
        .expect(200); // Asegurarse de que el código de éxito es el que esperas (200 o 201)

      expect(response.text).toBe("Registered");
    });

    it("Debe fallar al registrar un usuario si el correo ya existe", async () => {
      let newUser2 = { ...newUser, username: "test" };

      const response = await request(app)
        .post("/api/register")
        .send(newUser2)
        .expect(400); // Código de error para duplicados

      expect(response.body.message).toContain("User validation failed: email");
    });

    it("Debe hacer login de un usuario exitosamente", async () => {
      const loginData = { email: newUser.email, password: newUser.password };

      const response = await request(app)
        .post("/api/login")
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty("username", newUser.username);
      expect(response.body).toHaveProperty("email", newUser.email);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
      expect(response.body.token).not.toBe(""); // Verificar que el token no está vacío

      token = response.body.token; // Guardar token para futuras pruebas
    });

    it("Debe fallar el login con una contraseña incorrecta", async () => {
      const loginWithWrongData = {
        email: newUser.email,
        password: "wrongPassword123",
      };

      const response = await request(app)
        .post("/api/login")
        .send(loginWithWrongData)
        .expect(400);

      expect(response.text).toBe("Wrong password");
    });

    it("Debe devolver los datos personales del usuario con un token válido", async () => {
      const response = await request(app)
        .get("/api/personal")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("activity");
    });
  });

  describe("Endpoints de comidas", () => {
    it("Debe agregar una nueva comida con token válido", async () => {
      const response = await request(app)
        .post("/api/meals")
        .set("Authorization", `Bearer ${token}`)
        .send({
          date: mealData.date,
          data: mealData.data,
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toContainEqual(mealData.data[0]);
    });

    it("NO debe agregar una comida si no se proporciona un token", async () => {
      const response = await request(app).post("/api/meals").send({
        date: mealData.date,
        data: mealData.data,
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Token missing or invalid");
    });

    it("NO debe permitir agregar comida con un token inválido", async () => {
      const response = await request(app)
        .post("/api/meals")
        .set("Authorization", "Bearer invalid_token")
        .send({
          date: mealData.date,
          data: mealData.data,
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "error",
        "Token missing, invalid or timed out"
      );
    });

    it("Debe obtener las comidas del usuario con un token válido", async () => {
      const response = await request(app)
        .get("/api/meals")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("NO debe obtener comidas si no se proporciona un token", async () => {
      const response = await request(app).get("/api/meals");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Token missing or invalid");
    });

    it("NO debe obtener comidas con un token inválido", async () => {
      const response = await request(app)
        .get("/api/meals")
        .set("Authorization", "Bearer invalid_token");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "error",
        "Token missing, invalid or timed out"
      );
    });
  });

  describe("Endpoints de peso", () => {
    it("Debe añadir un nuevo registro de peso con token válido", async () => {
      const response = await request(app)
        .post("/api/weight")
        .set("Authorization", `Bearer ${token}`)
        .send(newWeight);

      expect(response.status).toBe(200);
      expect(response.body.weight).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            date: new Date(newWeight.date).toISOString(),
            weight: newWeight.weight,
          }),
        ])
      );
    });

    it("Debe devolver el peso del usuario con token válido", async () => {
      const response = await request(app)
        .get("/api/weight")
        .set("Authorization", `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);
      expect(response.body[0].weight).toEqual(newWeight.weight);
    });

    it("Debe devolver un error 400 si ya hay un registro de peso en la misma fecha", async () => {
      const sameDayWeight = { weight: 72, date: newWeight.date };

      const response = await request(app)
        .post("/api/weight")
        .set("Authorization", `Bearer ${token}`)
        .send(sameDayWeight);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Only one weight post per day"
      );
    });

    it("NO debe permitir obtener el peso con un token inválido", async () => {
      const invalidToken = "Bearer invalid_token";

      const response = await request(app)
        .get("/api/weight")
        .set("Authorization", invalidToken)
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "error",
        "Token missing, invalid or timed out"
      );
    });
  });

  describe("Eliminar usuario y datos asociados", () => {
    it("Debe eliminar el usuario y sus entradas si el token es válido", async () => {
      const response = await request(app)
        .delete("/api/eliminate")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Erased from the DB");

      const responseUserData = await request(app)
        .get("/api/personal")
        .set("Authorization", `Bearer ${token}`);

      expect(responseUserData.status).toBe(404);
      expect(responseUserData.body).toHaveProperty("error", "No User");
    });

    it("Debe devolver error 401 si el token es inválido", async () => {
      const response = await request(app)
        .delete("/api/eliminate")
        .set("Authorization", `Bearer invalidtoken`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "error",
        "Token missing, invalid or timed out"
      );
    });
  });
});
