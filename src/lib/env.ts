function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
}

// Only for Server Side usage
export const API_KEY = getEnvVar("NEXT_PUBLIC_API_KEY");
export const BASE_URL = getEnvVar("BASE_URL");