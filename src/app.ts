import cors from "cors";
import "dotenv/config";
import express from "express";
import placeRoute from "./routes/placeRoute";
import userRoute from "./routes/userRoute";
import commentRoute from "./routes/commentRoute";
import postRoute from "./routes/postRoute";
import "./utils/translateYup";

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json({ limit: "10mb" }));
        this.server.use(cors());
    }

    routes() {
        this.server.use("/users", userRoute);
        this.server.use("/places", placeRoute);
        this.server.use("/comments", commentRoute);
        this.server.use("/posts", postRoute)
    }
}

export default new App().server;