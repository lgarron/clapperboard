import { barelyServe } from "barely-a-dev-server";

barelyServe({
  entryRoot: "./src",
  dev: false,
  outDir: "dist/web/garron.net/app/clapperboard/",
});
