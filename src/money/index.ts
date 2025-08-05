/**
 * Nigerian Money Utilities - Naira Formatting & Currency Helpers
 * 
 * @fileoverview Comprehensive utilities for Nigerian currency operations
 * @author Ademuyiwa Johnson
 * @license MIT
 */

// Type definitions for money operations
export type CurrencyFormat = 'standard' | 'compact' | 'words' | 'kobo';
export type CurrencySymbol = '₦' | 'NGN' | 'N';

export interface MoneyFormatOptions {
  symbol?: CurrencySymbol;
  compact?: boolean;
  decimals?: number;
  showKobo?: boolean;
  locale?: string;
}

export interface MoneyParseOptions {
  allowNegative?: boolean;
  defaultCurrency?: CurrencySymbol;
  strict?: boolean;
}

/**
 * Formats a number as Nigerian Naira
 * 
 * @public
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted Naira string
 * 
 * @example
 * ```typescript
 * formatNaira(1500); // "₦1,500.00"
 * formatNaira(1500, { compact: true }); // "₦1.5K"
 * formatNaira(1500, { symbol: 'NGN' }); // "NGN 1,500.00"
 * formatNaira(1500, { showKobo: true }); // "₦1,500.00"
 * ```
 */
export function formatNaira(
  amount: number, 
  options: MoneyFormatOptions = {}
): string {
  const {
    symbol = '₦',
    compact = false,
    decimals = 2,
    showKobo = false,
    locale = 'en-NG'
  } = options;

  // Handle zero and negative amounts
  if (amount === 0) return `${symbol}0.00`;
  
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  // Compact formatting (K, M, B)
  if (compact) {
    return formatCompactNaira(absAmount, symbol, isNegative);
  }

  // Standard formatting
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(absAmount);

  // Replace symbol based on option
  let result = formatted;
  
  if (symbol === 'NGN') {
    result = formatted.replace('₦', 'NGN ');
  } else if (symbol === 'N') {
    result = formatted.replace('₦', 'N ');
  }
  // For '₦' symbol, keep the original format
  
  return isNegative ? `-${result}` : result;
}

/**
 * Formats amount in compact notation (K, M, B)
 */
function formatCompactNaira(
  amount: number, 
  symbol: CurrencySymbol, 
  isNegative: boolean
): string {
  const absAmount = Math.abs(amount);
  
  if (absAmount >= 1e9) {
    const value = (absAmount / 1e9);
    const formatted = value === Math.floor(value) ? value.toString() : value.toFixed(1);
    return `${isNegative ? '-' : ''}${symbol}${formatted}B`;
  } else if (absAmount >= 1e6) {
    const value = (absAmount / 1e6);
    const formatted = value === Math.floor(value) ? value.toString() : value.toFixed(1);
    return `${isNegative ? '-' : ''}${symbol}${formatted}M`;
  } else if (absAmount >= 1e3) {
    const value = (absAmount / 1e3);
    const formatted = value === Math.floor(value) ? value.toString() : value.toFixed(1);
    return `${isNegative ? '-' : ''}${symbol}${formatted}K`;
  } else {
    return formatNaira(amount, { symbol });
  }
}

/**
 * Parses a formatted Naira string back to number
 * 
 * @public
 * @param text - The formatted money string to parse
 * @param options - Parsing options
 * @returns Parsed amount as number
 * 
 * @example
 * ```typescript
 * parseNaira('₦1,500.00'); // 1500
 * parseNaira('NGN 2.5K'); // 2500
 * parseNaira('₦1.5M'); // 1500000
 * parseNaira('₦1,500.50'); // 1500.5
 * ```
 */
