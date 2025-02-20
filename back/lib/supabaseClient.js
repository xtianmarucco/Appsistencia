import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const SUPABASE_URL = process.env.SUPABASE_URL || "TU_SUPABASE_URL";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "TU_SUPABASE_ANON_KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;