import jayson from "jayson";

// Create a client to connect to the RPC server
const client = jayson.client.http("http://localhost:8080");

// Call the remote method 'fetchUser'
client.request("fetchUser", [1], (err, error, response) => {
  if (err) throw err;
  console.log("Received from server:", response);
});
