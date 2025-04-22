import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, anonKey);

export default supabase;