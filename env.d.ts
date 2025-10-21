/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    // añade aquí otras variables VITE_ si las usas
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }