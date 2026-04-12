import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper: Check if Supabase is properly configured
 */
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://your-project.supabase.co' && supabaseAnonKey !== 'your-anon-key';
};
/**
 * Helper: Submit a public report/complaint
 */
export const submitReport = async (reportData) => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Simulating submission...');
    return { data: { tracking_id: `T-${Math.floor(100000 + Math.random() * 900000)}` }, error: null };
  }

  const trackingId = `T-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const { data, error } = await supabase
    .from('public_reports')
    .insert([
      {
        ...reportData,
        tracking_id: trackingId,
        status: 'pending',
      }
    ])
    .select();

  return { data: data?.[0], error };
};
