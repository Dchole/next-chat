declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_SECRET: string;
      GOOGLE_REDIRECT_URI: string;
    }
  }
}
