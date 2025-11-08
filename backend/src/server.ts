import app from "./app";

import { env } from "./config/env";
import http from "http";
import { setupSocketServer } from "./sockets";

const server = http.createServer(app);

try {
  setupSocketServer(server);

  server.listen(env.PORT, () => {
    console.log(` Server running on port ${env.PORT}`);
  });
} catch (error) {
  console.error("[ERROR] Server failed to start:", error);
}
