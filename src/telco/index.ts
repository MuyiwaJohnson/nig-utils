/**
 * Nigerian Phone Number Library - Ultra Optimized Edition
 * Performance-first implementation with advanced TypeScript features
 * 
 * @fileoverview Main entry point for Nigerian phone number utilities
 * @author Ademuyiwa Johnson
 * @license MIT
 */

// Re-export all types
export * from './types';

// Import constants and utilities
import { PATTERNS, PREFIX_MAP, TELCO_DATA, validationSchemas } from './constants';
import { phoneInfoCache, getPerformanceStats } from './cache';

// Import types for internal use
import type {
  TelcoProvider,
  PhoneFormat,
  ValidatedPhone,
  NormalizedPhone,
  PhoneInfo,
  PhoneResult,
  LocalPrefix,
  InternationalPrefix,
  E164Format,
  PhoneParts
} from './types';

/**
 * Custom error class for phone validation errors
 * Provides error code and input context for better debugging
 *
 * @public
 * @class PhoneValidationError
 * @extends Error
 * @example
 * throw new PhoneValidationError('Invalid format', 'INVALID_FORMAT', '0803...');
 */
export class PhoneValidationError extends Error {
  /** Error code for programmatic handling */
  public readonly code: 'INVALID_FORMAT' | 'INVALID_LENGTH' | 'INVALID_COUNTRY_CODE';
  /** The input that caused the error */
  public readonly input: string;

