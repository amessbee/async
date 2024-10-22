import "@endo/init";
import { makeCapTP, E } from "@endo/captp";
import WebSocket from "ws";

// Create a WebSocket connection and Setup CapTP on the client side
const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => {
  console.log("WebSocket connection opened");

  const { dispatch, getBootstrap } = makeCapTP("client", (obj) =>
    ws.send(JSON.stringify(obj)),
  );
  // Listen for WebSocket messages and dispatch to CapTP
  ws.on("message", (data) => {
    dispatch(JSON.parse(data));
  });

  // Get remote object and call its method
  const bootStrap = getBootstrap();

  E(bootStrap)
    .fetchUserData(1)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

ws.onclose = () => {
  console.log("WebSocket connection closed");
};

ws.onerror = (err) => {
  console.error("WebSocket error:", err);
};
