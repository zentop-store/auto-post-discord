import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mthwiydsckksxhubpsqd.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY; // Pastikan environment variable ini tersedia di Vercel
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessCode } = req.body;

    // Query untuk cek apakah kode akses valid
    const { data, error } = await supabase
      .from('code_access')
      .select('*')
      .eq('code', accessCode)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (data) {
      // Kode valid
      return res.status(200).json({ success: true });
    } else {
      // Kode tidak valid
      return res.status(400).json({ success: false, message: 'Kode akses tidak valid' });
    }
  } else {
    // Method tidak diizinkan
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
