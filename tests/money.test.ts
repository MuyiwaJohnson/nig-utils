/**
 * Money Module Tests
 * 
 * @fileoverview Tests for Nigerian money utilities
 * @author Ademuyiwa Johnson
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import {
  formatNaira,
  parseNaira,
  nairaToKobo,
  koboToNaira,
  spellOutNaira,
  isValidNairaAmount,
  calculatePercentage,
  addVAT,
  removeVAT,
  formatRange,
  roundToNaira,
  roundToKobo,
  type CurrencySymbol,
  type MoneyFormatOptions,
  type MoneyParseOptions
} from '../src/money';

describe('Nigerian Money Utilities', () => {
  describe('formatNaira', () => {
    it('should format basic amounts correctly', () => {
      expect(formatNaira(1500)).toBe('₦1,500.00');
      expect(formatNaira(0)).toBe('₦0.00');
      expect(formatNaira(1000000)).toBe('₦1,000,000.00');
    });

    it('should handle negative amounts', () => {
      expect(formatNaira(-1500)).toBe('-₦1,500.00');
      expect(formatNaira(-1000000)).toBe('-₦1,000,000.00');
    });

    it('should format with different symbols', () => {
      expect(formatNaira(1500, { symbol: 'NGN' })).toBe('NGN 1,500.00');
      expect(formatNaira(1500, { symbol: 'N' })).toBe('N 1,500.00');
    });

    it('should format with compact notation', () => {
      expect(formatNaira(1500, { compact: true })).toBe('₦1.5K');
      expect(formatNaira(1500000, { compact: true })).toBe('₦1.5M');
      expect(formatNaira(1500000000, { compact: true })).toBe('₦1.5B');
    });

    it('should handle decimal amounts', () => {
      expect(formatNaira(1500.50)).toBe('₦1,500.50');
      expect(formatNaira(1500.99)).toBe('₦1,500.99');
    });

    it('should handle different decimal places', () => {
      expect(formatNaira(1500, { decimals: 0 })).toBe('₦1,500');
      expect(formatNaira(1500.123, { decimals: 3 })).toBe('₦1,500.123');
    });
  });

  describe('parseNaira', () => {
    it('should parse standard formatted amounts', () => {
      expect(parseNaira('₦1,500.00')).toBe(1500);
      expect(parseNaira('₦1,000,000.00')).toBe(1000000);
      expect(parseNaira('₦1,500.50')).toBe(1500.5);
    });

    it('should parse compact notation', () => {
      expect(parseNaira('₦1.5K')).toBe(1500);
      expect(parseNaira('₦1.5M')).toBe(1500000);
      expect(parseNaira('₦1.5B')).toBe(1500000000);
      expect(parseNaira('₦2K')).toBe(2000);
    });

    it('should parse different currency symbols', () => {
      expect(parseNaira('NGN 1,500.00')).toBe(1500);
      expect(parseNaira('N 1,500.00')).toBe(1500);
    });

    it('should handle negative amounts', () => {
      expect(parseNaira('-₦1,500.00')).toBe(-1500);
      expect(parseNaira('-₦1.5K')).toBe(-1500);
    });

    it('should throw error for invalid formats', () => {
      expect(() => parseNaira('invalid', { strict: true })).toThrow();
      expect(() => parseNaira('', { strict: true })).toThrow();
      expect(() => parseNaira('₦abc', { strict: true })).toThrow();
    });

    it('should handle strict mode', () => {
      expect(() => parseNaira('invalid', { strict: true })).toThrow('Invalid Naira format');
    });
  });

  describe('nairaToKobo', () => {
    it('should convert Naira to Kobo correctly', () => {
      expect(nairaToKobo(1.50)).toBe(150);
      expect(nairaToKobo(1000)).toBe(100000);
      expect(nairaToKobo(0)).toBe(0);
      expect(nairaToKobo(1.99)).toBe(199);
    });

    it('should handle decimal amounts', () => {
      expect(nairaToKobo(1.25)).toBe(125);
      expect(nairaToKobo(10.75)).toBe(1075);
    });
  });

  describe('koboToNaira', () => {
    it('should convert Kobo to Naira correctly', () => {
      expect(koboToNaira(150)).toBe(1.50);
      expect(koboToNaira(100000)).toBe(1000);
      expect(koboToNaira(0)).toBe(0);
      expect(koboToNaira(199)).toBe(1.99);
    });

    it('should handle large amounts', () => {
      expect(koboToNaira(1000000)).toBe(10000);
      expect(koboToNaira(5000)).toBe(50);
    });
  });

  describe('spellOutNaira', () => {
    it('should spell out basic amounts', () => {
      expect(spellOutNaira(1500)).toBe('one thousand, five hundred Naira only');
      expect(spellOutNaira(1000000)).toBe('one million Naira only');
      expect(spellOutNaira(0)).toBe('Zero Naira only');
    });

    it('should handle amounts with Kobo', () => {
      expect(spellOutNaira(1500.50)).toBe('one thousand, five hundred Naira and fifty Kobo only');
      expect(spellOutNaira(0.75)).toBe('seventy-five Kobo only');
    });

    it('should handle negative amounts', () => {
      expect(spellOutNaira(-1500)).toBe('Negative one thousand, five hundred Naira only');
      expect(spellOutNaira(-1500.50)).toBe('Negative one thousand, five hundred Naira and fifty Kobo only');
    });

    it('should handle complex amounts', () => {
      expect(spellOutNaira(1234567)).toBe('one million, two hundred thirty-four thousand, five hundred sixty-seven Naira only');
    });
  });

  describe('isValidNairaAmount', () => {
    it('should validate correct formats', () => {
      expect(isValidNairaAmount('₦1,500.00')).toBe(true);
      expect(isValidNairaAmount('₦1.5K')).toBe(true);
      expect(isValidNairaAmount('₦1.5M')).toBe(true);
      expect(isValidNairaAmount('₦1.5B')).toBe(true);
      expect(isValidNairaAmount('NGN 1,500.00')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidNairaAmount('invalid')).toBe(false);
      expect(isValidNairaAmount('₦abc')).toBe(false);
      expect(isValidNairaAmount('')).toBe(false);
      expect(isValidNairaAmount('123')).toBe(false);
    });
  });

  describe('calculatePercentage', () => {
    it('should calculate percentages correctly', () => {
      expect(calculatePercentage(1000, 15)).toBe(150);
      expect(calculatePercentage(5000, 7.5)).toBe(375);
      expect(calculatePercentage(100, 50)).toBe(50);
      expect(calculatePercentage(0, 10)).toBe(0);
    });

    it('should handle decimal percentages', () => {
      expect(calculatePercentage(1000, 12.5)).toBe(125);
      expect(calculatePercentage(2000, 3.75)).toBe(75);
    });
  });

  describe('addVAT', () => {
    it('should add default VAT rate (7.5%)', () => {
      expect(addVAT(1000)).toBe(1075);
      expect(addVAT(2000)).toBe(2150);
      expect(addVAT(0)).toBe(0);
    });

    it('should add custom VAT rate', () => {
      expect(addVAT(1000, 5)).toBe(1050);
      expect(addVAT(1000, 10)).toBe(1100);
      expect(addVAT(1000, 0)).toBe(1000);
    });

    it('should handle decimal VAT rates', () => {
      expect(addVAT(1000, 7.5)).toBe(1075);
      expect(addVAT(1000, 12.5)).toBe(1125);
    });
  });

  describe('removeVAT', () => {
    it('should remove default VAT rate (7.5%)', () => {
      expect(removeVAT(1075)).toBe(1000);
      expect(removeVAT(2150)).toBe(2000);
      expect(removeVAT(0)).toBe(0);
    });

    it('should remove custom VAT rate', () => {
      expect(removeVAT(1050, 5)).toBe(1000);
      expect(removeVAT(1100, 10)).toBe(1000);
      expect(removeVAT(1000, 0)).toBe(1000);
    });

    it('should handle decimal VAT rates', () => {
      expect(removeVAT(1075, 7.5)).toBe(1000);
      expect(removeVAT(1125, 12.5)).toBe(1000);
    });
  });

  describe('formatRange', () => {
    it('should format ranges correctly', () => {
      expect(formatRange(1000, 5000)).toBe('₦1,000.00 - ₦5,000.00');
      expect(formatRange(0, 1000)).toBe('₦0.00 - ₦1,000.00');
    });

    it('should format ranges with compact notation', () => {
      expect(formatRange(1000, 5000, { compact: true })).toBe('₦1K - ₦5K');
      expect(formatRange(1000000, 5000000, { compact: true })).toBe('₦1M - ₦5M');
    });

    it('should format ranges with different symbols', () => {
      expect(formatRange(1000, 5000, { symbol: 'NGN' })).toBe('NGN 1,000.00 - NGN 5,000.00');
    });
  });

  describe('roundToNaira', () => {
    it('should round to nearest Naira', () => {
      expect(roundToNaira(1500.75)).toBe(1501);
      expect(roundToNaira(1500.25)).toBe(1500);
      expect(roundToNaira(1500.5)).toBe(1501);
      expect(roundToNaira(1500)).toBe(1500);
    });

    it('should handle negative amounts', () => {
      expect(roundToNaira(-1500.75)).toBe(-1501);
      expect(roundToNaira(-1500.25)).toBe(-1500);
    });
  });

  describe('roundToKobo', () => {
    it('should round to nearest Kobo', () => {
      expect(roundToKobo(1500.75)).toBe(1500.75);
      expect(roundToKobo(1500.123)).toBe(1500.12);
      expect(roundToKobo(1500.126)).toBe(1500.13);
      expect(roundToKobo(1500)).toBe(1500);
    });

    it('should handle negative amounts', () => {
      expect(roundToKobo(-1500.75)).toBe(-1500.75);
      expect(roundToKobo(-1500.123)).toBe(-1500.12);
    });
  });

  describe('Type Safety', () => {
    it('should have correct CurrencySymbol type', () => {
      const symbols: CurrencySymbol[] = ['₦', 'NGN', 'N'];
      expect(symbols).toContain('₦');
      expect(symbols).toContain('NGN');
      expect(symbols).toContain('N');
    });

    it('should have correct MoneyFormatOptions type', () => {
      const options: MoneyFormatOptions = {
        symbol: '₦',
        compact: true,
        decimals: 2,
        showKobo: false,
        locale: 'en-NG'
      };
      expect(options.symbol).toBe('₦');
      expect(options.compact).toBe(true);
    });

    it('should have correct MoneyParseOptions type', () => {
      const options: MoneyParseOptions = {
        allowNegative: true,
        defaultCurrency: '₦',
        strict: false
      };
      expect(options.allowNegative).toBe(true);
      expect(options.defaultCurrency).toBe('₦');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large amounts', () => {
      expect(formatNaira(999999999999)).toBe('₦999,999,999,999.00');
      expect(parseNaira('₦999,999,999,999.00')).toBe(999999999999);
    });

    it('should handle very small amounts', () => {
      expect(formatNaira(0.01)).toBe('₦0.01');
      expect(parseNaira('₦0.01')).toBe(0.01);
    });

    it('should handle zero amounts', () => {
      expect(formatNaira(0)).toBe('₦0.00');
      expect(spellOutNaira(0)).toBe('Zero Naira only');
      expect(nairaToKobo(0)).toBe(0);
      expect(koboToNaira(0)).toBe(0);
    });

    it('should handle negative amounts in all functions', () => {
      expect(formatNaira(-1500)).toBe('-₦1,500.00');
      expect(parseNaira('-₦1,500.00')).toBe(-1500);
      expect(spellOutNaira(-1500)).toBe('Negative one thousand, five hundred Naira only');
      expect(addVAT(-1000)).toBe(-1075);
      expect(removeVAT(-1075)).toBe(-1000);
    });
  });

  describe('Integration Tests', () => {
    it('should work together in real-world scenarios', () => {
      // Scenario: Calculate VAT on a purchase
      const basePrice = 1000;
      const vatAmount = calculatePercentage(basePrice, 7.5);
      const totalWithVAT = addVAT(basePrice);
      
      expect(vatAmount).toBe(75);
      expect(totalWithVAT).toBe(1075);
      expect(formatNaira(totalWithVAT)).toBe('₦1,075.00');
    });

    it('should handle currency conversion scenarios', () => {
      // Scenario: Convert between Naira and Kobo
      const nairaAmount = 15.75;
      const koboAmount = nairaToKobo(nairaAmount);
      const backToNaira = koboToNaira(koboAmount);
      
      expect(koboAmount).toBe(1575);
      expect(backToNaira).toBe(15.75);
    });

    it('should handle parsing and formatting round-trip', () => {
      const originalAmount = 1500.75;
      const formatted = formatNaira(originalAmount);
      const parsed = parseNaira(formatted);
      
      expect(parsed).toBe(originalAmount);
    });
  });
}); 