// test-report-batch.js
const http = require('http');

// Simulación de envío en lote después de falla de conexión
const payloads = [
    {
        "rfc": "TES123456789",
        "nsm": "M2000-TEST-001",
        "nsue": "UTR-001",
        "report_type": "medidor", 
        "file_name": "TES123456789_20241025_M2000-TEST-001_UTR-001.txt",
        "content": "MEDICIONES_DIARIAS_25\nFlujo: 148 L/s\nVolumen: 44500 m³"
    },
    {
        "rfc": "TES123456789", 
        "nsm": "M2000-TEST-001",
        "nsue": "UTR-001",
        "report_type": "medidor",
        "file_name": "TES123456789_20241026_M2000-TEST-001_UTR-001.txt", 
        "content": "MEDICIONES_DIARIAS_26\nFlujo: 152 L/s\nVolumen: 45500 m³"
    },
    {
        "rfc": "TES123456789",
        "nsue": "UTR-001",
        "report_type": "sistema_medicion",
        "file_name": "TES123456789_20241027_UTR-001.txt",
        "content": "SISTEMA_MEDICION\nEstado: Normal\nAlertas: 0"
    }
];

    const data = JSON.stringify(payloads);

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

    console.log(`📤 Enviando lote de ${payloads.length} reportes...`);

    const req = http.request(options, (res) => {
        console.log(`✅ Status: ${res.statusCode}`);
    
    let response = '';
        res.on('data', (chunk) => response += chunk);
        res.on('end', () => console.log('📨 Response:', response));
});

req.on('error', (error) => console.error('❌ Error:', error.message));
req.write(data);
req.end();