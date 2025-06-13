import axios from "axios";
import { City, CityQueryParams } from "../types/models.type";

export async function getCities(
    params: CityQueryParams,
): Promise<{ rows: City[]; foundAtAll: number }> {
    // const {min, max, name, perPage, page} = params;
    try {
        const response = await axios.get(
            `http://localhost:8000/api/v1/cities${createParams(params)}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return { rows: [], foundAtAll: 0 };
    }
}

export async function addCity(city: City): Promise<string> {
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/cities`, {
            cities: [city],
        });
        return response.data.msg;
    } catch (error) {
        console.error(error);
        return "Something went wrong.";
    }
}

export async function deleteCities(ids: string[]): Promise<number[]> {
    try {
        const results: number[] = [];
        await Promise.all(
            ids.map(async (id: string) => {
                const response = await axios.delete(`http://localhost:8000/api/v1/cities/${id}`);
                results.push(response.status);
            }),
        );
        return results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 *
 * @param {Record<string, any>}params
 * @returns {string}
 */
export function createParams(params: CityQueryParams): string {
    let paramsString = "?";

    Object.keys(params).forEach((property: string) => {
        paramsString += `${property}=${params[property as keyof CityQueryParams]}&`;
    });
    paramsString = paramsString.slice(0, paramsString.length - 1);
    return paramsString;
}
