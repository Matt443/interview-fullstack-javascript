import { connectDB } from "../db";
import { City } from "../types/city.type";
import { sqlWhereGenator } from "../utils/sql.utils";

export default {
    async getCities(): Promise<City[]> {
        try {
            const pool = connectDB();
            const t =
                "SELECT * FROM cities" +
                sqlWhereGenator([
                    { columnName: "city_name", operator: "LIKE", suffix: "OR" },
                    { columnName: "count", operator: "=", suffix: "" },
                ]);
            const result = await pool.query(t, ["%Be%", 126]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
