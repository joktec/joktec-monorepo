/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  displayName: '@joktec/arango',
  passWithNoTests: true,
  preset: 'ts-jest',
  rootDir: 'src',
  transform: {
    '^.+\\.(t|s)s$': 'ts-jest',
  },
  coverageDirectory: '<rootDir>/../coverage/',
  collectCoverageFrom: ['**/*.{ts,js}', '!**/index.ts', '!**/*.{d,enum}.ts'],
};
