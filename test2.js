import '@endo/init';
import { E, Far } from '@endo/far';

console.log('======================');
console.log('Hello from test2.js');
console.log('======================');

// Create a remote object presence
const remotePresence = Far('RemoteService', {
    sayHello: () => {
      return 'Hello from the other side';
    },
    sayCustomGreetings: (name) => {
      return `Hello ${name} from the other side`;
    },

  });

E(remotePresence).sayHello()
.then(result => {
  console.log(result); // Expected output: 'Hello from the other side'
} );

E(remotePresence).sayCustomGreetings('devs')
.then(result => {
  console.log(result); // Expected output: 'Hello from the other side'
} );
