import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "...";
export const supabaseKey = "...";
export const supabase = createClient(supabaseUrl, supabaseKey);
