export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/src/**/interfaces/*.ts',
    '!**/src/main/**.ts'
  ],
  testMatch: ['**/*.spec.ts', '**/*.test.ts']
}