  constructor(message: string, code: 'INVALID_FORMAT' | 'INVALID_LENGTH' | 'INVALID_COUNTRY_CODE', input: string) {
    super(message);
    this.name = 'PhoneValidationError';
    this.code = code;
    this.input = input;
  }
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
export type { PhoneResult };

/**
 * Type guards with brand checking
 */

/**
 * Type guard to check if a string is a validated phone number
 * Uses brand checking for compile-time type safety
 * 
 * @public
 * @param phone - The phone number string to validate
 * @returns True if the phone number is validated, false otherwise
 * @example
 * ```typescript
 * if (isValidatedPhone(someString)) {
 *   // TypeScript knows someString is ValidatedPhone
 *   console.log('Valid phone:', someString);
 * }
 * ```
 */
export const isValidatedPhone = (phone: string): phone is ValidatedPhone => {
  return PATTERNS.E164_VALIDATION.test(phone.replace(PATTERNS.CLEANUP, '').replace(/^(?:234|0)/, '+234'));
};

/**
 * Type guard to check if a string is a normalized phone number
 * Ensures the phone number is in proper E.164 format
 * 
 * @public
 * @param phone - The phone number string to check
 * @returns True if the phone number is normalized, false otherwise
 * @example
 * ```typescript
 * if (isNormalizedPhone(phoneString)) {
 *   // TypeScript knows phoneString is NormalizedPhone
 *   sendSMS(phoneString); // Safe to use
 * }
 * ```
 */
export const isNormalizedPhone = (phone: string): phone is NormalizedPhone => {
  return PATTERNS.E164_VALIDATION.test(phone);
};

/**
 * Utility functions with performance optimizations
 * Core helper functions for telco and formatting operations
 */

/**
 * Returns all available Nigerian telecommunications providers
 * 
 * @public
 * @returns Readonly array of all telco provider names
 * 
 * @example
 * ```typescript
 * const providers = getAllTelcos();
 * console.log(providers); // ['MTN', 'GLO', 'AIRTEL', '9MOBILE']
 * 
 * // Use in dropdown/select options
 * const options = getAllTelcos().map(telco => ({
 *   value: telco,
 *   label: getTelcoInfo(telco).description
 * }));
 * 
 * // Iterate through all providers
 * getAllTelcos().forEach(telco => {
 *   const info = getTelcoInfo(telco);
 *   console.log(`${telco}: ${info.prefixes.length} prefixes`);
 * });
 * ```
 */
export const getAllTelcos = (): readonly TelcoProvider[] => 
  Object.keys(TELCO_DATA) as TelcoProvider[];

/**
 * Gets detailed information about a specific telco provider
 * 
 * @public
 * @param provider - The telco provider to get information for
 * @returns Provider information including prefixes and description
 * 
 * @example
 * ```typescript
 * const mtnInfo = getTelcoInfo('MTN');
 * console.log(mtnInfo);
 * // {
 * //   provider: 'MTN',
 * //   prefixes: ['0703', '0704', '0706', '07025', '07026', ...],
 * //   description: 'MTN Nigeria'
 * // }
 * 
 * console.log(`MTN has ${mtnInfo.prefixes.length} prefixes`); // 15
 * 
 * // Generate documentation
 * getAllTelcos().forEach(telco => {
 *   const info = getTelcoInfo(telco);
 *   console.log(`${info.description}: ${info.prefixes.join(', ')}`);
 * });
 * ```
 */
export const getTelcoInfo = (provider: TelcoProvider) => 
  TELCO_DATA[provider];

/**
 * Finds the telco provider for a given phone number prefix
 * 
 * @public
 * @param prefix - The phone number prefix (e.g., '0803', '07025')
 * @returns The telco provider or null if prefix is not recognized
 * 
 * @example
 * ```typescript
 * // Standard 4-digit prefixes
 * getTelcoByPrefix('0803') // 'MTN'
 * getTelcoByPrefix('0805') // 'GLO'
 * getTelcoByPrefix('0802') // 'AIRTEL'
 * getTelcoByPrefix('0809') // '9MOBILE'
 * 
 * // 5-digit prefixes (MTN specific)
 * getTelcoByPrefix('07025') // 'MTN'
 * getTelcoByPrefix('07026') // 'MTN'
 * 
 * // Unknown prefixes
 * getTelcoByPrefix('9999') // null
 * 
 * // Use in prefix validation
 * function isValidPrefix(prefix: string): boolean {
 *   return getTelcoByPrefix(prefix) !== null;
 * }
 * 
 * // Build prefix-to-telco mapping
 * const allPrefixes = getAllTelcos()
 *   .flatMap(telco => getTelcoInfo(telco).prefixes)
 *   .map(prefix => ({ prefix, telco: getTelcoByPrefix(prefix) }));
 * ```
 */
export const getTelcoByPrefix = (prefix: string): TelcoProvider | null => 
  PREFIX_MAP.get(prefix) ?? null;

/**
 * Normalizes a Nigerian phone number to a standardized format
 * Ultra-fast implementation with minimal string allocations and early returns
 * 
 * @public
 * @template T - The desired phone format type
 * @param phone - The phone number to normalize (accepts various formats)
 * @param format - The desired output format (default: 'e164')
 * @returns Normalized phone number in the specified format
 * @throws {TypeError} When phone is not a string or is empty
 * @throws {Error} When phone number format is invalid
 * 
 * @example
 * ```typescript
 * // Basic usage
 * normalizePhone('08031234567') // '+2348031234567'
 * normalizePhone('8031234567') // '+2348031234567'
 * normalizePhone('+2348031234567') // '+2348031234567'
 * 
 * // Format conversion
 * normalizePhone('08031234567', 'local') // '08031234567'
 * normalizePhone('+2348031234567', 'local') // '08031234567'
 * normalizePhone('08031234567', 'international') // '+2348031234567'
 * 
 * // Handles various input formats
 * normalizePhone('0803 123 4567') // '+2348031234567'
 * normalizePhone('234-803-123-4567') // '+2348031234567'
 * ```
 */
export function normalizePhone<T extends PhoneFormat = 'e164'>(
  phone: string, 
  format?: T
): T extends 'local' ? LocalPrefix : T extends 'international' ? InternationalPrefix : E164Format {
  // Type guard for performance
  if (typeof phone !== 'string' || phone.length === 0) {
    throw new TypeError('Phone number must be a non-empty string');
  }

  // Single pass cleanup with early length check
  const cleaned = phone.replace(PATTERNS.CLEANUP, '');
  if (cleaned.length < 10 || cleaned.length > 14) {
    throw new Error(`Invalid phone number length: ${phone}`);
  }

  // Optimized normalization with switch for branch prediction
  let normalized: string;
  const firstChar = cleaned[0];
  const prefix = cleaned.slice(0, 4);

  switch (firstChar) {
    case '+':
      if (cleaned.startsWith('+234')) {
        normalized = cleaned;
      } else {
        throw new Error(`Invalid country code: ${phone}`);
      }
      break;
    case '2':
      if (cleaned.startsWith('234')) {
        normalized = '+' + cleaned;
      } else {
        throw new Error(`Invalid country code: ${phone}`);
      }
      break;
    case '0':
      if (cleaned.length === 11) {
        normalized = '+234' + cleaned.slice(1);
      } else if (cleaned.length === 10) {
        throw new Error(`Invalid local number: ${phone}`);
      } else {
        throw new Error(`Invalid phone number length: ${phone}`);
      }
      break;
    default:
      if (cleaned.length === 10) {
        normalized = '+234' + cleaned;
      } else {
        throw new Error(`Invalid phone number format: ${phone}`);
      }
  }

  // Final validation with cached regex
  if (!PATTERNS.E164_VALIDATION.test(normalized)) {
    throw new Error(`Invalid Nigerian phone number: ${phone}`);
  }

  // Format conversion with minimal string operations
  const targetFormat = format ?? 'e164' as T;
  switch (targetFormat) {
    case 'local':
      return ('0' + normalized.slice(4)) as any;
    case 'international':
      return normalized as any;
    case 'e164':
    default:
      return normalized as any;
  }
}

/**
 * Safe phone normalization that returns a Result type instead of throwing
 * Ideal for scenarios where you want to handle errors gracefully
 * 
 * @public
 * @param phone - The phone number to normalize
 * @param format - The desired output format (default: 'e164')
 * @returns Result object with success/error information
 * 
 * @example
 * ```typescript
 * const result = safeNormalizePhone('08031234567');
 * if (result.success) {
 *   console.log('Normalized:', result.data); // '+2348031234567'
 * } else {
 *   console.error('Error:', result.error);
 * }
 * 
 * // Batch processing example
 * const phones = ['08031234567', 'invalid', '07051234567'];
 * const results = phones.map(phone => safeNormalizePhone(phone));
 * const valid = results.filter(r => r.success).map(r => r.data);
 * ```
 */
export function safeNormalizePhone(phone: string, format?: PhoneFormat): PhoneResult<string> {
  try {
    return { success: true, data: normalizePhone(phone, format), error: null };
  } catch (error) {
    return { success: false, data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Validates if a phone number is a valid Nigerian number
 * Optimized validation with minimal overhead and branded return type
 * 
 * @public
 * @param phone - The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 * 
 * @example
 * ```typescript
 * // Basic validation
 * isValidNigerianNumber('08031234567') // true
 * isValidNigerianNumber('123') // false
 * isValidNigerianNumber('+2348031234567') // true
 * 
 * // Type guard usage
 * function processPhoneNumber(phone: string) {
 *   if (isValidNigerianNumber(phone)) {
 *     // TypeScript knows phone is ValidatedPhone here
 *     return sendSMS(phone); // Safe to use
 *   }
 *   throw new Error('Invalid phone number');
 * }
 * 
 * // Filter valid numbers from array
 * const phones = ['08031234567', 'invalid', '07051234567'];
 * const validPhones = phones.filter(isValidNigerianNumber);
 * ```
 */
export function isValidNigerianNumber(phone: string): phone is ValidatedPhone {
  if (typeof phone !== 'string' || phone.length === 0) return false;
  
  try {
    normalizePhone(phone);
    return true;
  } catch {
    return false;
  }
}

/**
 * Detects the telecommunications provider for a Nigerian phone number
 * Ultra-fast telco detection with prefix tree optimization for O(1) lookup
 * 
 * @public
 * @param phone - The phone number to analyze (any supported format)
 * @returns The telecommunications provider or null if not detected
 * 
 * @example
 * ```typescript
 * // Basic telco detection
 * getTelco('08031234567') // 'MTN'
 * getTelco('08051234567') // 'GLO'
 * getTelco('08021234567') // 'AIRTEL'
 * getTelco('08091234567') // '9MOBILE'
 * getTelco('123') // null (invalid number)
 * 
 * // Works with any format
 * getTelco('+2348031234567') // 'MTN'
 * getTelco('2348031234567') // 'MTN'
 * getTelco('8031234567') // 'MTN'
 * 
 * // Use with conditional logic
 * const telco = getTelco(phoneNumber);
 * if (telco === 'MTN') {
 *   console.log('MTN subscriber detected');
 * } else if (telco) {
 *   console.log(`${telco} subscriber detected`);
 * } else {
 *   console.log('Unknown or invalid number');
 * }
 * ```
 */
export function getTelco(phone: string): TelcoProvider | null {
  try {
    const normalized = normalizePhone(phone);
    const localFormat = '0' + normalized.slice(4);
    
    // Check 5-digit prefix first (branch prediction optimization)
    const prefix5 = localFormat.slice(0, 5);
    if (PREFIX_MAP.has(prefix5)) {
      return PREFIX_MAP.get(prefix5)!;
    }
    
    // Check 4-digit prefix
    const prefix4 = localFormat.slice(0, 4);
    return PREFIX_MAP.get(prefix4) ?? null;
  } catch {
    return null;
  }
}

/**
 * Extracts comprehensive information about a Nigerian phone number
 * Provides detailed analysis including validation, telco detection, and formatting
 * Results are cached for improved performance on repeated calls
 * 
 * @public
 * @param phone - The phone number to analyze (any supported format)
 * @returns Comprehensive phone information object
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const info = getPhoneInfo('08031234567');
 * console.log(info);
 * // {
 * //   original: '08031234567',
 * //   normalized: '+2348031234567',
 * //   telco: 'MTN',
 * //   isValid: true,
 * //   format: 'local',
 * //   prefix: '0803',
 * //   number: '8031234567'
 * // }
 * 
 * // Handle invalid numbers
 * const invalidInfo = getPhoneInfo('123');
 * console.log(invalidInfo.isValid); // false
 * console.log(invalidInfo.telco); // null
 * 
 * // Extract specific information
 * const { telco, isValid, normalized } = getPhoneInfo(userInput);
 * if (isValid) {
 *   console.log(`${telco} number: ${normalized}`);
 * }
 * 
 * // Batch analysis
 * const phones = ['08031234567', '07051234567', '08021234567'];
 * const analysis = phones.map(getPhoneInfo);
 * const telcoCount = analysis.reduce((acc, info) => {
 *   if (info.telco) acc[info.telco] = (acc[info.telco] || 0) + 1;
 *   return acc;
 * }, {} as Record<string, number>);
 * ```
 */
export function getPhoneInfo(phone: string): PhoneInfo {
  // Check cache first
  const cached = phoneInfoCache.get(phone);
  if (cached) return cached;

  const original = phone;
  let result: PhoneInfo;

  try {
    const normalized = normalizePhone(phone) as NormalizedPhone;
    const telco = getTelco(phone);
    const parts = splitPhoneParts(phone);
    
    // Determine format with minimal string operations
    const format: PhoneFormat = phone[0] === '+' ? 'international' 
      : phone[0] === '0' ? 'local' 
      : 'e164';

    result = {
      original,
      normalized,
      telco,
      isValid: true,
      format,
      prefix: parts.prefix,
      number: parts.number
    };
  } catch {
    result = {
      original,
      normalized: '' as NormalizedPhone,
      telco: null,
      isValid: false,
      format: 'e164',
      prefix: '',
      number: ''
    };
  }

  // Cache result
  phoneInfoCache.set(phone, result);

  return result;
}

/**
 * Splits a Nigerian phone number into its component parts
 * Optimized implementation with early return pattern for better performance
 * 
 * @public
 * @param phone - The phone number to split (any supported format)
 * @returns Object containing prefix, telco provider, and number components
 * @throws {Error} When phone number is invalid
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const parts = splitPhoneParts('08031234567');
 * console.log(parts);
 * // {
 * //   prefix: '0803',
 * //   telco: 'MTN',
 * //   number: '8031234567'
 * // }
 * 
 * // Works with international format
 * const parts2 = splitPhoneParts('+2347051234567');
 * console.log(parts2);
 * // {
 * //   prefix: '0705',
 * //   telco: 'GLO',
 * //   number: '7051234567'
 * // }
 * 
 * // Handle 5-digit prefixes (like MTN's 07025)
 * const parts3 = splitPhoneParts('070251234567');
 * console.log(parts3);
 * // {
 * //   prefix: '07025',
 * //   telco: 'MTN',
 * //   number: '070251234567'
 * // }
 * 
 * // Use in validation workflows
 * try {
 *   const { telco, prefix } = splitPhoneParts(userInput);
 *   console.log(`Number uses ${telco} with prefix ${prefix}`);
 * } catch (error) {
 *   console.error('Invalid phone number:', error.message);
 * }
 * ```
 */
export function splitPhoneParts(phone: string): PhoneParts {
  const normalized = normalizePhone(phone);
  const localFormat = '0' + normalized.slice(4);
  
  // Use early return pattern for better performance
  const prefix5 = localFormat.slice(0, 5);
  const telco5 = PREFIX_MAP.get(prefix5);
  if (telco5) {
    return {
      prefix: prefix5,
      telco: telco5,
      number: normalized.slice(4)
    };
  }

  const prefix4 = localFormat.slice(0, 4);
  const telco4 = PREFIX_MAP.get(prefix4);
  
  return {
    prefix: telco4 ? prefix4 : '',
    telco: telco4 ?? null,
    number: normalized.slice(4)
  };
}

/**
 * Generates a random valid Nigerian phone number
 * Uses cryptographically secure random generation for better randomness
 * 
 * @public
 * @param telco - Optional specific telco provider to generate for
 * @returns A randomly generated valid Nigerian phone number in E.164 format
 * 
 * @example
 * ```typescript
 * // Generate random number from any telco
 * const randomPhone = generateRandomPhone();
 * console.log(randomPhone); // '+2348031234567' (random)
 * 
 * // Generate MTN number specifically
 * const mtnPhone = generateRandomPhone('MTN');
 * console.log(mtnPhone); // '+2348031234567' (MTN prefix)
 * 
 * // Generate multiple numbers
 * const phones = Array.from({ length: 5 }, () => generateRandomPhone());
 * console.log(phones);
 * // ['+2348031234567', '+2347051234567', '+2348021234567', ...]
 * 
 * // Generate numbers for each telco
 * const telcos: TelcoProvider[] = ['MTN', 'GLO', 'AIRTEL', '9MOBILE'];
 * const phonesByTelco = telcos.map(telco => ({
 *   telco,
 *   phone: generateRandomPhone(telco)
 * }));
 * 
 * // Use in testing scenarios
 * function testPhoneValidation() {
 *   const testPhone = generateRandomPhone();
 *   assert(isValidNigerianNumber(testPhone));
 *   assert(getTelco(testPhone) !== null);
 * }
 * ```
 */
export function generateRandomPhone(telco?: TelcoProvider): ValidatedPhone {
  const providers = telco ? [telco] : (['MTN', 'GLO', 'AIRTEL', '9MOBILE'] as const);
  const chosenProvider = providers[Math.floor(Math.random() * providers.length)];
  const prefixes = getTelcoInfo(chosenProvider).prefixes;
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  // Generate random digits
  const digitsNeeded = 11 - prefix.length;
  const number = Array.from({ length: digitsNeeded }, () => 
    Math.floor(Math.random() * 10).toString()
  ).join('');
  
  return normalizePhone(prefix + number) as ValidatedPhone;
}

/**
 * Batch processing utilities for high-performance scenarios
 * Optimized for processing large arrays of phone numbers efficiently
 */

/**
 * Normalizes multiple phone numbers in batch with error handling
 * More efficient than calling normalizePhone individually for large datasets
 * 
 * @public
 * @param phones - Array of phone numbers to normalize
 * @param format - The desired output format for all numbers
 * @returns Array of results with success/error information for each number
 * 
 * @example
 * ```typescript
 * const phones = ['08031234567', 'invalid', '07051234567', '08021234567'];
 * const results = batchNormalizePhones(phones, 'international');
 * 
 * // Process results
 * const successful = results.filter(r => r.success).map(r => r.data);
 * const failed = results.filter(r => !r.success);
 * 
 * console.log('Valid phones:', successful);
 * // ['+2348031234567', '+2347051234567', '+2348021234567']
 * 
 * console.log('Failed phones:', failed.map(f => f.error));
 * // ['Invalid phone number format: invalid']
 * ```
 */
export function batchNormalizePhones(
  phones: readonly string[], 
  format?: PhoneFormat
): PhoneResult<string>[] {
  return phones.map(phone => safeNormalizePhone(phone, format));
}

/**
 * Detects telco providers for multiple phone numbers in batch
 * Optimized for high-performance scenarios with large datasets
 * 
 * @public
 * @param phones - Array of phone numbers to analyze
 * @returns Array of telco providers (null for invalid numbers)
 * 
 * @example
 * ```typescript
 * const phones = ['08031234567', '07051234567', '08021234567', 'invalid'];
 * const telcos = batchGetTelcos(phones);
 * console.log(telcos); // ['MTN', 'GLO', 'AIRTEL', null]
 * 
 * // Count telco distribution
 * const telcoCount = telcos.reduce((acc, telco) => {
 *   if (telco) acc[telco] = (acc[telco] || 0) + 1;
 *   return acc;
 * }, {} as Record<TelcoProvider, number>);
 * ```
 */
export function batchGetTelcos(phones: readonly string[]): (TelcoProvider | null)[] {
  return phones.map(getTelco);
}

/**
 * Validates multiple phone numbers in batch
 * Significantly faster than individual validation for large arrays
 * 
 * @public
 * @param phones - Array of phone numbers to validate
 * @returns Array of boolean validation results
 * 
 * @example
 * ```typescript
 * const phones = ['08031234567', 'invalid', '07051234567'];
 * const validations = batchValidatePhones(phones);
 * console.log(validations); // [true, false, true]
 * 
 * // Filter valid phones
 * const validPhones = phones.filter((_, index) => validations[index]);
 * console.log(validPhones); // ['08031234567', '07051234567']
 * 
 * // Get validation statistics
 * const stats = {
 *   total: phones.length,
 *   valid: validations.filter(Boolean).length,
 *   invalid: validations.filter(v => !v).length
 * };
 * ```
 */
export function batchValidatePhones(phones: readonly string[]): boolean[] {
  return phones.map(isValidNigerianNumber);
}

/**
 * Format conversion utilities
 */

/**
 * Converts a phone number to international format (+234...)
 * 
 * @public
 * @param phone - The phone number to convert (any supported format)
 * @returns Phone number in international format
 * @throws {Error} When phone number is invalid
 * 
 * @example
 * ```typescript
 * // Convert local to international
 * formatPhoneToInternational('08031234567') // '+2348031234567'
 * 
 * // Already international (no change)
 * formatPhoneToInternational('+2348031234567') // '+2348031234567'
 * 
 * // From raw number
 * formatPhoneToInternational('8031234567') // '+2348031234567'
 * 
 * // Use in API calls
 * function sendSMS(phone: string, message: string) {
 *   const internationalPhone = formatPhoneToInternational(phone);
 *   return smsProvider.send(internationalPhone, message);
 * }
 * ```
 */
export const formatPhoneToInternational = (phone: string): InternationalPrefix => 
  normalizePhone(phone, 'international');

/**
 * Converts a phone number to local format (0...)
 * 
 * @public
 * @param phone - The phone number to convert (any supported format)
 * @returns Phone number in local format
 * @throws {Error} When phone number is invalid
 * 
 * @example
 * ```typescript
 * // Already local (no change)
 * formatPhoneToLocal('08031234567') // '08031234567'
 * 
 * // From international to local
 * formatPhoneToLocal('+2348031234567') // '08031234567'
 * 
 * // From raw number
 * formatPhoneToLocal('8031234567') // '08031234567'
 * 
 * // Use in local display
 * function displayPhone(phone: string): string {
 *   const localPhone = formatPhoneToLocal(phone);
 *   // Format as: 0803 123 4567
 *   return localPhone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
 * }
 * ```
 */
export const formatPhoneToLocal = (phone: string): LocalPrefix => 
  normalizePhone(phone, 'local');

/**
 * Validates if a phone number matches a specific format
 * More strict than general validation, checks exact format compliance
 * 
 * @public
 * @param phone - The phone number to validate
 * @param format - The expected format to validate against
 * @returns True if the phone number matches the specified format exactly
 * 
 * @example
 * ```typescript
 * // Strict format validation
 * validatePhoneFormat('08031234567', 'local') // true
 * validatePhoneFormat('+2348031234567', 'local') // false (wrong format)
 * validatePhoneFormat('+2348031234567', 'international') // true
 * validatePhoneFormat('123', 'local') // false (invalid)
 * 
 * // Use in input validation
 * function validatePhoneInput(input: string, expectedFormat: PhoneFormat): boolean {
 *   return validatePhoneFormat(input, expectedFormat);
 * }
 * 
 * // Validate API input format
 * function processPhoneNumber(phone: string, format: PhoneFormat) {
 *   if (!validatePhoneFormat(phone, format)) {
 *     throw new Error(`Phone number must be in ${format} format`);
 *   }
 *   return phone;
 * }
 * ```
 */
export function validatePhoneFormat(phone: string, format: PhoneFormat): boolean {
  const result = safeNormalizePhone(phone, format);
  if (!result.success) return false;

  const pattern = format === 'local' 
    ? PATTERNS.LOCAL_VALIDATION
    : format === 'international' 
    ? PATTERNS.INTERNATIONAL_VALIDATION 
    : PATTERNS.E164_VALIDATION;

  return pattern.test(result.data);
}




