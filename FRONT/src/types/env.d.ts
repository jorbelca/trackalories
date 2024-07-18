/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRODUCTION: string;
  readonly VITE_URL_PRODUCTION: string;
  readonly VITE_TEST: string;
  readonly VITE_API_URL_TEST: string;
  readonly VITE_API_URL: string;
  readonly VITE_NUTRITION_API_URL: string;
  readonly VITE_X_APP_ID: string;
  readonly VITE_X_APP_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
