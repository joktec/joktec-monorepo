/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  displayName: '@joktec/micro',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.ts', '!/**/*.d.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}', '!**/index.ts', '!**/*.{d,enum}.ts'],
  coverageReporters: ['json', 'html', 'text-summary', 'clover', 'lcov'],
  passWithNoTests: true,
};
