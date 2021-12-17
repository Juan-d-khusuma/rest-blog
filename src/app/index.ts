import * as express from "express";
import * as cors from "cors";

const app = express();

// Middleware configurations
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
