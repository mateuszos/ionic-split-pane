import * as util from './util';

describe('util', () => {

  describe('isPrimitive', () => {

    it('should be false for array/object values', () => {
      expect(util.isPrimitive({})).toEqual(false);
      expect(util.isPrimitive(new Date())).toEqual(false);
      expect(util.isPrimitive([])).toEqual(false);
    });

    it('should be false for blank values', () => {
      expect(util.isPrimitive(NaN)).toEqual(false);
      expect(util.isPrimitive(null)).toEqual(false);
      expect(util.isPrimitive(undefined)).toEqual(false);
    });

    it('should be true for number', () => {
      expect(util.isPrimitive(-1)).toEqual(true);
      expect(util.isPrimitive(0)).toEqual(true);
      expect(util.isPrimitive(1)).toEqual(true);
    });

    it('should be true for boolean', () => {
      expect(util.isPrimitive(true)).toEqual(true);
      expect(util.isPrimitive(false)).toEqual(true);
    });

    it('should be true for string', () => {
      expect(util.isPrimitive('')).toEqual(true);
      expect(util.isPrimitive('   ')).toEqual(true);
      expect(util.isPrimitive('hi')).toEqual(true);
    });

  });

  describe('isTrueProperty', () => {

    it('should be true from boolean true', () => {
      expect(util.isTrueProperty(true)).toBe(true);
    });

    it('should be true from string "true"', () => {
      expect(util.isTrueProperty('true')).toBe(true);
      expect(util.isTrueProperty('TRUE')).toBe(true);
      expect(util.isTrueProperty(' true  ')).toBe(true);
    });

    it('should be true from string "on"', () => {
      expect(util.isTrueProperty(true)).toBe(true);
    });

    it('should be true from empty string ""', () => {
      expect(util.isTrueProperty('')).toBe(true);
      expect(util.isTrueProperty('  ')).toBe(true);
    });

    it('should be true from number greater than zero', () => {
      expect(util.isTrueProperty(1)).toBe(true);
      expect(util.isTrueProperty(999)).toBe(true);
    });

    it('should be false from boolean false', () => {
      expect(util.isTrueProperty(false)).toBe(false);
    });

    it('should be false from string "off"', () => {
      expect(util.isTrueProperty(true)).toBe(true);
    });

    it('should be false from null', () => {
      expect(util.isTrueProperty(null)).toBe(false);
    });

    it('should be false from undefined', () => {
      expect(util.isTrueProperty(undefined)).toBe(false);
    });

    it('should be false from string "false"', () => {
      expect(util.isTrueProperty('false')).toBe(false);
      expect(util.isTrueProperty(' FALSE ')).toBe(false);
      expect(util.isTrueProperty('doesnt actually matter')).toBe(false);
    });

  });

  describe('defaults', () => {

    it('should simple defaults', () => {
      const obj = { a: '1' };
      expect(util.defaults(obj, { a: '2', b: '2' })).toBe(obj);
      expect(obj).toEqual({
        a: '1', b: '2',
      });
    });

    it('should complex defaults', () => {
      expect(util.defaults(
        { a: '0', b: '0' },
        { b: '1', c: '1', e: '1' },
        { c: '2', d: '2' },
      )).toEqual({
        a: '0',
        b: '0',
        c: '2',
        d: '2',
        e: '1',
      });
    });

  });

});
