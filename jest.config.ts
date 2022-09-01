module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!craco.config.ts",
  ],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testPathIgnorePatterns: ["/node_modules/", "/__tests__/fixtures/"],
  moduleNameMapper: {
    "^Components/(.+)$": "<rootDir>/src/components/$1",
  },

  verbose: true,
};
