import "@endo/init";
import { makeCapTP, Far } from "@endo/captp";
import { WebSocketServer } from "ws";

const makeValidatedUsers = () => {
  let users = [];
  return Far("validatedUsers", {
    addUser(userID) {
      if (typeof userID === "string" && !users.includes(userID)) {
        users.push(userID);
      }
      return users.length;
    },
    getUsers() {
      return users;
    },
  });
};

// Create CapTP remotable bootstarp object
const bootStrap = Far("makeValidatedUsers", {
  makeValidatedUsers,
});

// Create a WebSocket Server and a connection handler
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (wss) => {
  console.log("Client connected");

  // Setup CapTP on the server side and dispatch messages to CapTP
  const { dispatch } = makeCapTP(
    "serverCapTP",
    (obj) => wss.send(JSON.stringify(obj)),
    bootStrap,
  );
  wss.on("message", (data) => {
    dispatch(JSON.parse(data));
  });
  wss.on("close", () => {
    console.log("Client disconnected");
  });
});
