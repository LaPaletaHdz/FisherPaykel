// Script básico para validar que el backend responde
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3306, // Puerto de base de datos configurado [cite: 51, 76]
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`ST01 - Estado del Backend: ${res.statusCode}`);
  if (res.statusCode === 200) process.exit(0);
  else process.exit(1);
});

req.on('error', (e) => {
  console.error(`Error en Prueba de Humo: ${e.message}`);
  process.exit(1);
});
req.end();
