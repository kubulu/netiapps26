import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  transpilePackages: ["bootstrap"],
  devIndicators: {
    buildActivity: false,
    autoPrerender: false, // optional, removes other hints
  },
};

export default nextConfig;
