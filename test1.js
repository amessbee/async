import '@endo/init';
import { E, Far } from '@endo/far';

console.log('======================');
console.log('Hello from test1.js');
console.log('======================');

// Create an async function
const sayHello = async () => {
      return 'Hello World';
}

sayHello()
.then(result => {
  console.log(result); // Expected output: 'Hello World'
} );

