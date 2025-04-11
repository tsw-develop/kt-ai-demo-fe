/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend API URL */
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
