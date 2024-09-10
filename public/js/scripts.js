
// Menyimpan data dari form ke localStorage
function saveFormData() {
  const token = document.getElementById('token').value;
  const channelId = document.getElementById('channelId').value;
  const message = document.getElementById('message').value;
  const delay = document.getElementById('delay').value;

  // Simpan ke localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('channelId', channelId);
  localStorage.setItem('message', message);
  localStorage.setItem('delay', delay);
}

// Mengambil data dari localStorage dan mengisi kembali kolom input saat halaman dimuat
function loadFormData() {
  document.getElementById('token').value = localStorage.getItem('token') || '';
  document.getElementById('channelId').value = localStorage.getItem('channelId') || '';
  document.getElementById('message').value = localStorage.getItem('message') || '';
  document.getElementById('delay').value = localStorage.getItem('delay') || '';
}

// Verifikasi kode akses melalui API ke backend (misal dengan fetch)
function verifyAccess() {
  const accessCode = document.getElementById('access-code').value;

  fetch('/api/verify-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ accessCode })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.getElementById('access-message').innerText = 'Access Verified!';
      enableForm(); // Aktifkan form setelah verifikasi berhasil
    } else {
      document.getElementById('access-message').innerText = 'Invalid Access Code!';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Mengaktifkan form untuk input jika verifikasi berhasil
function enableForm() {
  document.getElementById('token').disabled = false;
  document.getElementById('channelId').disabled = false;
  document.getElementById('message').disabled = false;
  document.getElementById('delay').disabled = false;
  document.getElementById('postButton').disabled = false;
}

// Posting pesan ke Discord (ini hanya logika frontend; untuk implementasi sebenarnya perlu backend)
function postMessage() {
  saveFormData(); // Simpan data sebelum posting

  const token = localStorage.getItem('token');
  const channelId = localStorage.getItem('channelId');
  const message = localStorage.getItem('message');
  const delay = localStorage.getItem('delay');

  // Kirim data ke backend untuk proses auto post ke Discord
  fetch('/api/auto-post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token, channelId, message, delay })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.getElementById('post-status').innerText = 'Message posted successfully!';
      logPost(data.timestamp); // Log waktu pengiriman
    } else {
      document.getElementById('post-status').innerText = 'Failed to post message!';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Log waktu pengiriman pesan
function logPost(timestamp) {
  const logContainer = document.getElementById('log-container');
  const logEntry = document.createElement('div');
  logEntry.innerText = `Message sent at: ${timestamp}`;
  logContainer.appendChild(logEntry);
}

// Muat data form saat halaman dimuat
window.onload = loadFormData;
