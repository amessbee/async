import "@endo/init";
import { makeCapTP, E } from "@endo/captp";
import WebSocket from "ws";

// Create a WebSocket connection and Setup CapTP on the client side
const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => {
  console.log("WebSocket connection opened");

  const { dispatch, getBootstrap } = makeCapTP("clientCapTP", (obj) =>
    ws.send(JSON.stringify(obj)),
  );
  // Listen for WebSocket messages and dispatch to CapTP
  ws.on("message", (data) => {
    dispatch(JSON.parse(data));
  });

  // Get remote object and call its method
  const bootStrap = getBootstrap();
  let usersList = [];

  E(bootStrap)
    .makeValidatedUsers()
    .then((_usersList) => {
      usersList = _usersList;
      E(usersList).addUser("Alice");
      E(usersList).addUser("Bob");
      return E(usersList).addUser("Carol");
    })
    .then(async (count) => {
      console.log("User count:", count);
      console.log(await E(usersList).getUsers());
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
