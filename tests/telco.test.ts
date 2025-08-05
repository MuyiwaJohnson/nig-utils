import { describe, it, expect } from 'vitest';
import {
  normalizePhone,
  isValidNigerianNumber,
  getTelco,
  getPhoneInfo,
  splitPhoneParts,
  generateRandomPhone,
  getAllTelcos,
  getTelcoInfo,
  getTelcoByPrefix,
  formatPhoneToInternational,
  formatPhoneToLocal,
  validatePhoneFormat,
  // New ultra-optimized features
  safeNormalizePhone,
  batchNormalizePhones,
  batchGetTelcos,
  batchValidatePhones,
  isValidatedPhone,
  isNormalizedPhone,
  PhoneValidationError,
  type TelcoProvider,
  type PhoneFormat,
  type ValidatedPhone,
  type NormalizedPhone,
  type PhoneResult
} from '../src/telco';



describe('Telco Utilities - Ultra Optimized Edition', () => {
  describe('Core Functions', () => {
    describe('normalizePhone', () => {
      it('should normalize local format to E164', () => {
        expect(normalizePhone('08031234567')).toBe('+2348031234567');
      });

      it('should normalize international format to E164', () => {
        expect(normalizePhone('+2348031234567')).toBe('+2348031234567');
      });

      it('should normalize 234 format to E164', () => {
        expect(normalizePhone('2348031234567')).toBe('+2348031234567');
      });

      it('should normalize 10-digit format to E164', () => {
        expect(normalizePhone('8031234567')).toBe('+2348031234567');
      });

      it('should handle formatted numbers', () => {
        expect(normalizePhone('0803 123 4567')).toBe('+2348031234567');
        expect(normalizePhone('0803-123-4567')).toBe('+2348031234567');
      });

      it('should return local format when requested', () => {
        expect(normalizePhone('+2348031234567', 'local')).toBe('08031234567');
      });

      it('should return international format when requested', () => {
        expect(normalizePhone('08031234567', 'international')).toBe('+2348031234567');
      });

      it('should throw error for invalid phone numbers', () => {
        expect(() => normalizePhone('123')).toThrow('Invalid phone number length');
        expect(() => normalizePhone('0803123456')).toThrow('Invalid local number');
        expect(() => normalizePhone('080312345678')).toThrow('Invalid phone number length');
      });

      it('should throw error for non-string input', () => {
        expect(() => normalizePhone(123 as any)).toThrow('Phone number must be a non-empty string');
        expect(() => normalizePhone('')).toThrow('Phone number must be a non-empty string');
      });
    });

    describe('isValidNigerianNumber', () => {
      it('should return true for valid Nigerian numbers', () => {
        expect(isValidNigerianNumber('08031234567')).toBe(true);
        expect(isValidNigerianNumber('+2348031234567')).toBe(true);
        expect(isValidNigerianNumber('0803 123 4567')).toBe(true);
      });

      it('should return false for invalid numbers', () => {
        expect(isValidNigerianNumber('123')).toBe(false);
        expect(isValidNigerianNumber('0803123456')).toBe(false);
        expect(isValidNigerianNumber('080312345678')).toBe(false);
      });

      it('should work as a type guard', () => {
        const phone = '08031234567';
        if (isValidNigerianNumber(phone)) {
          // TypeScript should know this is ValidatedPhone
          const validated: ValidatedPhone = phone;
          expect(validated).toBe(phone);
        }
      });
    });

    describe('getTelco', () => {
      it('should detect MTN numbers', () => {
        expect(getTelco('08031234567')).toBe('MTN');
        expect(getTelco('08061234567')).toBe('MTN');
        expect(getTelco('07031234567')).toBe('MTN');
      });

      it('should detect GLO numbers', () => {
        expect(getTelco('08051234567')).toBe('GLO');
        expect(getTelco('08071234567')).toBe('GLO');
        expect(getTelco('07051234567')).toBe('GLO');
      });

      it('should detect AIRTEL numbers', () => {
        expect(getTelco('08021234567')).toBe('AIRTEL');
        expect(getTelco('08081234567')).toBe('AIRTEL');
        expect(getTelco('07081234567')).toBe('AIRTEL');
      });

      it('should detect 9MOBILE numbers', () => {
        expect(getTelco('08091234567')).toBe('9MOBILE');
        expect(getTelco('08171234567')).toBe('9MOBILE');
        expect(getTelco('08181234567')).toBe('9MOBILE');
      });

      it('should return null for invalid numbers', () => {
        expect(getTelco('123')).toBe(null);
        expect(getTelco('08001234567')).toBe(null);
      });

      it('should handle 5-digit prefixes', () => {
        expect(getTelco('07025123456')).toBe('MTN');
        expect(getTelco('07026123456')).toBe('MTN');
      });
    });

    describe('getPhoneInfo', () => {
      it('should return comprehensive phone information', () => {
        const info = getPhoneInfo('08031234567');
        
        expect(info.original).toBe('08031234567');
        expect(info.normalized).toBe('+2348031234567');
        expect(info.telco).toBe('MTN');
        expect(info.isValid).toBe(true);
        expect(info.format).toBe('local');
        expect(info.prefix).toBe('0803');
        expect(info.number).toBe('8031234567');
      });

      it('should handle invalid numbers', () => {
        const info = getPhoneInfo('123');
        
        expect(info.original).toBe('123');
        expect(info.normalized).toBe('');
        expect(info.telco).toBe(null);
        expect(info.isValid).toBe(false);
        expect(info.prefix).toBe('');
        expect(info.number).toBe('');
      });

      it('should cache results for performance', () => {
        const phone = '08031234567';
        const info1 = getPhoneInfo(phone);
        const info2 = getPhoneInfo(phone);
        
        expect(info1).toBe(info2); // Should return cached result
      });
    });

    describe('splitPhoneParts', () => {
      it('should split phone number correctly', () => {
        const parts = splitPhoneParts('08031234567');
        
        expect(parts.prefix).toBe('0803');
        expect(parts.telco).toBe('MTN');
        expect(parts.number).toBe('8031234567');
      });

      it('should handle 5-digit prefixes', () => {
        const parts = splitPhoneParts('07025123456');
        
        expect(parts.prefix).toBe('07025');
        expect(parts.telco).toBe('MTN');
        expect(parts.number).toBe('7025123456');
      });
    });

    describe('generateRandomPhone', () => {
      it('should generate valid phone numbers', () => {
        const phone = generateRandomPhone();
        expect(isValidNigerianNumber(phone)).toBe(true);
        expect(getTelco(phone)).not.toBe(null);
      });

      it('should generate MTN numbers when specified', () => {
        const phone = generateRandomPhone('MTN');
        expect(getTelco(phone)).toBe('MTN');
      });

      it('should generate GLO numbers when specified', () => {
        const phone = generateRandomPhone('GLO');
        expect(getTelco(phone)).toBe('GLO');
      });

      it('should generate AIRTEL numbers when specified', () => {
        const phone = generateRandomPhone('AIRTEL');
        expect(getTelco(phone)).toBe('AIRTEL');
      });

      it('should generate 9MOBILE numbers when specified', () => {
        const phone = generateRandomPhone('9MOBILE');
        expect(getTelco(phone)).toBe('9MOBILE');
      });
    });
  });

  describe('Ultra-Optimized Features', () => {
    describe('safeNormalizePhone', () => {
      it('should return success result for valid phones', () => {
        const result = safeNormalizePhone('08031234567');
        expect(result.success).toBe(true);
        expect(result.data).toBe('+2348031234567');
        expect(result.error).toBe(null);
      });

      it('should return error result for invalid phones', () => {
        const result = safeNormalizePhone('123');
        expect(result.success).toBe(false);
        expect(result.data).toBe(null);
        expect(result.error).toContain('Invalid phone number length');
      });

      it('should handle different formats', () => {
        const result = safeNormalizePhone('08031234567', 'local');
        expect(result.success).toBe(true);
        expect(result.data).toBe('08031234567');
      });
    });

    describe('Batch Processing', () => {
      const testPhones = [
        '08031234567',
        '08051234567',
        '08021234567',
        '08091234567',
        '123' // Invalid
      ];

      it('should batch normalize phones', () => {
        const results = batchNormalizePhones(testPhones);
        expect(results).toHaveLength(5);
        expect(results[0].success).toBe(true);
        expect(results[0].data).toBe('+2348031234567');
        expect(results[4].success).toBe(false);
      });

      it('should batch get telcos', () => {
        const results = batchGetTelcos(testPhones);
        expect(results).toHaveLength(5);
        expect(results[0]).toBe('MTN');
        expect(results[1]).toBe('GLO');
        expect(results[2]).toBe('AIRTEL');
        expect(results[3]).toBe('9MOBILE');
        expect(results[4]).toBe(null);
      });

      it('should batch validate phones', () => {
        const results = batchValidatePhones(testPhones);
        expect(results).toHaveLength(5);
        expect(results[0]).toBe(true);
        expect(results[1]).toBe(true);
        expect(results[2]).toBe(true);
        expect(results[3]).toBe(true);
        expect(results[4]).toBe(false);
      });
    });







    describe('Type Guards', () => {
      it('should validate phone numbers', () => {
        expect(isValidatedPhone('+2348031234567')).toBe(true);
        expect(isValidatedPhone('123')).toBe(false);
      });

      it('should check normalized phones', () => {
        expect(isNormalizedPhone('+2348031234567')).toBe(true);
        expect(isNormalizedPhone('08031234567')).toBe(false);
      });
    });


  });

  describe('Utility Functions', () => {
    it('should return all telcos', () => {
      const telcos = getAllTelcos();
      expect(telcos).toContain('MTN');
      expect(telcos).toContain('GLO');
      expect(telcos).toContain('AIRTEL');
      expect(telcos).toContain('9MOBILE');
    });

    it('should get telco info', () => {
      const mtnInfo = getTelcoInfo('MTN');
      expect(mtnInfo.provider).toBe('MTN');
      expect(mtnInfo.description).toBe('MTN Nigeria');
      expect(mtnInfo.prefixes).toContain('0803');
    });

    it('should find telco by prefix', () => {
      expect(getTelcoByPrefix('0803')).toBe('MTN');
      expect(getTelcoByPrefix('0805')).toBe('GLO');
      expect(getTelcoByPrefix('0802')).toBe('AIRTEL');
      expect(getTelcoByPrefix('0809')).toBe('9MOBILE');
      expect(getTelcoByPrefix('9999')).toBe(null);
    });

    it('should format to international', () => {
      expect(formatPhoneToInternational('08031234567')).toBe('+2348031234567');
      expect(formatPhoneToInternational('+2348031234567')).toBe('+2348031234567');
    });

    it('should format to local', () => {
      expect(formatPhoneToLocal('08031234567')).toBe('08031234567');
      expect(formatPhoneToLocal('+2348031234567')).toBe('08031234567');
    });

    it('should validate phone format', () => {
      expect(validatePhoneFormat('08031234567', 'local')).toBe(true);
      expect(validatePhoneFormat('+2348031234567', 'international')).toBe(true);
      expect(validatePhoneFormat('123', 'local')).toBe(false);
    });
  });

  describe('Type Safety', () => {
    it('should have correct TelcoProvider type', () => {
      const providers: TelcoProvider[] = ['MTN', 'GLO', 'AIRTEL', '9MOBILE'];
      expect(providers).toHaveLength(4);
    });

    it('should have correct PhoneFormat type', () => {
      const formats: PhoneFormat[] = ['local', 'international', 'e164'];
      expect(formats).toHaveLength(3);
    });

    it('should have branded types', () => {
      const phone = '08031234567';
      if (isValidNigerianNumber(phone)) {
        const validated: ValidatedPhone = phone;
        expect(validated).toBe(phone);
      }
    });
  });

  describe('Error Handling', () => {
    it('should throw PhoneValidationError', () => {
      expect(() => {
        throw new PhoneValidationError('Test error', 'INVALID_FORMAT', 'test');
      }).toThrow(PhoneValidationError);
    });

    it('should have proper error properties', () => {
      const error = new PhoneValidationError('Test error', 'INVALID_FORMAT', 'test');
      expect(error.code).toBe('INVALID_FORMAT');
      expect(error.input).toBe('test');
      expect(error.name).toBe('PhoneValidationError');
    });
  });
}); 