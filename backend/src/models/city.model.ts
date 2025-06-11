import { connectDB } from "../db";
import { City } from "../types/city.type";
import { withDbErrorHandling } from "../utils/error.util";

// export default {
//     async getCities():Promise<City[]> {
//         const pool = connectDB();
//         const cities = await pool.query("SELECT * FROM citiess")
//         return cities.rows
//     }
// }

export const getCities = withDbErrorHandling(async () => {
    const pool = connectDB();
    const result = await pool.query("SELECT * FROM cities");
    return result.rows;
});
