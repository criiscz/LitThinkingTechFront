import createNextIntlPrugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPrugin();


const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
