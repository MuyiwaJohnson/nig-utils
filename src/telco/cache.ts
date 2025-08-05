/**
 * Cache management for Nigerian telecommunications utilities
 * 
 * @fileoverview LRU cache implementation and cache management
 * @author Ademuyiwa Johnson
 * @license MIT
 */

import type { PhoneInfo, PerformanceStats } from './types';
import { REGEX_CACHE, PREFIX_MAP } from './constants';

/**
 * LRU (Least Recently Used) cache implementation for better memory management
 * Automatically evicts least recently used items when capacity is reached
 * 
 * @internal
 * @template K - The key type
 * @template V - The value type
 * 
 * @example
 * ```typescript
 * const cache = new LRUCache<string, PhoneInfo>(1000);
 * cache.set('08031234567', phoneInfo);
 * const info = cache.get('08031234567');
 * ```
 */
export class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;

  /**
   * Creates a new LRU cache with the specified maximum size
   * 
   * @param maxSize - Maximum number of items the cache can hold
   */
  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  /**
   * Retrieves a value from the cache
   * Moves the item to the end (most recently used) if found
   * 
   * @param key - The cache key
   * @returns The cached value or undefined if not found
   */
  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)!;
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }

  /**
   * Stores a value in the cache
   * Evicts least recently used item if cache is full
   * 
   * @param key - The cache key
   * @param value - The value to cache
   */
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  /**
   * Clears all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Gets the current number of items in the cache
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Checks if the cache contains a specific key
   * 
   * @param key - The key to check
   * @returns True if the key exists in the cache
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }

  /**
   * Removes a specific item from the cache
   * 
   * @param key - The key to remove
   * @returns True if the item was removed, false if it didn't exist
   */
  delete(key: K): boolean {
    return this.cache.delete(key);
  }
}

/**
 * Memoized cache for phone info extraction to improve performance
 * Size-limited to prevent memory leaks in long-running applications
 * 
 * @internal
 * @constant
 */
export const phoneInfoCache = new LRUCache<string, PhoneInfo>(1000);

/**
 * Returns performance statistics for the library
 * Useful for monitoring memory usage and cache efficiency
 * 
 * @public
 * @returns Object containing performance metrics
 * 
 * @example
 * ```typescript
 * // Monitor library performance
 * const stats = getPerformanceStats();
 * console.log('Cache usage:', stats);
 * // {
 * //   cacheSize: 150,
 * //   regexCacheSize: 5,
 * //   prefixMapSize: 36
 * // }
 * 
 * // Monitor performance in production
 * setInterval(() => {
 *   const stats = getPerformanceStats();
 *   if (stats.cacheSize > 800) {
 *     console.warn('Cache size getting large, consider clearing');
 *   }
 * }, 60000); // Check every minute
 * 
 * // Log performance metrics
 * function logPerformanceMetrics() {
 *   const stats = getPerformanceStats();
 *   console.log(`Phone cache: ${stats.cacheSize} entries`);
 *   console.log(`Regex cache: ${stats.regexCacheSize} patterns`);
 *   console.log(`Prefix map: ${stats.prefixMapSize} mappings`);
 * }
 * ```
 */
export const getPerformanceStats = (): PerformanceStats => ({
  cacheSize: phoneInfoCache.size,
  regexCacheSize: REGEX_CACHE.size,
  prefixMapSize: PREFIX_MAP.size
});

/**
 * Clears all internal caches to free memory
 * Useful for long-running applications to prevent memory bloat
 * 
 * @public
 * @returns void
 * 
 * @example
 * ```typescript
 * // Clear caches periodically in long-running apps
 * setInterval(() => {
 *   const stats = getPerformanceStats();
 *   if (stats.cacheSize > 1000) {
 *     clearCaches();
 *     console.log('Caches cleared due to size limit');
 *   }
 * }, 300000); // Every 5 minutes
 * 
 * // Clear caches during application shutdown
 * process.on('SIGTERM', () => {
 *   clearCaches();
 *   console.log('Caches cleared during shutdown');
 * });
 * 
 * // Manual cache management
 * function resetLibraryState() {
 *   clearCaches();
 *   console.log('Library state reset');
 * }
 * ```
 */
export const clearCaches = (): void => {
  phoneInfoCache.clear();
  REGEX_CACHE.clear();
}; 