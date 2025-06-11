interface WhereGenerator {
    columnName: string;
    operator: "=" | "<>" | ">" | "<" | ">=" | "<=";
    suffix: "OR" | "AND";
}

export function sqlWhereGenator(config: Array<WhereGenerator>) {
    return config.forEach(
        (element: WhereGenerator, index: number) =>
            ` ${element.columnName}${element.operator}$${index} ${element.suffix}`,
    );
}
