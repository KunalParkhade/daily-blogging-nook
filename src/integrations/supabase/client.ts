// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kdlsoetkjcnfbcgvazqc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbHNvZXRramNuZmJjZ3ZhenFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MjA5NDgsImV4cCI6MjA1NTI5Njk0OH0.w5MTRU5FPae0Tn2z-RqacEuVXznggYFzf8Gh6v2Lx-w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);