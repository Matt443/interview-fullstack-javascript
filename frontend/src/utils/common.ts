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
