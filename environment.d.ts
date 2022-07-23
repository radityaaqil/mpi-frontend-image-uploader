declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_S3_BUCKET_ENDPOINT: string;
    REACT_APP_S3_BUCKET_KEY: string;
    REACT_APP_S3_BUCKET_SECRET: string;
    REACT_APP_S3_BUCKET_NAME: string;
    REACT_APP_S3_API_URL: string;
    REACT_APP_S3_CDN_URL: string;
  }
}
