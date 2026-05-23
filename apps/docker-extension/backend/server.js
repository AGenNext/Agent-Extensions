const http = require('node:http');

const port = Number(process.env.PORT || 3000);

const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'application/json');

  if (request.url === '/health') {
    response.end(JSON.stringify({ ok: true, service: 'agent-docker-extension' }));
    return;
  }

  if (request.url === '/containers') {
    response.end(JSON.stringify({ containers: [], note: 'Docker inspection stub is ready for implementation.' }));
    return;
  }

  response.end(JSON.stringify({ ok: true, message: 'Agent Docker Extension backend running' }));
});

server.listen(port, () => {
  console.log(`Agent Docker Extension backend listening on ${port}`);
});
