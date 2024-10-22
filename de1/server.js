// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", function message(data) {
    console.log("Server received: %s", data);

    // Simple distributed calculation example: square the number
    const number = parseInt(data);
    const result = number * number;

    ws.send(`Result: ${result}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
