//server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Simulated async database query
async function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
      });
    }, 2000); // Simulating a 2-second delay
  });
}

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);
      console.log("Received:", data);

      if (data.method === "fetchUser") {
        const userData = await fetchUserData(data.userId);
        ws.send(JSON.stringify({ type: "userData", data: userData }));
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
