module.exports = {
  projects: ['<rootDir>/{apps,packages}/*/jest.config.js'],
  testMatch: ['**/__tests__/**/*.spec.(js|ts)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['{apps,packages}/**/*.{ts,js}', '!**/node_modules/**'],
};
