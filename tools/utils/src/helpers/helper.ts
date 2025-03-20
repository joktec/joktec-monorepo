/**
 * Pauses the execution of the current function for the specified number of milliseconds.
 * @async
 * @param {number} n - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} A promise that resolves after the specified number of milliseconds have elapsed.
 *
 * @example
 * // Wait for 500ms before logging a message
 * async function example() {
 *   console.log('Starting...');
 *   await sleep(500);
 *   console.log('Done!');
 * }
 */
export async function sleep(n: number): Promise<void> {
  return n ? new Promise<void>(resolve => setTimeout(resolve, n)) : undefined;
}

/**
 * Returns true if all the specified values are included in the given array.
 * @param {Array<T>} array - The array to search.
 * @param {...T} values - The values to search for in the array.
 * @returns {boolean} True if all values are included in the array, false otherwise.
 *
 * @example
 * includes([1, 2, 3], 2, 3); // true
 * includes(['apple', 'banana', 'cherry'], 'banana', 'kiwi'); // false
 */
export function includes<T>(array: Array<T>, ...values: T[]): boolean {
  if (!array.length || !values.length) return false;
  return values.every(value => array.includes(value));
}

/**
 * Returns true if any of the specified values are included in the given array.
 * @param {Array<T>} array - The array to search.
 * @param {...T} values - The values to search for in the array.
 * @returns {boolean} True if any value is included in the array, false otherwise.
 *
 * @example
 * someIncludes([1, 2, 3], 2, 5); // true
 * someIncludes(['apple', 'banana', 'cherry'], 'orange', 'kiwi'); // false
 */
export function someIncludes<T>(array: Array<T>, ...values: T[]): boolean {
  if (!array.length || !values.length) return false;
  return values.some(value => array.includes(value));
}
