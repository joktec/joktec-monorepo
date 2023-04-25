import { describe, expect, it } from '@jest/globals';
import { Op } from 'sequelize';
import { convertOp } from '../mysql.utils';

describe('convertOp function', () => {
  it('should return the correct symbol for $ne operator', () => {
    const inputOp = '$ne';
    const expectedOp = Op.ne;
    const actualOp = convertOp(inputOp);
    expect(actualOp).toBe(expectedOp);
  });

  it('should return Op.eq for invalid operator', () => {
    const inputOp = '$invalid';
    const expectedOp = Op.eq;
    const actualOp = convertOp(inputOp as any);
    expect(actualOp).toBe(expectedOp);
  });

  it('should return Op.eq for undefined operator', () => {
    const inputOp = undefined;
    const expectedOp = Op.eq;
    const actualOp = convertOp(inputOp);
    expect(actualOp).toBe(expectedOp);
  });
});
