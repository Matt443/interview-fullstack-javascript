import { connectDB } from "../db";
import { City } from "../types/city.type";

export default {
    async getCities(): Promise<City[]> {
        try {
            const pool = connectDB();
            const result = await pool.query("SELECT * FROM cities");
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
