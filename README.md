# nig-utils

[![Version](https://img.shields.io/npm/v/nig-utils)](https://www.npmjs.com/package/nig-utils)
[![License](https://img.shields.io/npm/l/nig-utils)](https://github.com/MuyiwaJohnson/ng-utils/blob/main/LICENSE)
[![Size](https://img.shields.io/bundlephobia/min/nig-utils)](https://bundlephobia.com/package/nig-utils)

A lightweight utility library for Nigerian developers. Handles phone numbers, money formatting, and geography data.

## Install

```bash
npm install nig-utils
```

## Quick Start

```typescript
// Phone utilities (included in main bundle - 5KB)
import { normalizePhone, getTelco } from 'nig-utils';

// Money utilities (3KB when imported)
import { formatNaira, addVAT } from 'nig-utils/money';

// Geography utilities (15KB when imported)
import { getStates, getLGAs } from 'nig-utils/geo';

// Phone validation
normalizePhone('08031234567'); // '+2348031234567'
getTelco('08031234567'); // 'MTN'

// Money formatting
formatNaira(1500); // '₦1,500.00'
addVAT(1000); // 1075 (7.5% VAT)

// Geography data
getStates(); // ['Lagos', 'Kano', ...]
getLGAs('Lagos'); // ['Ikeja', 'Victoria Island', ...]
```

## 📱 Phone Utilities

Core phone number validation and telco detection.

```typescript
import { normalizePhone, getTelco, isValidNigerianNumber } from 'nig-utils';

// Basic validation
isValidNigerianNumber('08031234567'); // true
isValidNigerianNumber('123'); // false

// Normalization
normalizePhone('08031234567'); // '+2348031234567'
normalizePhone('+2348031234567', 'local'); // '08031234567'

// Telco detection
getTelco('08031234567'); // 'MTN'
getTelco('08051234567'); // 'GLO'

// Batch processing
batchNormalizePhones(['08031234567', '08051234567']);
batchGetTelcos(['08031234567', '08051234567']);
```

### 📋 API Reference

| Function | Description | Parameters | Returns | Example |
|----------|-------------|------------|---------|---------|
| `normalizePhone(phone, format?)` | Normalize phone to E.164 format | `phone: string, format?: 'local' \| 'international' \| 'e164'` | `string` | `normalizePhone('08031234567')` → `'+2348031234567'` |
| `getTelco(phone)` | Get telco provider from phone number | `phone: string` | `'MTN' \| 'GLO' \| 'AIRTEL' \| '9MOBILE' \| null` | `getTelco('08031234567')` → `'MTN'` |
| `isValidNigerianNumber(phone)` | Validate Nigerian phone number | `phone: string` | `boolean` | `isValidNigerianNumber('08031234567')` → `true` |
| `getPhoneInfo(phone)` | Get comprehensive phone information | `phone: string` | `PhoneInfo` | `getPhoneInfo('08031234567')` → `{telco: 'MTN', normalized: '+2348031234567', ...}` |
| `safeNormalizePhone(phone)` | Safe normalization (no exceptions) | `phone: string` | `PhoneResult<string>` | `safeNormalizePhone('invalid')` → `{success: false, error: '...'}` |
| `formatPhoneToLocal(phone)` | Convert to local format (0...) | `phone: string` | `string` | `formatPhoneToLocal('+2348031234567')` → `'08031234567'` |
| `formatPhoneToInternational(phone)` | Convert to international format | `phone: string` | `string` | `formatPhoneToInternational('08031234567')` → `'+2348031234567'` |
| `validatePhoneFormat(phone, format)` | Validate specific format | `phone: string, format: PhoneFormat` | `boolean` | `validatePhoneFormat('08031234567', 'local')` → `true` |
| `batchNormalizePhones(phones)` | Normalize multiple phone numbers | `phones: string[]` | `PhoneResult<string>[]` | `batchNormalizePhones(['08031234567', '08051234567'])` |
| `batchGetTelcos(phones)` | Get telcos for multiple phones | `phones: string[]` | `(TelcoProvider \| null)[]` | `batchGetTelcos(['08031234567', '08051234567'])` |
| `batchValidatePhones(phones)` | Validate multiple phone numbers | `phones: string[]` | `boolean[]` | `batchValidatePhones(['08031234567', 'invalid'])` |
| `generateRandomPhone(telco?)` | Generate random valid phone number | `telco?: TelcoProvider` | `string` | `generateRandomPhone('MTN')` → `'08031234567'` |
| `getAllTelcos()` | Get list of all telco providers | - | `TelcoProvider[]` | `getAllTelcos()` → `['MTN', 'GLO', 'AIRTEL', '9MOBILE']` |
| `getTelcoInfo(provider)` | Get telco provider information | `provider: TelcoProvider` | `TelcoPrefix` | `getTelcoInfo('MTN')` → `{name: 'MTN', prefixes: [...]}` |
| `getTelcoByPrefix(prefix)` | Get telco by prefix | `prefix: string` | `TelcoProvider \| null` | `getTelcoByPrefix('0803')` → `'MTN'` |

## 💰 Money Utilities

Naira formatting and currency calculations.

```typescript
import { formatNaira, parseNaira, addVAT, removeVAT } from 'nig-utils/money';

// Formatting
formatNaira(1500); // '₦1,500.00'
formatNaira(1500000, { compact: true }); // '₦1.5M'

// Parsing
parseNaira('₦1.5K'); // 1500
parseNaira('₦1,500.00'); // 1500

// VAT calculations
addVAT(1000); // 1075 (7.5% VAT)
removeVAT(1075); // 1000

// Currency conversion
nairaToKobo(1500); // 150000
koboToNaira(150000); // 1500

// Spelling out amounts
spellOutNaira(1500); // 'One thousand, five hundred Naira only'
```

### 📋 API Reference

| Function | Description | Parameters | Returns | Example |
|----------|-------------|------------|---------|---------|
| `formatNaira(amount, options?)` | Format number as Naira | `amount: number, options?: MoneyFormatOptions` | `string` | `formatNaira(1500)` → `'₦1,500.00'` |
| `parseNaira(text, options?)` | Parse Naira text to number | `text: string, options?: MoneyFormatOptions` | `number` | `parseNaira('₦1.5K')` → `1500` |
| `addVAT(amount, rate?)` | Add VAT to amount (default 7.5%) | `amount: number, rate?: number` | `number` | `addVAT(1000)` → `1075` |
| `removeVAT(amount, rate?)` | Remove VAT from amount | `amount: number, rate?: number` | `number` | `removeVAT(1075)` → `1000` |
| `calculatePercentage(amount, percentage)` | Calculate percentage of amount | `amount: number, percentage: number` | `number` | `calculatePercentage(1000, 15)` → `150` |
| `nairaToKobo(naira)` | Convert Naira to Kobo | `naira: number` | `number` | `nairaToKobo(1.50)` → `150` |
| `koboToNaira(kobo)` | Convert Kobo to Naira | `kobo: number` | `number` | `koboToNaira(150)` → `1.50` |
| `spellOutNaira(amount)` | Spell out amount in words | `amount: number` | `string` | `spellOutNaira(1500)` → `'One thousand, five hundred Naira only'` |
| `isValidNairaAmount(text)` | Validate Naira amount format | `text: string` | `boolean` | `isValidNairaAmount('₦1,500.00')` → `true` |
| `roundToNaira(amount)` | Round to nearest Naira | `amount: number` | `number` | `roundToNaira(1.75)` → `2` |
| `roundToKobo(amount)` | Round to nearest Kobo | `amount: number` | `number` | `roundToKobo(1.75)` → `1.75` |
| `formatRange(min, max, options?)` | Format price range | `min: number, max: number, options?: MoneyFormatOptions` | `string` | `formatRange(1000, 5000)` → `'₦1,000.00 - ₦5,000.00'` |

## 🗺️ Geography Utilities

Nigerian states, LGAs, and cities data.

```typescript
import { getStates, getLGAs, getCities, getGeoZones } from 'nig-utils/geo';

// States
getStates(); // ['Lagos', 'Kano', 'Rivers', ...]
getStateInfo('Lagos'); // { name: 'Lagos', capital: 'Ikeja', ... }

// LGAs
getLGAs('Lagos'); // ['Ikeja', 'Victoria Island', 'Surulere', ...]

// Cities
getCities('Lagos'); // ['Lagos', 'Ikeja', 'Victoria Island', ...]
getAllCities(); // All major cities in Nigeria

// Geo zones
getGeoZones(); // ['North Central', 'North East', ...]
getStatesByZone('South West'); // ['Lagos', 'Ogun', 'Ondo', ...]

// Search
searchStates('lag'); // ['Lagos']
searchCities('lagos'); // [{ name: 'Lagos', state: 'Lagos', type: 'capital' }]
```

### 📋 API Reference

| Function | Description | Parameters | Returns | Example |
|----------|-------------|------------|---------|---------|
| `getStates()` | Get all Nigerian states | - | `string[]` | `getStates()` → `['Lagos', 'Kano', ...]` |
| `getGeoZones()` | Get all geopolitical zones | - | `string[]` | `getGeoZones()` → `['North Central', 'North East', ...]` |
| `getStatesByZone(zone)` | Get states in a zone | `zone: string` | `string[]` | `getStatesByZone('South West')` → `['Lagos', 'Oyo', ...]` |
| `isValidState(state)` | Validate state name | `state: string` | `boolean` | `isValidState('Lagos')` → `true` |
| `isValidGeoZone(zone)` | Validate zone name | `zone: string` | `boolean` | `isValidGeoZone('South West')` → `true` |
| `getLGAs(state)` | Get LGAs for a state | `state: string` | `string[]` | `getLGAs('Lagos')` → `['Agege', 'Ikeja', ...]` |
| `getCities(state)` | Get cities for a state | `state: string` | `string[]` | `getCities('Lagos')` → `['Lagos', 'Ikeja', ...]` |
| `getCapital(state)` | Get capital of a state | `state: string` | `string` | `getCapital('Lagos')` → `'Ikeja'` |
| `getGeoZone(state)` | Get geopolitical zone | `state: string` | `string` | `getGeoZone('Lagos')` → `'South West'` |
| `searchStates(query)` | Search states by name | `query: string` | `string[]` | `searchStates('lag')` → `['Lagos']` |
| `searchCities(query)` | Search cities by name | `query: string` | `City[]` | `searchCities('lag')` → `[{name: 'Lagos', state: 'Lagos'}]` |
| `getStateInfo(state)` | Get complete state info | `state: string` | `State \| null` | `getStateInfo('Lagos')` → `{name, capital, geoZone, lgas, majorCities}` |
| `getZoneInfo(zone)` | Get complete zone info | `zone: string` | `GeoZone \| null` | `getZoneInfo('South West')` → `{name, states, description}` |
| `getAllCities()` | Get all cities in Nigeria | - | `City[]` | `getAllCities()` → `[{name, state, type}, ...]` |

## 📦 Bundle Sizes

- **Main bundle** (phone utilities only): **5KB**
- **Money module**: **3KB** (when imported)
- **Geography module**: **15KB** (when imported)

Import only what you need for optimal bundle size:

```typescript
// Small bundle - phone only
import { normalizePhone } from 'nig-utils';

// Add money utilities
import { formatNaira } from 'nig-utils/money';

// Add geography data
import { getStates } from 'nig-utils/geo';
```

## 🔧 Error Handling

Safe operations that don't throw exceptions:

```typescript
import { safeNormalizePhone } from 'nig-utils';

const result = safeNormalizePhone('invalid');
if (result.success) {
  console.log(result.data); // Normalized phone
} else {
  console.log(result.error); // Error message
}
```

## 🛡️ TypeScript Support

Full TypeScript support with comprehensive types:

```typescript
import type { PhoneInfo, TelcoProvider } from 'nig-utils';

const phoneInfo: PhoneInfo = getPhoneInfo('08031234567');
const telco: TelcoProvider = getTelco('08031234567');
```

## 🌐 Browser & Node.js

Works in both environments:

```typescript
// Browser
import { normalizePhone } from 'nig-utils';

// Node.js
const { normalizePhone } = require('nig-utils');
```

## 📄 License

MIT © [Ademuyiwa Johnson](https://github.com/MuyiwaJohnson) 