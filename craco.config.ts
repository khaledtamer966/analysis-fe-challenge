export const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@images": path.resolve(__dirname, "src/assets/"),
      "@variables": path.resolve(__dirname, "src/variables/"),
      "@views": path.resolve(__dirname, "src/views/"),
      "@context": path.resolve(__dirname, "src/contexts/"),
    },
  },
};
