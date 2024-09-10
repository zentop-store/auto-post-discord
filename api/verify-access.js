import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase client dengan environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accessCode, token, channelId, message, delay } = req.body;

    // Verifikasi kode akses
    const { data, error } = await supabase
      .from('token_akses')
      .select('kode_akses, limit')
      .eq('kode_akses', accessCode)
      .single();

    if (error || !data) {
      return res.status(400).json({ message: 'Invalid access code' });
    }

    // Simpan data untuk digunakan nanti di proses auto-post
    const { error: insertError } = await supabase
      .from('post_data')
      .insert([{ token, channelId, message, delay }]);

    if (insertError) {
      return res.status(500).json({ message: 'Failed to save data' });
    }

    // Kembalikan respons
    res.status(200).json({ message: 'Access code verified and data saved' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
