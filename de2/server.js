// Server-side code (Node.js with 'ws' library)
import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);

      // Echo the received object back to the client
      const response = { echo: data, timestamp: new Date().toISOString() };
      ws.send(JSON.stringify(response));
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
