/**
 * Batch Processing Utilities
 */

import type { BatchConvertOptions } from './types';
import { RedenominationEngine } from './engine';

/**
 * Convert array of numbers
 */
export function batchConvertArray(
  engine: RedenominationEngine,
  amounts: number[],
  direction: 'forward' | 'reverse' = 'forward',
  options: BatchConvertOptions = {}
): number[] {
  return amounts.map((amount) => {
    const result = direction === 'forward'
      ? engine.convertForward(amount, options)
      : engine.convertReverse(amount, options);
    return result.amount;
  });
}

/**
 * Convert object values at specified paths
 */
export function batchConvertObject(
  engine: RedenominationEngine,
  data: Record<string, any>,
  direction: 'forward' | 'reverse' = 'forward',
  options: BatchConvertOptions = {}
): Record<string, any> {
  const { paths, deep = false } = options;

  if (paths && paths.length > 0) {
    // Convert specific paths
    const result = { ...data };
    for (const path of paths) {
      const value = getNestedValue(result, path);
      if (typeof value === 'number') {
        const converted = direction === 'forward'
          ? engine.convertForward(value, options)
          : engine.convertReverse(value, options);
        setNestedValue(result, path, converted.amount);
      }
    }
    return result;
  } else if (deep) {
    // Deep convert all numeric values
    return deepConvertObject(data, engine, direction, options);
  }

  return { ...data };
}

/**
 * Deep convert all numeric values in an object
 */
function deepConvertObject(
  obj: any,
  engine: RedenominationEngine,
  direction: 'forward' | 'reverse',
  options: BatchConvertOptions
): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'number') {
    const converted = direction === 'forward'
      ? engine.convertForward(obj, options)
      : engine.convertReverse(obj, options);
    return converted.amount;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepConvertObject(item, engine, direction, options));
  }

  if (typeof obj === 'object') {
    const result: Record<string, any> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepConvertObject(obj[key], engine, direction, options);
      }
    }
    return result;
  }

  return obj;
}

/**
 * Get nested value from object using dot notation path
 */
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let value = obj;
  
  for (const key of keys) {
    if (value === null || value === undefined) {
      return undefined;
    }
    value = value[key];
  }
  
  return value;
}

/**
 * Set nested value in object using dot notation path
 */
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current = obj;
  
  for (const key of keys) {
    if (current[key] === null || current[key] === undefined || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[lastKey] = value;
}

/**
 * Convert array of objects
 */
export function batchConvertObjects(
  engine: RedenominationEngine,
  objects: Record<string, any>[],
  direction: 'forward' | 'reverse' = 'forward',
  options: BatchConvertOptions = {}
): Record<string, any>[] {
  return objects.map((obj) => batchConvertObject(engine, obj, direction, options));
}

