/**
 * Utility types for GenericTable
 * Simplified version without OpenAPI dependencies
 */

/**
 * Helper type to create a properly typed GenericTable entity that satisfies
 * the Record<string, unknown> constraint
 *
 * @example
 * type UserEntity = RecordEntity<User>;
 * // Now UserEntity can be used with GenericTable
 */
export type RecordEntity<T> = T & Record<string, unknown>;
