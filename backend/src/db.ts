import { Pool } from "pg";

export function connectDB() {
    return new Pool();
}
