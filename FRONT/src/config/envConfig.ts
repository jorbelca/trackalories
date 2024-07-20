export let VITE_API_URL: string | undefined;

if (import.meta.env.VITE_APP_TEST === "true") {
  VITE_API_URL = import.meta.env.VITE_API_URL_TEST;
} else if (import.meta.env.VITE_PRODUCTION === "true") {
  VITE_API_URL = import.meta.env.VITE_API_URL_PRODUCTION;
} else {
  VITE_API_URL = import.meta.env.VITE_API_URL;
}

export const NUTRITION_API_URL = import.meta.env.VITE_NUTRITION_API_URL;
export const X_APP_ID = import.meta.env.VITE_X_APP_ID;
export const X_APP_KEY = import.meta.env.VITE_X_APP_KEY;
