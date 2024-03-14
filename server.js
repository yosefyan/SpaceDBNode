import express from "express";
import * as url from "url";
import cors from "cors";
import path from "node:path";
import helmet from "helmet";
import { connectToDB } from "./models/dynamicAdapter/dbAdapter.js";
import chalk from "chalk";
import debug from "debug";
import mainApiRouter from "./routes/mainApiRouter.js";
import compression from "compression";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import envAdapter from "./helpers/envAdapter.js";
import { initialUsers } from "./initialData/initialDataService.js";
import session from "express-session";
import "./auth/passportAuth.js";
import loggerAdapter from "./terminalLoggers/loggerAdapter.js";
envAdapter();

const log = debug("app:Connections");
const app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT;

app.use(cors());
app.use(compression());
app.use(loggerAdapter());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api", mainApiRouter);
app.use("/auth", mainApiRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

(async () => {
  await connectToDB;
  await initialUsers();
  console.log(
    chalk.yellow.bold(
      `Server in ${process.env.NODE_ENV} - Running | Port ${PORT}`
    )
  );
  await app.listen(PORT, () =>
    log(
      chalk.yellow.bold(
        `Server in ${process.env.NODE_ENV} - Running | Port ${PORT}`
      )
    )
  );
})();

app.use(errorMiddleware);
