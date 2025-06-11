import { CitySearchQuery } from "../types/api.type";

/**
 * Checks if certain param was given
 * @param {AllParamsType} query
 * @param {string} paramName
 * @param {undefined|string} defaultValue - default value when param is nullable
 * @returns {string|false} - returns param value or false if param is not given, if default value is given and param is not given returns default value
 */
export function getQueryParam(
    query: CitySearchQuery,
    paramName: keyof CitySearchQuery,
    defaultValue: string | undefined = undefined,
): string | false | Array<any> | object {
    const param = query[paramName] as string;

    if (param == undefined && defaultValue !== undefined) return defaultValue;
    else if (param == undefined && defaultValue == undefined) return false;

    return param;
}
