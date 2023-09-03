// import express from "express";
import express from "express"
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationController from "./6-controllers/vacation-controller";
import config from "./2-utils/config";
import expressFileUpload from "express-fileupload";
import authController from "./6-controllers/auth-controller";
import sanitize from "./3-middleware/sanitize"
import expressRateLimit from "express-rate-limit"

// Create server object
const server = express();

// Allow cors
server.use(cors());

// Read the body json object
server.use(express.json());

server.use('/static',express.static('src/1-assets'))

server.use(
     "/api/",
  expressRateLimit({
    windowMs: 500,
    max: 50,
    message:
      "You have exceeded the allowed amount of times for browsing the site.",
  })
);

// Sanitize  
server.use(sanitize)

// Auth
server.use("/", authController)

// Handle files
server.use(expressFileUpload())

// Routes requests to controllers
server.use("/", vacationController);

// Routes requests to controllers
server.use("/", authController);

// Route not found
server.use("*", routeNotFound);

// Catch all middleware
server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));
