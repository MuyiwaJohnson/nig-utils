/**
 * Type definitions for Nigerian telecommunications utilities
 * 
 * @fileoverview Core types and interfaces for phone number handling
 * @author Ademuyiwa Johnson
 * @license MIT
 */

/**
 * Nigerian telecommunications provider types
 * Represents the four major telco operators in Nigeria
 * 
 * @public
 */
export type TelcoProvider = 'MTN' | 'GLO' | 'AIRTEL' | '9MOBILE';

/**
 * Phone number format options for input and output formatting
 * 
 * @public
 * @example
 * - `local`: '08031234567' (Nigerian local format)
 * - `international`: '+2348031234567' (International format)
 * - `e164`: '+2348031234567' (E.164 standard format)
 */
export type PhoneFormat = 'local' | 'international' | 'e164';

/**
 * Template literal type for local Nigerian phone numbers starting with '0'
 * @internal
 */
export type LocalPrefix = `0${string}`;

/**
 * Template literal type for international Nigerian phone numbers starting with '+234'
 * @internal
 */
export type InternationalPrefix = `+234${string}`;

/**
 * Template literal type for E.164 format Nigerian phone numbers
 * @internal
 */
export type E164Format = `+234${string}`;

/**
 * Branded type for validated phone numbers to ensure type safety
 * Prevents accidental use of unvalidated strings as phone numbers
 * 
 * @public
 */
export type ValidatedPhone = string & { readonly __brand: 'ValidatedPhone' };

/**
 * Branded type for normalized phone numbers in E.164 format
 * Ensures phone numbers have been processed through normalization
 * 
 * @public
 */
export type NormalizedPhone = string & { readonly __brand: 'NormalizedPhone' };

/**
 * Comprehensive phone number information with validation results
 * Contains all relevant data about a Nigerian phone number
 * 
 * @public
 * @interface PhoneInfo
 * @example
 * ```typescript
 * const info = getPhoneInfo('08031234567');
 * console.log(info.telco); // 'MTN'
 * console.log(info.normalized); // '+2348031234567'
 * ```
 */
export interface PhoneInfo {
  /** Original input phone number as provided */
  readonly original: string;
  /** Normalized phone number in E164 format (+234...) */
  readonly normalized: NormalizedPhone;
  /** Detected telecommunications provider or null if unknown */
  readonly telco: TelcoProvider | null;
  /** Whether the phone number passed validation */
  readonly isValid: boolean;
  /** Format of the original input (local, international, or e164) */
  readonly format: PhoneFormat;
  /** Telco prefix extracted from the number (e.g., '0803') */
  readonly prefix: string;
  /** Phone number without country code prefix */
  readonly number: string;
}

/**
 * Telecommunications provider information and metadata
 * Contains prefixes and details for each Nigerian telco operator
 * 
 * @public
 * @interface TelcoPrefix
 * @example
 * ```typescript
 * const mtnInfo = getTelcoInfo('MTN');
 * console.log(mtnInfo.prefixes); // ['0703', '0803', ...]
 * ```
 */
export interface TelcoPrefix {
  /** Provider name identifier */
  readonly provider: TelcoProvider;
  /** List of phone number prefixes for this provider */
  readonly prefixes: readonly string[];
  /** Human-readable provider description */
  readonly description: string;
}

/**
 * Result type for operations that may fail
 * Provides type-safe error handling without exceptions
 * 
 * @public
 * @template T - The type of successful result data
 * @example
 * ```typescript
 * const result = safeNormalizePhone('invalid');
 * if (result.success) {
 *   console.log('Normalized:', result.data);
 * } else {
 *   console.error('Error:', result.error);
 * }
 * ```
 */
export type PhoneResult<T> = 
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };



/**
 * Performance statistics interface
 * Contains metrics for monitoring library performance
 * 
 * @public
 * @interface PerformanceStats
 */
export interface PerformanceStats {
  /** Number of entries in phone info cache */
  readonly cacheSize: number;
  /** Number of cached regex patterns */
  readonly regexCacheSize: number;
  /** Number of prefix mappings */
  readonly prefixMapSize: number;
}

/**
 * Benchmark result interface
 * Contains timing information for performance measurements
 * 
 * @public
 * @interface BenchmarkResult
 */
export interface BenchmarkResult<T> {
  /** The result of the benchmarked function */
  readonly result: T;
  /** Execution time in milliseconds */
  readonly duration: number;
}

/**
 * Batch benchmark result interface
 * Contains results and timing for batch operations
 * 
 * @public
 * @interface BatchBenchmarkResult
 */
export interface BatchBenchmarkResult<T> {
  /** Array of results from batch operation */
  readonly results: T[];
  /** Average execution time per operation in milliseconds */
  readonly avgDuration: number;
}

/**
 * Phone parts interface
 * Contains components of a split phone number
 * 
 * @public
 * @interface PhoneParts
 */
export interface PhoneParts {
  /** Telco prefix (e.g., '0803') */
  readonly prefix: string;
  /** Detected telco provider or null */
  readonly telco: TelcoProvider | null;
  /** Phone number without country code */
  readonly number: string;
} 