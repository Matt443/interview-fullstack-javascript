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

/**
 *
 * @param {Record<string, any>}params
 * @returns {string}
 */
export function createParams(params: Record<string, any>): string {
    let paramsString = "?";

    Object.keys(params).forEach((property: string) => {
        paramsString += `${property}=${params[property]}&`;
    });
    paramsString = paramsString.slice(0, paramsString.length - 1);
    return paramsString;
}
