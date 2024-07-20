import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

export function loadEnv(): void {
  try {
    const envPath = resolve(__dirname, "../../.env");
    if (existsSync(envPath)) {
      const envConfig = readFileSync(envPath, "utf8");
      envConfig.split("\n").forEach((line) => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const [, key, value] = match;
          if (key && value) {
            process.env[key.trim()] = value.trim();
          }
        }
      });
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
