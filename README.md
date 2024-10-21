# Async

## Distributed Programming in JavaScript with Eventual Send

JavaScript's role in distributed systems is growing, with Remote Procedure Calls (RPC) being a key requirement for communication between machines. This project explores foundational examples of remote async procedure calls, starting with simple data transfer via WebSocket, and progressing to advanced topics like remote object references (Presences) and remote method calls using Eventual Send (E()) and CapTP for improved efficiency and security.

## Examples

### [Example 1: Passing Simple Data via WebSocket](./de1/)

A basic example demonstrates sending a number from a client to a server over WebSocket, where the server squares the number and returns the result. This showcases efficient bi-directional communication with minimal network bandwidth.

### [Example 2: Extending to Pass Objects](./de2/)

The next step is passing more complex data, such as objects (e.g., user profiles). The server can process or modify these objects before sending them back. However, this may require tools like the Endo Marshal library for more advanced serialization.

### Example 3 and 4: Remote Method Calls with [RPC](./de4/) and [WebSocket](./de3/)

Moving from data transfer to invoking methods on the server, asynchronous operations become more challenging. One approach is to wait for the result (`await`), which may block the client. Another is to return a promise, but it complicates communication since the client cannot await the server's promise without extra mechanisms.

### [Example 5: Eventual Send (E()) and CapTP](./de5/)

Eventual Send (`E()`) and `CapTP` offer a solution. These tools allow clients to hold references to remote objects (Presences) and invoke synchronous or asynchronous methods as if they were local. Promises can be pipelined, reducing round-trips and bandwidth usage, while object references enhance security and simplify distributed programming.

### [Example 6: Pipelining with Eventual Send](./de6/)

This example shows how to pipeline remote calls using `E()`.

## Benefits of Eventual Send

- **Non-blocking Communication**: Remote objects can be interacted with asynchronously without blocking the client.
- **Improved Efficiency**: Pipelining allows for handling multiple remote operations concurrently, saving bandwidth.
- **Simplified Code**: Complex error handling is reduced, as remote object interactions feel native to JavaScript.


## Installation

To install the necessary dependencies, run:

```bash
yarn install
```

## Usage

To start the server, for example in distributed example 5, run:

```bash
node de5/server.js
```

To start the cline, run:

```bash
node de5/client.js
```

## Contribution Guidelines

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Endo Marshal Library](https://github.com/endojs/endo)
- [CapTP](https://github.com/endojs/captp)


