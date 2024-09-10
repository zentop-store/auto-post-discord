async function verifyAccess() {
  const accessCode = document.getElementById('access-code').value;
  const response = await fetch('/api/verify-access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessCode }),
  });

  const data = await response.json();
  const messageElement = document.getElementById('access-message');

  if (response.ok) {
    messageElement.textContent = 'Access code verified successfully!';
    // Enable the form if verification is successful
    document.getElementById('token').disabled = false;
    document.getElementById('channelId').disabled = false;
    document.getElementById('message').disabled = false;
    document.getElementById('delay').disabled = false;
    document.getElementById('postButton').disabled = false;
  } else {
    messageElement.textContent = data.message || 'Failed to verify access code.';
  }
}
