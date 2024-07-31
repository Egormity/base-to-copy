import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ctgeuhrsdvvtpxitmood.supabase.co';
export const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0Z2V1aHJzZHZ2dHB4aXRtb29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MDcwMjEsImV4cCI6MjAzNzM4MzAyMX0.6ZQcGgP3LEuXzdAAq6qh61_CpoF4rPBOFGyxiDHBobk';
export const supabase = createClient(supabaseUrl, supabaseKey);
