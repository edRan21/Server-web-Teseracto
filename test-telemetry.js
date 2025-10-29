// test-telemetry.js - VERSIÓN CORREGIDA
const http = require('http');

const payload = {
    "rfc": "TES123456789",
    "nsm": "M2000-TEST-001", 
    "nsue": "UTR-001",
    "timestamp": new Date().toISOString(),
    "flow_instant": 0.150,
    "flow_accumulated": 45.250,
    "flow_velocity": 0.5,
    "flow_direction": 1,
    "ker_code": "0",
    "latitude": 19.432608,
    "longitude": -99.133209,
    "unit_measurement": "m³/h"
    };

    const data = JSON.stringify(payload);

    const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/api/telemetry',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'teseracto_key_utrs_2025',
        'Content-Length': Buffer.byteLength(data)
    }
    };

    console.log('Enviando datos...');
    console.log('URL:', options.hostname + ':' + options.port + options.path);
    console.log('Datos:', data);

    const req = http.request(options, (res) => {
    console.log(`✅ Status: ${res.statusCode}`);
    
    let response = '';
    res.on('data', (chunk) => {
        response += chunk;
    });
    
    res.on('end', () => {
        console.log('📨 Response:', response);
    });
    });

    req.on('error', (error) => {
    console.error('❌ Error:', error.message);
});

req.write(data);
req.end();