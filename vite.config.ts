import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import million from "million/compiler";

const ReactCompilerConfig = {
  compilationMode: "annotation",
  sources: filename => {
    return filename.indexOf("src/path/to/dir") !== -1;
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    legacy(),
  ],
});
