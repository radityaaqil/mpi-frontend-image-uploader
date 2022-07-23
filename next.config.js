/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_S3_BUCKET_ENDPOINT: "sgp1.digitaloceanspaces.com",
    REACT_APP_S3_BUCKET_KEY: "EN7KLGSM2IIEXYSXQG5Y",
    REACT_APP_S3_BUCKET_SECRET: "Ox3K1JPiDcXMUN6kZueMjiHHIi0g3ptK/ttdicQ5y/4",
    REACT_APP_S3_BUCKET_NAME: "mpindo",
    REACT_APP_S3_API_URL: "https://mpindo.sgp1.digitaloceanspaces.com",
    REACT_APP_S3_CDN_URL:
      "https://mpindo.sgp1.cdn.digitaloceanspaces.com/testreact/",
  },
};

module.exports = nextConfig;
