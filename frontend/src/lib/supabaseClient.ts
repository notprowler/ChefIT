
import { createClient } from '@supabase/supabase-js';

// Safe fallback for tests: use process.env if import.meta.env is missing
const supabaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  process.env.VITE_SUPABASE_URL ||
  "";

const supabaseAnonKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl) {
  throw new Error("supabaseUrl is required.");
}
if (!supabaseAnonKey) {
  throw new Error("supabaseAnonKey is required.");
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
