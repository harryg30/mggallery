import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.ts",
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: [".ts", ".js"],
          },
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
              },
            ],
          },
        },
      };
    },
  },
});
