function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
}

export const API_KEY = getEnvVar("API_KEY");
export const BASE_URL = getEnvVar("BASE_URL");
