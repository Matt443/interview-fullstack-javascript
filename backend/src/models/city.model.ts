import { pool } from "../db";
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
    async getCities(
        queryBooleanArray: boolean[],
        cityParams: CitySearchQuery,
    ): Promise<{ rows: City[]; foundAtAll: number }> {
        const { name, uuid, min, max, perPage, page } = cityParams;
        try {
            const queryPattern: WhereGeneratorPattern[] = [
                {
                    columnName: "LOWER(name)",
                    operator: "LIKE LOWER(",
                    suffix: "AND",
                    operatorClose: ")",
                },
                { columnName: "count", operator: ">=", suffix: "AND" },
                { columnName: "count", operator: "<=", suffix: "AND" },
                { columnName: "id", operator: "=", suffix: "AND" },
            ];
            const toConsideration = createGeneratorConfig(queryBooleanArray, queryPattern);
            const whereQuery: string = sqlWhereGenator(toConsideration);
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
            const query = `SELECT * FROM cities ${whereQuery} LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}`;
            const querySum = `SELECT name, id FROM cities ${whereQuery}`;
            const offset: number = (Number(page) - 1) * Number(perPage);
            const foundAtAll: number = (await pool.query(querySum, queryValues)).rowCount || 0;
            const result = await pool.query(query, [...queryValues, perPage, offset]);
            return { rows: result.rows, foundAtAll };
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async insertCities(cities: City[]): Promise<number> {
        const insertQuery: string = `INSERT INTO cities (name, count) VALUES ${sqlInsertGenerator(cities.length, 2)}`;
        const citiesValues: Array<Array<string | number>> = [];
        cities.forEach((city: City) => {
            citiesValues.push([city.name, city.count]);
        });
        const citiesValuesFlat = citiesValues.flat();
        try {
            const result = await pool.query(insertQuery, citiesValuesFlat);
            return result.rowCount || 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async updateCity(id: string, updatedCity: City): Promise<number> {
        const newValues: string = `${createSetOfParams(2, 0, ["name=", "count="])}`;
        const query = `UPDATE cities SET ${newValues} WHERE id=$3`;
        try {
            const result = await pool.query(query, [updatedCity.name, updatedCity.count, id]);
            return result.rowCount || 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async deleteCity(id: string) {
        const query = `DELETE FROM cities WHERE id=$1`;
        try {
            const result = await pool.query(query, [id]);
            return result.rowCount || 0;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async getCityAutocomplete(): Promise<string[]> {
        const query = `SELECT (name) FROM cities LIMIT 1000`;
        try {
            const result = await pool.query(query);
            return result.rows.map((element: { name: string }) => element.name);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async createTableIfNotExists() {
        try {
            const query =
                "CREATE TABLE IF NOT EXISTS cities (id TEXT PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(), name VARCHAR(255) NOT NULL UNIQUE, count INT NOT NULL DEFAULT 0)";
            await pool.query(query);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
