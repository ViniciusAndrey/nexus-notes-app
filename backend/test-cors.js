// Script para testar a configuração CORS
const fetch = require('node-fetch');

const testCors = async () => {
  const backendUrl = 'https://nexus-notes-app-backend.onrender.com';
  const frontendOrigin = 'https://nexus-notes-app-frontend.onrender.com';
  
  console.log('🧪 Testando configuração CORS...');
  console.log('📍 Backend URL:', backendUrl);
  console.log('🌐 Frontend Origin:', frontendOrigin);
  
  try {
    // Teste 1: Health check
    console.log('\n1️⃣ Testando health check...');
    const healthResponse = await fetch(`${backendUrl}/health`);
    console.log('Status:', healthResponse.status);
    console.log('Headers:', Object.fromEntries(healthResponse.headers.entries()));
    
    // Teste 2: Preflight OPTIONS
    console.log('\n2️⃣ Testando preflight OPTIONS...');
    const optionsResponse = await fetch(`${backendUrl}/users/login`, {
      method: 'OPTIONS',
      headers: {
        'Origin': frontendOrigin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    });
    console.log('Status:', optionsResponse.status);
    console.log('CORS Headers:', {
      'Access-Control-Allow-Origin': optionsResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': optionsResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': optionsResponse.headers.get('Access-Control-Allow-Headers'),
      'Access-Control-Allow-Credentials': optionsResponse.headers.get('Access-Control-Allow-Credentials')
    });
    
    // Teste 3: POST request
    console.log('\n3️⃣ Testando POST request...');
    const postResponse = await fetch(`${backendUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Origin': frontendOrigin,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: '123456'
      })
    });
    console.log('Status:', postResponse.status);
    console.log('CORS Headers:', {
      'Access-Control-Allow-Origin': postResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': postResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': postResponse.headers.get('Access-Control-Allow-Headers'),
      'Access-Control-Allow-Credentials': postResponse.headers.get('Access-Control-Allow-Credentials')
    });
    
    console.log('\n✅ Teste concluído!');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
};

testCors(); 