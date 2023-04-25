import { describe, expect, it, test } from '@jest/globals';
import { generateUUID, rand } from '../generator';

describe('rand function', () => {
    test('should return a number between min and max', () => {
        const randNum = rand(1,10);
        expect(typeof randNum).toBe('number');
        expect(randNum).toBeGreaterThanOrEqual(1);
        expect(randNum).toBeLessThanOrEqual(10);
    });
});

describe('generateUUID function', () => {
    test('should return a unique uuid', () => {
        const uuid1 = generateUUID();
        const uuid2 = generateUUID();
        expect(uuid1).not.toBe(uuid2);
    });

    test('should return a uuid without prefix', () => {
        const uuid = generateUUID();
        expect(typeof uuid).toBe('string');
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    test('should return a prefixed uuid', () => {
        const uuid = generateUUID({ prefix: 'test' });
        expect(typeof uuid).toBe('string');
        expect(uuid).toMatch(/^TEST-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    test('should return a prefixed uuid with uppercase', () => {
        const uuid = generateUUID({ prefix: 'TEST' });
        expect(typeof uuid).toBe('string');
        expect(uuid).toMatch(/^TEST-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    test('should return a prefixed uuid with snake case', () => {
        const uuid = generateUUID({ prefix: 'test-case' });
        expect(typeof uuid).toBe('string');
        expect(uuid).toMatch(/^TEST_CASE-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    test('should return a prefixed uuid with snake case and uppercase', () => {
        const uuid = generateUUID({ prefix: 'TEST-CASE' });
        expect(typeof uuid).toBe('string');
        expect(uuid).toMatch(/^TEST_CASE-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
});