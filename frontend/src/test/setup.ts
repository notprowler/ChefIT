import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers as any);

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
}); 

// Mock import.meta.env for testing
if (!(globalThis as any).import?.meta?.env) {
  (globalThis as any).import = { meta: { env: {} } };
}

(globalThis as any).import.meta.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL;
(globalThis as any).import.meta.env.VITE_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;