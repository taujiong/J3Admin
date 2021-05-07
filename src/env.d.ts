declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;

    AUTHORITY_URL: string;
    APP_BASE_URL: string;
    API_BASE_URL: string;
  }
}
