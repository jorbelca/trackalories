import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"], // Ruta a los archivos de test
  moduleFileExtensions: ["ts", "js"], // Extensiones de archivos que Jest debe manejar
  extensionsToTreatAsEsm: [".ts"], // Trata archivos .ts como módulos ES
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // Asegúrate de que Jest use tu configuración de TypeScript
      useESM: true, // Activa el soporte de módulos ES en ts-jest
    },
  },
  verbose: true, // Muestra información detallada de las pruebas
};

export default config;
