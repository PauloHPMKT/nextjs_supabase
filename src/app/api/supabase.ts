import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://affgnoiirzeppfihkumv.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey!);

export default supabase;