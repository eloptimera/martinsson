/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Adress dit formulären skickas (POST, JSON). Se README. */
  readonly PUBLIC_FORM_ENDPOINT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
