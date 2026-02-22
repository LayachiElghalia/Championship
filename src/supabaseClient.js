import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://tgtijxtqcfbsdvhitvvw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndGlqeHRxY2Zic2R2aGl0dnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MTMxNzUsImV4cCI6MjA4NzI4OTE3NX0.RU484ZE3xYJrKxzNWaEv-HRdqNRqgA4fAjj-gOHw9G4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);