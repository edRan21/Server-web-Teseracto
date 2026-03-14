// test-report-individual.js
const http = require('http');

// Reporte individual tipo "medidor"
const payload = {
    "rfc": "TES123456789",
    "nsm": "M2000-TEST-001",
    "nsue": "UTR-001", 
    "report_type": "medidor",
    "file_name": "TES123456789_20241028_M2000-TEST-001_UTR-001.txt",
    "content": "MEDICIONES_DIARIAS\nFlujo: 150 L/s\nVolumen: 45000 m³\nEstado: OK"
};

const data = JSON.stringify(payload);

const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/api/reports',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'teseracto_key_utrs_2025',
        'Content-Length': Buffer.byteLength(data)
    }
};

console.log('📤 Enviando reporte individual...');

const req = http.request(options, (res) => {
    console.log(`✅ Status: ${res.statusCode}`);
    
    let response = '';
    res.on('data', (chunk) => response += chunk);
    res.on('end', () => console.log('📨 Response:', response));
});

req.on('error', (error) => console.error('❌ Error:', error.message));
req.write(data);
req.end();