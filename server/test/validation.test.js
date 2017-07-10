const expect = require('expect');
const {isRealString} = require('./../utils/validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var results = isRealString(98);
        expect(results).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var results = isRealString('    ');
        expect(results).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        var results = isRealString('   name=Brennan&room=Galaxia   ');
        expect(results).toBe(true);
    });
});