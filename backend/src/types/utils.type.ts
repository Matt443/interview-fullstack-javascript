export interface WhereGeneratorPattern {
    columnName: string;
    operator: "=" | "<>" | ">" | "<" | ">=" | "<=" | "LIKE";
    suffix: "OR" | "AND" | "";
}
