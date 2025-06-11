interface WhereGenerator {
    columnName: string;
    operator: "=" | "<>" | ">" | "<" | ">=" | "<=" | "LIKE";
    suffix: "OR" | "AND" | "";
}

/**
 *
 * @param {WhereGenerator[]} config
 * @param {string} prefix
 * @param {string} suffix
 * @returns {string}
 */
export function sqlWhereGenator(
    config: Array<WhereGenerator>,
    prefix: string = "",
    suffix: string = "",
): string {
    let query: string = ` ${prefix} WHERE`;
    config.forEach(
        (element: WhereGenerator, index: number) =>
            (query += ` ${element.columnName} ${element.operator} $${index + 1} ${element.suffix}`),
    );
    return (query += ` ${suffix}`);
}
