// import "@endo/init";
import '@agoric/swingset-liveslots/tools/prepare-test-env.js';
import { nextLife } from '@agoric/swingset-liveslots/tools/prepare-strict-test-env.js';
import { M } from '@endo/patterns';
import { makeCapTP } from "@endo/captp";
import { makeDurableZone } from "@agoric/zone/durable.js";
import { makeExo } from "@endo/exo";
import { WebSocketServer } from "ws";
import { reincarnate } from '@agoric/swingset-liveslots/tools/setup-vat-data.js';

let incarnation = reincarnate();

export const getBaggage = () => {
  return incarnation.fakeVomKit.cm.provideBaggage();
};

const myBaggage = getBaggage();
let zone;
let users;
let count = 0;

const makeValidatedUsers = () => {
  
  return makeExo('validatedUsers', undefined, 
    {
    addUser(userID) {
      if (typeof userID === "string" ) {
        users.init(count, userID);
        count += 1;
      }
      return count;
    },
    getUsers() {
      const _users = [];
      for (let i = 0; i < count; i++) {
        if (users.has(i)) {
          _users.push(users.get(i));
        }
      }
      return _users;
    },
  }
);
};

// Create a WebSocket Server and a connection handler
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (wss) => {
  console.log("Client connected");

  nextLife();
  incarnation = reincarnate();

  zone = makeDurableZone( myBaggage, 'durableRoot');
  
  users = zone.weakMapStore('users', {
    keyShape: M.number(),
    valueShape: M.string(), 
  });
  // Create CapTP remotable bootstarp object
  const bootStrap = makeExo('makeValidatedUsers', undefined, {
    makeValidatedUsers
  });
  
  // Setup CapTP on the server side and dispatch messages to CapTP
  let { dispatch } = makeCapTP(
    "serverCapTP",
    (obj) => wss.send(JSON.stringify(obj)),
    bootStrap,
  );
 
  wss.on("message", (data) => {
    dispatch(JSON.parse(data));
  });
  wss.on("close", () => {
    users = undefined;
    console.log("Client disconnected");
  });
});
