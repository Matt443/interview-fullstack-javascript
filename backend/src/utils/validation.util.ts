/**
 *
 * @param emailToValidate - data to be validated
 * @returns {boolean} - true if data passed a test and false if not
 */
export function emailValidation(emailToValidate: string): boolean {
    const emailRegex = new RegExp(
        `^[a-zA-Z0-9.!#$%&'*+=?^_\`{|}~-]+@[a-zA-Z.0-9!#$%&'*+=?^_\`{|}~-]+[.]+[A-Za-z]{2,4}$`,
    );
    return validationWithRegex(emailToValidate, emailRegex);
}

/**
 *
 * @param stringToValidate - data to be validated
 * @returns {boolean} - true if data passed a test and false if not
 */
export function stringValidation(stringToValidate: string): boolean {
    const specialChars = new RegExp("^[a-zA-Z0-9 .,!?()&@#$%^*_-]+$");
    return validationWithRegex(stringToValidate, specialChars);
}

/**
 *
 * @param stringToValidate - data to be validated
 * @param regex - regex pattern to validate a string
 * @returns {boolean} - true if data passed a test and false if not
 */
export function validationWithRegex(stringToValidate: string, regex: RegExp): boolean {
    if (regex.test(stringToValidate) === true) return true;
    return false;
}

/**
 *
 * @param {string} uuid
 * @returns {boolean}
 */
export function validationUUID(uuid: string) {
    if (
        !validationWithRegex(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    )
        return false;
    return true;
}
/**
 * Checks if every element of an array passes validation
 * @param {Array<any>}array
 * @param {Function} callback
 * @returns {boolean}
 */
export function everyValidation(array: Array<any>, callback: Function): boolean {
    return array.every((element: any) => callback(element));
}

/**
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function isInRange(value: number, min: number, max: number): boolean {
    return value <= max && value >= min;
}

/**
 *
 * @param {Array<any>} array1
 * @param {Array<any>} array2
 * @returns {boolean} - `true` if every index has at least one `true` across the arrays.
 */
export function doubleFunctionValidation(array1: Array<boolean>, array2: Array<boolean>): boolean {
    if (array1.length !== array2.length) return false;
    return array1.every((element: any, index: number) => array1[index] || array2[index]);
}

/**
 *
 * @param {string} name
 * @param {string} count
 * @param {"search" | "insert"} validationType
 * @returns {{result: boolean, queryValidation: boolean[]}}
 */
export function cityValidation(
    name: string,
    min: string,
    max: string,
    id: string = "",
): { result: boolean; queryValidation: boolean[] } {
    const queryLengths: number[] = [name.length, min.length, max.length, id.length];

    const lengthsValidation: boolean[] = queryLengths.map((element: number) =>
        isInRange(element, 0, 0),
    );
    const queryValidation: boolean[] = [
        validationWithRegex(name.replace(/ /g, ""), /^[A-Za-zöüÄÖÜß]+$/),
        validationWithRegex(min, /^[0-9]+$/),
        validationWithRegex(max, /^[0-9]+$/),
        validationUUID(id),
    ];

    if (everyValidation(queryLengths, (element: number) => isInRange(element, 0, 0)))
        return { result: true, queryValidation };
    else if (doubleFunctionValidation(lengthsValidation, queryValidation))
        return { result: true, queryValidation };

    return { result: false, queryValidation };
}

/**
 *
 * @param {string} name
 * @param {string} count
 * @param {string} id
 * @returns {boolean}
 */
export function cityToInsertValidation(name: string, count: string): boolean {
    if (!name || !count) return false;

    if (
        validationWithRegex(name.replace(/ /g, ""), /^[A-Za-zöüÄÖÜß-]+$/) &&
        validationWithRegex(count, /^[0-9]+$/)
    )
        return true;
    if (cityFullValidation(name, count)) return true;
    return false;
}

/**
 *
 * @param {string} name
 * @param {string} count
 * @param {string} id
 * @returns {boolean}
 */
export function cityFullValidation(name: string, count: string): boolean {
    if (!name || !count) return false;
    if (
        !validationWithRegex(name.replace(/ /g, ""), /^[A-Za-zöüÄÖÜß-]+$/) ||
        !validationWithRegex(count, /^[0-9]+$/)
    )
        return false;
    return true;
}
