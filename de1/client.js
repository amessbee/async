// client.js
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to the server');

  // Send a number to the server for distributed computation
  const number = 5;
  console.log('Client Sending:', number);
  ws.send(number.toString());
});

ws.on('message', (message) => {
  console.log('Client Received from server: %s', message);
  ws.close();
});

ws.on('close', () => {
  console.log('Disconnected from the server');
});
