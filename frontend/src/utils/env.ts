// This file provides a consistent way to access environment variables
// that can be easily mocked in tests

// Default values for environment variables
const defaultEnv = {
  VITE_BACKEND_URL: 'http://127.0.0.1:8000',
};

// Define the environment variable interface
interface EnvVars {
  VITE_BACKEND_URL?: string;
}

// Try to get environment variables from Vite if available
let viteEnv: EnvVars = {};
try {
  // @ts-ignore - This will work in Vite but not in Jest
  if (import.meta?.env) {
    viteEnv = {
      // @ts-ignore
      VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    };
  }
} catch (e) {
  // In test environment, this will fail, which is fine
  console.log('Running in test environment');
}

// Export the environment variables, preferring Vite values if available
export const env = {
  VITE_BACKEND_URL: viteEnv.VITE_BACKEND_URL || defaultEnv.VITE_BACKEND_URL,
};
