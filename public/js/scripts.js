// Fungsi untuk verifikasi kode akses
async function verifyAccess() {
  const accessCode = document.getElementById('access-code').value;

  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accessCode })
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('access-message').textContent = "Kode akses valid! Sekarang kamu bisa lanjut.";
      enableForm(); // Aktifkan form kalau kode akses valid
    } else {
      document.getElementById('access-message').textContent = "Kode akses tidak valid.";
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('access-message').textContent = "Ada masalah dengan server.";
  }
}

// Fungsi untuk enable input form setelah verifikasi berhasil
function enableForm() {
  document.getElementById('token').disabled = false;
  document.getElementById('channelId').disabled = false;
  document.getElementById('message').disabled = false;
  document.getElementById('delay').disabled = false;
  document.getElementById('postButton').disabled = false;
}
