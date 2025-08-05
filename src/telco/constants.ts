/**
 * Constants and data for Nigerian telecommunications utilities
 * 
 * @fileoverview Telco data, patterns, and lookup structures
 * @author Ademuyiwa Johnson
 * @license MIT
 */

import type { TelcoProvider, TelcoPrefix } from './types';

/**
 * Comprehensive telecommunications data for all Nigerian providers
 * Pre-computed data structure for optimal lookup performance
 * 
 * @internal
 * @constant
 */
export const TELCO_DATA = {
  /** MTN Nigeria - Largest telco provider with 15 prefixes */
  MTN: {
    provider: 'MTN',
    prefixes: [
      '0703', '0704', '0706', '07025', '07026',
      '0803', '0806', '0810', '0813', '0814', '0816',
      '0903', '0906', '0913', '0916'
    ],
    description: 'MTN Nigeria'
  },
  /** Globacom Nigeria - Second largest provider with 7 prefixes */
  GLO: {
    provider: 'GLO',
    prefixes: ['0705', '0805', '0807', '0811', '0815', '0905', '0915'],
    description: 'Globacom Nigeria'
  },
  /** Airtel Nigeria - Third largest provider with 9 prefixes */
  AIRTEL: {
    provider: 'AIRTEL',
    prefixes: ['0701', '0708', '0802', '0808', '0812', '0901', '0902', '0907', '0912'],
    description: 'Airtel Nigeria'
  },
  /** 9mobile Nigeria - Smallest major provider with 5 prefixes */
  '9MOBILE': {
    provider: '9MOBILE',
    prefixes: ['0809', '0817', '0818', '0908', '0909'],
    description: '9mobile Nigeria'
  }
} as const satisfies Record<TelcoProvider, TelcoPrefix>;

/**
 * Pre-compiled regex patterns for phone number validation
 * Avoids runtime compilation overhead
 * 
 * @internal
 * @constant
 */
export const PATTERNS = {
  /** Removes all non-digit characters except + */
  CLEANUP: /[^\d+]/g,
  /** Validates E.164 format: +234 followed by exactly 10 digits */
  E164_VALIDATION: /^\+234\d{10}$/,
  /** Validates local format: 0 followed by exactly 10 digits */
  LOCAL_VALIDATION: /^0\d{10}$/,
  /** Validates international format: +234 followed by exactly 10 digits */
  INTERNATIONAL_VALIDATION: /^\+234\d{10}$/
} as const;

/**
 * Pre-computed lookup map for O(1) prefix-to-telco resolution
 * Initialized immediately for optimal performance
 * 
 * @internal
 * @constant
 */
export const PREFIX_MAP = new Map<string, TelcoProvider>();

/**
 * Cache for compiled regular expressions to avoid recompilation
 * 
 * @internal
 * @constant
 */
export const REGEX_CACHE = new Map<string, RegExp>();

/**
 * Initialize lookup structures immediately for optimal performance
 * Populates PREFIX_MAP with all telco prefixes
 * 
 * @internal
 * @function
 */
(() => {
  for (const [provider, data] of Object.entries(TELCO_DATA) as Array<[TelcoProvider, TelcoPrefix]>) {
    for (const prefix of data.prefixes) {
      PREFIX_MAP.set(prefix, provider);
    }
  }
})();

/**
 * Retrieves a cached regular expression or creates and caches a new one
 * Improves performance by avoiding repeated regex compilation
 * 
 * @internal
 * @param pattern - The regex pattern string
 * @returns Compiled regular expression
 */
export const getRegex = (pattern: string): RegExp => {
  let regex = REGEX_CACHE.get(pattern);
  if (!regex) {
    regex = new RegExp(pattern);
    REGEX_CACHE.set(pattern, regex);
  }
  return regex;
}; 

/**
 * Validation schemas for phone and prefix formats
 * Provides regex patterns and error messages for validation
 *
 * @public
 * @constant
 * @example
 * validationSchemas.phone.pattern.test('08031234567') // true
 * validationSchemas.prefix.pattern.test('0803') // true
 */
export const validationSchemas = {
  phone: {
    pattern: /^(\+234|234|0)?[789][01]\d{8}$/,
    message: 'Invalid Nigerian phone number format'
  },
  prefix: {
    pattern: /^0[789][01]\d{1,2}$/,
    message: 'Invalid phone prefix format'
  }
} as const; 