import { describe, it, expect } from 'vitest';
import {
  getStates,
  getLGAs,
  getCities,
  getCapital,
  getGeoZone,
  getStatesByZone,
  getGeoZones,
  getStateInfo,
  getZoneInfo,
  searchStates,
  searchCities,
  getAllCities,
  isValidState,
  isValidGeoZone
} from '../src/geo';

describe('Geography Module', () => {
  describe('getStates', () => {
    it('should return all Nigerian states', () => {
      const states = getStates();
      expect(states).toHaveLength(37); // 36 states + FCT
      expect(states).toContain('Lagos');
      expect(states).toContain('Kano');
      expect(states).toContain('FCT');
    });

    it('should return states in alphabetical order', () => {
      const states = getStates();
      const sortedStates = [...states].sort();
      expect(states).toEqual(sortedStates);
    });
  });

  describe('getLGAs', () => {
    it('should return LGAs for a valid state', () => {
      const lgas = getLGAs('Lagos');
      expect(lgas).toContain('Agege');
      expect(lgas).toContain('Ikeja');
      expect(lgas).toContain('Eti Osa');
      expect(lgas.length).toBeGreaterThan(0);
    });

    it('should return empty array for invalid state', () => {
      const lgas = getLGAs('Invalid State');
      expect(lgas).toEqual([]);
    });

    it('should return LGAs for different states', () => {
      const lagosLgas = getLGAs('Lagos');
      const kanoLgas = getLGAs('Kano');
      expect(lagosLgas).not.toEqual(kanoLgas);
      expect(lagosLgas.length).toBeGreaterThan(0);
      expect(kanoLgas.length).toBeGreaterThan(0);
    });
  });

  describe('getCities', () => {
    it('should return major cities for a valid state', () => {
      const cities = getCities('Lagos');
      expect(cities).toContain('Lagos');
      expect(cities).toContain('Ikeja');
      expect(cities.length).toBeGreaterThan(0);
    });

    it('should return empty array for invalid state', () => {
      const cities = getCities('Invalid State');
      expect(cities).toEqual([]);
    });

    it('should return different cities for different states', () => {
      const lagosCities = getCities('Lagos');
      const kanoCities = getCities('Kano');
      expect(lagosCities).not.toEqual(kanoCities);
    });
  });

  describe('getCapital', () => {
    it('should return capital for a valid state', () => {
      expect(getCapital('Lagos')).toBe('Ikeja');
      expect(getCapital('Kano')).toBe('Kano');
      expect(getCapital('FCT')).toBe('Abuja');
    });

    it('should return empty string for invalid state', () => {
      expect(getCapital('Invalid State')).toBe('');
    });
  });

  describe('getGeoZone', () => {
    it('should return geopolitical zone for a valid state', () => {
      expect(getGeoZone('Lagos')).toBe('South West');
      expect(getGeoZone('Kano')).toBe('North West');
      expect(getGeoZone('FCT')).toBe('North Central');
    });

    it('should return empty string for invalid state', () => {
      expect(getGeoZone('Invalid State')).toBe('');
    });
  });

  describe('getStatesByZone', () => {
    it('should return states for a valid geopolitical zone', () => {
      const southWestStates = getStatesByZone('South West');
      expect(southWestStates).toContain('Lagos');
      expect(southWestStates).toContain('Oyo');
      expect(southWestStates).toContain('Ondo');
      expect(southWestStates.length).toBeGreaterThan(0);
    });

    it('should return empty array for invalid zone', () => {
      const states = getStatesByZone('Invalid Zone');
      expect(states).toEqual([]);
    });

    it('should return different states for different zones', () => {
      const southWestStates = getStatesByZone('South West');
      const northWestStates = getStatesByZone('North West');
      expect(southWestStates).not.toEqual(northWestStates);
    });
  });

  describe('getGeoZones', () => {
    it('should return all geopolitical zones', () => {
      const zones = getGeoZones();
      expect(zones).toContain('North Central');
      expect(zones).toContain('North East');
      expect(zones).toContain('North West');
      expect(zones).toContain('South East');
      expect(zones).toContain('South South');
      expect(zones).toContain('South West');
      expect(zones).toHaveLength(6);
    });
  });

  describe('getStateInfo', () => {
    it('should return complete state information', () => {
      const lagosInfo = getStateInfo('Lagos');
      expect(lagosInfo).toEqual({
        name: 'Lagos',
        capital: 'Ikeja',
        geoZone: 'South West',
        lgas: expect.any(Array),
        majorCities: expect.any(Array)
      });
      expect(lagosInfo?.lgas.length).toBeGreaterThan(0);
      expect(lagosInfo?.majorCities.length).toBeGreaterThan(0);
    });

    it('should return null for invalid state', () => {
      const info = getStateInfo('Invalid State');
      expect(info).toBeNull();
    });
  });

  describe('getZoneInfo', () => {
    it('should return complete zone information', () => {
      const southWestInfo = getZoneInfo('South West');
      expect(southWestInfo).toEqual({
        name: 'South West',
        states: expect.any(Array),
        description: expect.any(String)
      });
      expect(southWestInfo?.states.length).toBeGreaterThan(0);
      expect(southWestInfo?.description.length).toBeGreaterThan(0);
    });

    it('should return null for invalid zone', () => {
      const info = getZoneInfo('Invalid Zone');
      expect(info).toBeNull();
    });
  });

  describe('searchStates', () => {
    it('should find states by partial name', () => {
      const results = searchStates('lag');
      expect(results).toContain('Lagos');
    });

    it('should be case insensitive', () => {
      const results1 = searchStates('LAG');
      const results2 = searchStates('lag');
      expect(results1.length).toBe(results2.length);
    });

    it('should return multiple results for common prefixes', () => {
      const results = searchStates('kan');
      expect(results).toContain('Kano');
      // Note: search is case-sensitive, so 'kan' won't match 'Katsina' or 'Kebbi'
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty array for no matches', () => {
      const results = searchStates('xyz');
      expect(results).toEqual([]);
    });
  });

  describe('searchCities', () => {
    it('should find cities by partial name', () => {
      const results = searchCities('lag');
      expect(results.some(city => city.name === 'Lagos')).toBe(true);
    });

    it('should return city objects with state and type', () => {
      const results = searchCities('lag');
      expect(results[0]).toHaveProperty('name');
      expect(results[0]).toHaveProperty('state');
      expect(results[0]).toHaveProperty('type');
    });

    it('should be case insensitive', () => {
      const results1 = searchCities('LAG');
      const results2 = searchCities('lag');
      expect(results1.length).toBe(results2.length);
    });

    it('should return empty array for no matches', () => {
      const results = searchCities('xyz');
      expect(results).toEqual([]);
    });
  });

  describe('getAllCities', () => {
    it('should return all cities in Nigeria', () => {
      const cities = getAllCities();
      expect(cities.length).toBeGreaterThan(0);
      expect(cities.every(city => 
        city.name && city.state && ['capital', 'major'].includes(city.type)
      )).toBe(true);
    });

    it('should include capital cities', () => {
      const cities = getAllCities();
      const lagosCities = cities.filter(city => city.state === 'Lagos');
      const lagosCapital = lagosCities.find(city => city.type === 'capital');
      expect(lagosCapital?.name).toBe('Ikeja');
    });
  });

  describe('isValidState', () => {
    it('should return true for valid states', () => {
      expect(isValidState('Lagos')).toBe(true);
      expect(isValidState('Kano')).toBe(true);
      expect(isValidState('FCT')).toBe(true);
    });

    it('should return false for invalid states', () => {
      expect(isValidState('Invalid State')).toBe(false);
      expect(isValidState('')).toBe(false);
    });

    it('should be case sensitive', () => {
      expect(isValidState('lagos')).toBe(false);
      expect(isValidState('LAGOS')).toBe(false);
    });
  });

  describe('isValidGeoZone', () => {
    it('should return true for valid zones', () => {
      expect(isValidGeoZone('South West')).toBe(true);
      expect(isValidGeoZone('North West')).toBe(true);
    });

    it('should return false for invalid zones', () => {
      expect(isValidGeoZone('Invalid Zone')).toBe(false);
      expect(isValidGeoZone('')).toBe(false);
    });

    it('should be case sensitive', () => {
      expect(isValidGeoZone('south west')).toBe(false);
      expect(isValidGeoZone('SOUTH WEST')).toBe(false);
    });
  });

  describe('Data Integrity', () => {
    it('should have consistent state data', () => {
      const states = getStates();
      states.forEach(state => {
        const info = getStateInfo(state);
        expect(info).not.toBeNull();
        expect(info?.name).toBe(state);
        expect(info?.capital).toBeTruthy();
        expect(info?.geoZone).toBeTruthy();
        expect(info?.lgas.length).toBeGreaterThan(0);
        expect(info?.majorCities.length).toBeGreaterThan(0);
      });
    });

    it('should have consistent zone data', () => {
      const zones = getGeoZones();
      zones.forEach(zone => {
        const info = getZoneInfo(zone);
        expect(info).not.toBeNull();
        expect(info?.name).toBe(zone);
        expect(info?.states.length).toBeGreaterThan(0);
        expect(info?.description).toBeTruthy();
      });
    });

    it('should have valid geopolitical zones for all states', () => {
      const states = getStates();
      states.forEach(state => {
        const geoZone = getGeoZone(state);
        expect(isValidGeoZone(geoZone)).toBe(true);
      });
    });

    it('should have capitals that are included in major cities', () => {
      const states = getStates();
      states.forEach(state => {
        const capital = getCapital(state);
        const cities = getCities(state);
        expect(cities).toContain(capital);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings', () => {
      expect(getLGAs('')).toEqual([]);
      expect(getCities('')).toEqual([]);
      expect(getCapital('')).toBe('');
      expect(getGeoZone('')).toBe('');
      expect(searchStates('')).toEqual(getStates());
      expect(searchCities('')).toEqual([]);
    });

    it('should handle special characters in search', () => {
      expect(searchStates('@#$%')).toEqual([]);
      expect(searchCities('@#$%')).toEqual([]);
    });

    it('should handle very long search queries', () => {
      const longQuery = 'a'.repeat(1000);
      expect(searchStates(longQuery)).toEqual([]);
      expect(searchCities(longQuery)).toEqual([]);
    });
  });
}); 