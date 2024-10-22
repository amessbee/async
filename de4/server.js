import jayson from "jayson";

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

// Create an RPC server
const server = new jayson.Server({
  // RPC method 'fetchUser'
  fetchUser: async function ([userId], callback) {
    try {
      const userData = await fetchUserData(userId);
      callback(null, userData); // Return user data to the client
    } catch (error) {
      callback(error);
    }
  },
});

// Start the RPC server on port 8080
server.http().listen(8080, () => {
  console.log("RPC server is running on http://localhost:8080");
});
