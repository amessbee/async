import "@endo/init";
import { makeCapTP, Far } from "@endo/captp";
import { WebSocketServer } from "ws";

const fetchUserData = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
      });
    }, 2000); // Simulating a 2-second delay
  });
};

// Create CapTP remotable bootstarp object
const bootStrap = Far("fetchUserData", {
  fetchUserData,
});

// Create a WebSocket Server and a connection handler
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (wss) => {
  console.log("Client connected");

  // Setup CapTP on the server side
  const { dispatch } = makeCapTP(
    "server",
    (obj) => wss.send(JSON.stringify(obj)),
    bootStrap,
  );

  // Listen to messages from the client and dispatch to CapTP
  wss.on("message", (data) => {
    dispatch(JSON.parse(data));
  });
  wss.on("close", () => {
    console.log("Client disconnected");
  });
  wss.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});
