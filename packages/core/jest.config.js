module.exports = {
  displayName: '@joktec/core',
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testMatch: ['**/__tests__/**/*.spec.(ts|js)'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**'],
  coverageReporters: ['json', 'html', 'text-summary'],
  coverageDirectory: '<rootDir>/coverage/',
};
