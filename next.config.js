/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [new URL("https://placehold.co/**")],
    unoptimized: true,
  },
  experimental: {
    dynamicIO: true,
    useCache: true,
  },
};

export default withPayload(config);
