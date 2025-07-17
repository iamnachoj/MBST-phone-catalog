import type { Config } from 'jest'
import nextJest from 'next/jest.js'

// Initialize nextJest to work with Next.js
const createJestConfig = nextJest({
    dir: './'
})

const config: Config = {
    verbose: true,
    coverageProvider: 'v8',
    testEnvironment: 'jsdom', // Simulate a browser environment
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'] // Setup mock after environment is ready
}

export default createJestConfig(config)
