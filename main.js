import { HashMap } from "./hashMap.js";

const test = new HashMap();



 test.set('apple', 'red');
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')


 console.log(test.entries());

 test.set('apple', 'green');

 console.log(test.entries());

 test.set('moon', 'silver');

 console.log(test.entries());
 console.log('Capacity: ' + test.capacity);

 console.log('Get: ' + test.get('grape'));
 console.log('Has: ' + test.has('kite'));
 console.log(test.remove('carrot'));
 console.log('Length: ' + test.length());
 console.log(test.keys());
 console.log(test.values());