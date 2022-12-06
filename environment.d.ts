declare namespace NodeJS {
  export interface ProcessEnv {
    readonly IMAGE_URL: string;
    readonly BIG_IMAGE_URL: string;
    readonly BASE_URL: string;
    readonly API_KEY: string;
  }
}