export function parseNaira(
  text: string, 
  options: MoneyParseOptions = {}
): number {
  const { allowNegative = true, defaultCurrency = '₦', strict = false } = options;

  if (!text || typeof text !== 'string') {
    throw new Error('Invalid input: text must be a non-empty string');
  }

  // Clean the input
  let cleaned = text.trim();
  
  // Handle negative amounts
  const isNegative = cleaned.startsWith('-');
  if (isNegative) {
    cleaned = cleaned.substring(1);
  }

  // Check if it has a currency symbol (required for valid format)
  const hasCurrencySymbol = /[₦NGN]/.test(cleaned);
  
  // Remove currency symbols
  cleaned = cleaned.replace(/[₦NGN]/g, '').trim();

  // Handle compact notation (K, M, B)
  const compactMatch = cleaned.match(/^([\d,]+\.?\d*)([KMB])$/i);
  if (compactMatch) {
    const [, number, suffix] = compactMatch;
    const multiplier = suffix.toUpperCase() === 'K' ? 1000 : 
                     suffix.toUpperCase() === 'M' ? 1000000 : 
                     suffix.toUpperCase() === 'B' ? 1000000000 : 1;
    
    const parsed = parseFloat(number.replace(/,/g, ''));
    if (isNaN(parsed)) {
      throw new Error('Invalid number format');
    }
    
    return (isNegative ? -1 : 1) * parsed * multiplier;
  }

  // Handle standard format
  const numberMatch = cleaned.match(/^[\d,]+\.?\d*$/);
  if (numberMatch && hasCurrencySymbol) {
    const parsed = parseFloat(cleaned.replace(/,/g, ''));
    if (isNaN(parsed)) {
      throw new Error('Invalid number format');
    }
    return (isNegative ? -1 : 1) * parsed;
  }

  if (strict) {
    throw new Error('Invalid Naira format');
  }

  return 0;
}

/**
 * Converts Naira to Kobo
 * 
 * @public
 * @param naira - Amount in Naira
 * @returns Amount in Kobo
 * 
 * @example
 * ```typescript
 * nairaToKobo(1.50); // 150
 * nairaToKobo(1000); // 100000
 * ```
 */
export function nairaToKobo(naira: number): number {
  return Math.round(naira * 100);
}

/**
 * Converts Kobo to Naira
 * 
 * @public
 * @param kobo - Amount in Kobo
 * @returns Amount in Naira
 * 
 * @example
 * ```typescript
 * koboToNaira(150); // 1.50
 * koboToNaira(100000); // 1000
 * ```
 */
export function koboToNaira(kobo: number): number {
  return kobo / 100;
}

/**
 * Formats amount in words (spells out the amount)
 * 
 * @public
 * @param amount - Amount to spell out
 * @returns Amount spelled out in words
 * 
 * @example
 * ```typescript
 * spellOutNaira(1500); // "One thousand, five hundred Naira only"
 * spellOutNaira(1500.50); // "One thousand, five hundred Naira and fifty Kobo only"
 * ```
 */
export function spellOutNaira(amount: number): string {
  if (amount === 0) return 'Zero Naira only';
  
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  const nairaPart = Math.floor(absAmount);
  const koboPart = Math.round((absAmount - nairaPart) * 100);
  
  let result = '';
  
  if (isNegative) {
    result += 'Negative ';
  }
  
  if (nairaPart > 0) {
    result += numberToWords(nairaPart) + ' Naira';
  }
  
  if (koboPart > 0) {
    if (nairaPart > 0) {
      result += ' and ';
    }
    result += numberToWords(koboPart) + ' Kobo';
  }
  
  if (nairaPart === 0 && koboPart === 0) {
    result = 'Zero Naira';
  }
  
  return result + ' only';
}

/**
 * Converts number to words
 */
