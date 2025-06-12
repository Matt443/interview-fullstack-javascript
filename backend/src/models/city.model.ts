import { connectDB } from "../db";
import { CitySearchQuery } from "../types/api.type";
import { City } from "../types/city.type";
import { WhereGeneratorPattern } from "../types/utils.type";
import {
    createGeneratorConfig,
    createQueryValues,
    sqlInsertGenerator,
    sqlWhereGenator,
} from "../utils/sql.utils";

export default {
    async getCities(queryBooleanArray: boolean[], cityParams: CitySearchQuery): Promise<City[]> {
        const { name, uuid, min, max } = cityParams;
        try {
            const pool = connectDB();
            const queryPattern: WhereGeneratorPattern[] = [
                { columnName: "city_name", operator: "LIKE", suffix: "AND" },
                { columnName: "count", operator: ">=", suffix: "AND" },
                { columnName: "count", operator: "<=", suffix: "AND" },
                { columnName: "uuid", operator: "=", suffix: "AND" },
            ];
            const toConsideration = createGeneratorConfig(queryBooleanArray, queryPattern);
            const whereQuery: string = sqlWhereGenator(toConsideration);
            const query = `SELECT * FROM cities ${whereQuery}`;
            const queryValues = createQueryValues(
                queryBooleanArray,
                [name, min, max, uuid],
                [
                    (element: string) => `%${element}%`,
                    (element: string) => element,
                    (element: string) => element,
                    (element: string) => element,
                ],
            );

            const result = await pool.query(query, queryValues);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async insertCities(cities: City[]): Promise<number> {
        const insertQuery: string = `INSERT INTO cities (id, cityName, count) VALUES ${sqlInsertGenerator(cities.length, 3)}`;
        const citiesValues: Array<Array<string | number>> = [];
        cities.forEach((city: City) => {
            citiesValues.push([city.uuid, city.cityName, city.count]);
        });
        const citiesValuesFlat = citiesValues.flat();
        try {
            const pool = connectDB();
            const result = await pool.query(insertQuery, citiesValuesFlat);
            return result.rowCount || 0;
        } catch (error) {
            console.error(error);
            return 0;
            throw error;
        }
    },
};
