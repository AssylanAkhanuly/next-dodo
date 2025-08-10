declare namespace NodeJS {
  export interface ProcessEnv {
    DODO_PAYMENTS_API_KEY: string;
    DODO_PAYMENTS_WEBHOOK_KEY: string;
    DODO_PAYMENTS_RETURN_URL: string;
    DODO_PAYMENTS_ENVIRONMENT: string;
    NEXT_PUBLIC_BASE_URL:string
  }
}