function numberToWords(num: number): string {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  
  if (num === 0) return '';
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) {
    return tens[Math.floor(num / 10)] + (num % 10 > 0 ? '-' + ones[num % 10] : '');
  }
  if (num < 1000) {
    return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 > 0 ? ' ' + numberToWords(num % 100) : '');
  }
  if (num < 1000000) {
    return numberToWords(Math.floor(num / 1000)) + ' thousand' + (num % 1000 > 0 ? ', ' + numberToWords(num % 1000) : '');
  }
  if (num < 1000000000) {
    return numberToWords(Math.floor(num / 1000000)) + ' million' + (num % 1000000 > 0 ? ', ' + numberToWords(num % 1000000) : '');
  }
  
  return numberToWords(Math.floor(num / 1000000000)) + ' billion' + (num % 1000000000 > 0 ? ', ' + numberToWords(num % 1000000000) : '');
}

/**
 * Validates if a string is a valid Naira amount
 * 
 * @public
 * @param text - Text to validate
 * @returns True if valid Naira format
 * 
 * @example
 * ```typescript
 * isValidNairaAmount('₦1,500.00'); // true
 * isValidNairaAmount('NGN 2.5K'); // true
 * isValidNairaAmount('invalid'); // false
 * ```
 */
export function isValidNairaAmount(text: string): boolean {
  try {
    parseNaira(text, { strict: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * Calculates percentage of an amount
 * 
 * @public
 * @param amount - Base amount
 * @param percentage - Percentage to calculate
 * @returns Calculated amount
 * 
 * @example
 * ```typescript
 * calculatePercentage(1000, 15); // 150
 * calculatePercentage(5000, 7.5); // 375
 * ```
 */
export function calculatePercentage(amount: number, percentage: number): number {
  return (amount * percentage) / 100;
}

/**
 * Adds VAT (Value Added Tax) to an amount
 * 
 * @public
 * @param amount - Base amount
 * @param vatRate - VAT rate (default: 7.5% for Nigeria)
 * @returns Amount with VAT
 * 
 * @example
 * ```typescript
 * addVAT(1000); // 1075 (7.5% VAT)
 * addVAT(1000, 5); // 1050 (5% VAT)
 * ```
 */
export function addVAT(amount: number, vatRate: number = 7.5): number {
  return amount + calculatePercentage(amount, vatRate);
}

/**
 * Removes VAT from an amount
 * 
 * @public
 * @param amount - Amount including VAT
 * @param vatRate - VAT rate (default: 7.5% for Nigeria)
 * @returns Amount without VAT
 * 
 * @example
 * ```typescript
 * removeVAT(1075); // 1000
 * removeVAT(1050, 5); // 1000
 * ```
 */
export function removeVAT(amount: number, vatRate: number = 7.5): number {
  const result = amount / (1 + vatRate / 100);
  return Math.round(result * 100) / 100; // Round to 2 decimal places
}

/**
 * Formats a range of amounts
 * 
 * @public
 * @param min - Minimum amount
 * @param max - Maximum amount
 * @param options - Formatting options
 * @returns Formatted range string
 * 
 * @example
 * ```typescript
 * formatRange(1000, 5000); // "₦1,000.00 - ₦5,000.00"
 * formatRange(1000, 5000, { compact: true }); // "₦1K - ₦5K"
 * ```
 */
export function formatRange(
  min: number, 
  max: number, 
  options: MoneyFormatOptions = {}
): string {
  const minFormatted = formatNaira(min, options);
  const maxFormatted = formatNaira(max, options);
  return `${minFormatted} - ${maxFormatted}`;
}

/**
 * Rounds amount to nearest Naira
 * 
 * @public
 * @param amount - Amount to round
 * @returns Rounded amount
 * 
 * @example
 * ```typescript
 * roundToNaira(1500.75); // 1501
 * roundToNaira(1500.25); // 1500
 * ```
 */
export function roundToNaira(amount: number): number {
  return Math.round(amount);
}

/**
 * Rounds amount to nearest Kobo
 * 
 * @public
 * @param amount - Amount to round
 * @returns Rounded amount
 * 
 * @example
 * ```typescript
 * roundToKobo(1500.75); // 1500.75
 * roundToKobo(1500.123); // 1500.12
 * ```
 */
export function roundToKobo(amount: number): number {
  return Math.round(amount * 100) / 100;
} 