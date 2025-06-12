import { WhereGeneratorPattern } from "../types/utils.type";

/**
 *
 * @param {WhereGeneratorPattern[]} config
 * @param {string} prefix
 * @param {string} suffix
 * @returns {string}
 */
export function sqlWhereGenator(
    config: Array<WhereGeneratorPattern>,
    prefix: string = "",
    suffix: string = "",
): string {
    if (config.length === 0) return "";
    let query: string = `${prefix} WHERE`;

    //Make sure that after last condition will be nothing
    config[config.length - 1].suffix = "";
    config.forEach(
        (element: WhereGeneratorPattern, index: number) =>
            (query += ` ${element.columnName} ${element.operator} $${index + 1} ${element.suffix}`),
    );
    return (query += ` ${suffix}`);
}

/**
 *
 * @param {boolean[]} booleanArray
 * @param {WhereGeneratorPattern[]} pattern
 * @returns {WhereGeneratorPattern[]}
 */
export function createGeneratorConfig(
    booleanArray: boolean[],
    pattern: WhereGeneratorPattern[],
): WhereGeneratorPattern[] {
    return pattern.filter((item: WhereGeneratorPattern, index: number) => booleanArray[index]);
}

/**
 *
 * @param {boolean[]} booleanArray
 * @param {string[]} values
 * @returns {string[]}
 */
export function createQueryValues(
    booleanArray: boolean[],
    values: Array<string | number>,
    callbacks: Function[],
): Array<string | number> {
    return values
        .filter((item: string | number, index: number) => booleanArray[index])
        .map((element: string | number, index) => callbacks[index](String(element)));
}

/**
 *
 * @param {number} quantityOfRows
 * @param {number} quantityOfColumns
 * @returns {string}
 */
export function sqlInsertGenerator(quantityOfRows: number, quantityOfColumns: number): string {
    let insertString = "";
    for (let i = 0; i < quantityOfRows; i++) {
        insertString += `(${createSetOfParams(quantityOfColumns, i * quantityOfColumns)}),`;
    }
    return insertString.slice(0, insertString.length - 1);
}

/**
 *
 * @param {number} quantity
 * @param {number} start
 * @returns {string}
 */
export function createSetOfParams(
    quantity: number,
    start: number = 0,
    paramPrefixes: string[] = Array.from({ length: quantity }, () => ""),
) {
    let paramsString: string = "";
    for (let i = start; i < start + quantity; i++) {
        paramsString += `${paramPrefixes[i % 3]}$${i + 1},`;
    }

    return paramsString.slice(0, paramsString.length - 1);
}
