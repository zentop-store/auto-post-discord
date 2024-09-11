import { createClient } from '@supabase/supabase-js';

// Ambil URL dan kunci dari variabel lingkungan
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessCode } = req.body;

    // Query untuk cek apakah kode akses valid
    const { data, error } = await supabase
      .from('code_access')
      .select('code')
      .eq('code', accessCode)
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: 'Error database' });
    }

    if (data) {
      // Kode valid
      return res.status(200).json({ success: true, message: 'Kode akses valid' });
    } else {
      // Kode tidak valid
      return res.status(400).json({ success: false, message: 'Kode akses tidak valid' });
    }
  } else {
    // Metode tidak diizinkan
    return res.status(405).json({ success: false, message: 'Metode tidak diizinkan' });
  }
}
