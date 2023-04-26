/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  displayName: '@joktec/core',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.ts', '!/**/*.d.ts'],
  testPathIgnorePatterns: ['./node_modules/', './dist/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}', '!**/index.ts', '!**/*.{d,enum}.ts'],
  coverageReporters: ['json', 'html', 'text-summary', 'clover', 'lcov'],
  passWithNoTests: true,
};
