/* tslint:disable */

/**
 * @private
 * Given a min and max, restrict the given number
 * to the range.
 * @param min the minimum
 * @param n the value
 * @param max the maximum
 */
export function clamp(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

/** @private */
export function debounce(fn: Function, wait: number, immediate = false): any {
 let timeout: number, args: any, context: any, timestamp: number, result: any;
 return function() {
   context = this;
   args = arguments;
   timestamp = Date.now();
   const later: any = function() {
     const last: any = Date.now() - timestamp;
     if (last < wait) {
       timeout = setTimeout(later, wait - last);
     } else {
       timeout = null;
       if (!immediate) {
         result = fn.apply(context, args);
       }
     }
   };
   const callNow = immediate && !timeout;
   if (!timeout) {
     timeout = setTimeout(later, wait);
   }
   if (callNow) {
     result = fn.apply(context, args);
   }
   return result;
 };
}

/**
 * @private
 * Apply default arguments if they don't exist in
 * the first object.
 * @param the destination to apply defaults to.
 */
export function defaults(dest: any, ...args: any[]) {
  for (let i = arguments.length - 1; i >= 1; i--) {
    const source = arguments[i];
    if (source) {
      for (const key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }
  }
  return dest;
}


/** @private */
export function isBoolean(val: any) { return typeof val === 'boolean'; }
/** @private */
export function isString(val: any) { return typeof val === 'string'; }
/** @private */
export function isNumber(val: any) { return typeof val === 'number'; }
/** @private */
export function isFunction(val: any) { return typeof val === 'function'; }
/** @private */
export function isDefined(val: any) { return typeof val !== 'undefined'; }
/** @private */
export function isUndefined(val: any) { return typeof val === 'undefined'; }
/** @private */
export function isPresent(val: any) { return val !== undefined && val !== null; }
/** @private */
export function isBlank(val: any) { return val === undefined || val === null; }
/** @private */
export function isObject(val: any) { return typeof val === 'object'; }
/** @private */
export function isArray(val: any) { return Array.isArray(val); };


/** @private */
export function isPrimitive(val: any) {
  return isString(val) || isBoolean(val) || (isNumber(val) && !isNaN(val));
};


/** @private */
export function isTrueProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return (val === 'true' || val === 'on' || val === '');
  }
  return !!val;
};

/** @hidden */
export type Side = 'left' | 'right' | 'start' | 'end';

/**
 * @hidden
 * Given a side, return if it should be on the right
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 * @param defaultRight whether the default side is right
 */
export function isRightSide(side: Side, isRTL: boolean, defaultRight: boolean = false): boolean {
  switch (side) {
    case 'right': return true;
    case 'left': return false;
    case 'end': return !isRTL;
    case 'start': return isRTL;
    default: return defaultRight ? !isRTL : isRTL;
  }
}

/** @private */
export function removeArrayItem(array: any[], item: any) {
  const index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}


/** @private */
const ASSERT_ENABLED = true;


/** @private */
function _runInDev(fn: Function) {
  if (ASSERT_ENABLED === true) {
    return fn();
  }
}


/** @private */
function _assert(actual: any, reason?: string) {
  if (!actual && ASSERT_ENABLED === true) {
    const message = 'IONIC ASSERT: ' + reason;
    debugger; // tslint:disable-line
    throw new Error(message);
  }
}

/** @private */
export { _assert as assert};

/** @private */
export { _runInDev as runInDev};
