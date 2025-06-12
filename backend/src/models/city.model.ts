import { connectDB } from "../db";
import { CitySearchQuery } from "../types/api.type";
import { City } from "../types/city.type";
import { WhereGeneratorPattern } from "../types/utils.type";
import {
    createGeneratorConfig,
    createQueryValues,
    createSetOfParams,
    sqlInsertGenerator,
    sqlWhereGenator,
} from "../utils/sql.utils";

export default {
    async getCities(queryBooleanArray: boolean[], cityParams: CitySearchQuery): Promise<City[]> {
        const { name, uuid, min, max } = cityParams;
        try {
            const pool = connectDB();
            const queryPattern: WhereGeneratorPattern[] = [
                { columnName: "LOWER(cityname)", operator: "LIKE LOWER(", suffix: ") AND" },
                { columnName: "count", operator: ">=", suffix: "AND" },
                { columnName: "count", operator: "<=", suffix: "AND" },
                { columnName: "uuid", operator: "=", suffix: "AND" },
            ];
            const toConsideration = createGeneratorConfig(queryBooleanArray, queryPattern);
            const whereQuery: string = sqlWhereGenator(toConsideration);
            const query = `SELECT * FROM cities ${whereQuery}`;
            console.log(query);
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
        const insertQuery: string = `INSERT INTO cities (id, cityname, count) VALUES ${sqlInsertGenerator(cities.length, 3)}`;
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
            throw error;
        }
    },
    async updateCity(id: string, updatedCity: City): Promise<number> {
        const newValues: string = `${createSetOfParams(3, 0, ["id=", "cityname=", "count="])}`;
        const idd = "0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1";
        const query = `UPDATE cities SET ${newValues} WHERE id=$4`;
        try {
            const pool = connectDB();
            const result = await pool.query(query, [
                updatedCity.uuid,
                updatedCity.cityName,
                updatedCity.count,
                id,
            ]);
            return result.rowCount || 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
