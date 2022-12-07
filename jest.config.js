module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist/'],
  modulePaths: ['<rootDir>/src'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
    },
  },
  rootDir: '.',
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: './coverage/',
  restoreMocks: true,
  resetMocks: true,
  testMatch: ['<rootDir>/src/**/*.+(spec|test).+(ts|js)'],
};
