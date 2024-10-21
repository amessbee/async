// Client-side code ( e.g. JavaScript in browser)
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to WebSocket server');

  // Send a JavaScript object to the server
  const message = { type: 'greeting', content: 'Hello, WebSocket!' };
  ws.send(JSON.stringify(message));
});

ws.on('message', (message) => {
  try {
    const data = JSON.parse(message);
    console.log('Received from server:', data);
  } catch (error) {
    console.error('Error parsing message:', error);
  }
});

ws.on('close', () => {
    console.log('Disconnected from the server');
  });
  