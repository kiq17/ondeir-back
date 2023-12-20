import mongoose from "mongoose";
import { loadEnvironmentVariable } from "../utils/loadEnv";

class Mongo {
    static connect(): Promise<typeof mongoose> {
        return mongoose.connect(loadEnvironmentVariable("DB_URL"));
    }

}

export default Mongo;