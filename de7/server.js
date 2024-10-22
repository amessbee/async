// import "@endo/init";
import '@agoric/swingset-liveslots/tools/prepare-test-env.js';
import { makeCapTP } from "@endo/captp";
import { makeHeapZone } from "@agoric/zone/heap.js";
import { makeExo } from "@endo/exo";
import { WebSocketServer } from "ws";
import { makeScalarMapStore } from "@agoric/store";


const myBaggage = makeScalarMapStore("my baggage");
// const zone = makeDurableZone(myBaggage);
const zone = makeHeapZone(myBaggage);

const makeValidatedUsers = () => {
  let users = [];
  return makeExo("validatedUsers", undefined, {
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
const bootStrap = zone.exo('makeValidatedUsers', undefined, {
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
