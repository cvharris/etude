module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/tests/**'
  ],
  coverageReporters: ['text']
}
