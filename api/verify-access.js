import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase client dengan environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessCode } = req.body;

    // Verifikasi kode akses
    const { data, error } = await supabase
      .from('token_akses')
      .select('kode_akses')
      .eq('kode_akses', accessCode)
      .single();

    if (error || !data) {
      return res.status(400).json({ message: 'Invalid access code' });
    }

    // Jika kode akses valid
    res.status(200).json({ message: 'Access code verified successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
