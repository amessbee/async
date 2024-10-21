//client.js
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => { 
    console.log('Connected to WebSocket server');
    ws.send(JSON.stringify({ method: 'fetchUser', userId: 1 })); 
});

ws.on('message', (message) => {
  try {
    console.log('Received from server:', JSON.parse(message));

  } catch (error) {
    console.error('Error parsing message:', error);
  }
});

ws.on('close', () => {
    console.log('Disconnected from the server');
  });