'use strict';
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice());


// Splice method -> it is muttable
// console.log(arr.splice(2));
console.log(arr.splice(-1));
arr.splice(1, 2);
console.log(arr);

// Reverse method -> it is muttable
arr = ['a', 'b', 'c', 'd', 'c'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT method
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));



// Looping through an array
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries(movements)) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You widthdraw ${Math.abs(movement)}`);
  }
}

console.log('------- FOREACH ---------');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1} You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1} You widthdraw ${Math.abs(mov)}`);
  }
});



const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

// using map to loop through movements
const movementDescriptions = movements.map(
  (mov, i) => {
    return `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'widthdraw'} ${Math.abs(mov)}`;
  });
console.log(movementDescriptions);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Creating an array of deposits
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const widthdraws = movements.filter(mov => mov < 0);
console.log(widthdraws);

const balance = movements.reduce(function (acc, cur, i) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);


// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  }
  return mov;
}, movements[0]);
console.log(max);



const eurToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  }).reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);


// const account = accounts.find(acc => acc.owner === 'Jonas Schmedtmann');
// console.log(account);


// using for..of loop
// let account5 = '';
// for (const account of accounts) {
//     if (account.owner === 'Steven Thomas Williams') {
//         account5 = account;
//         break;
//     }
// }

// console.log(account5);
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovement = accounts.map(acc => acc / acc.movements);
// console.log(accountMovement);

// Sorting an array methods
const movement = [200, 450, -400, 3000, -650, -130, 70, 1300];
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

owners.sort();
console.log(owners);
console.log(movement);
// numbers
// return < 0 A, B (keep order)
// return > 0 B, A (switch order)

// Acending order
// movement.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

movement.sort((a, b) => a - b);
console.log(movement);

// Decending order
// movement.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

movement.sort((a, b) => b - a);
console.log(movement);



// Defining array programatically
const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));

x.fill(1, 3, 5);
console.log(x);


arr.fill(23, 2, 6);
console.log(arr);

const names = {
  length: 7,
}
// Array.from
const y = Array.from(names, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const diceRolls = Array.from({ length: 100 }, () => Math.trunc(1 + Math.random() * 101));
console.log(diceRolls);




// NUMBERS IN JAVASCRIPT
console.log(23 === 23.0);

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));

console.log(Number.parseFloat('2.5rem'));
console.log(Number.parseFloat('2.5rem'));


// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// Checking if value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));


console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));



console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));


console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2))

// constant on math object
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

// Function to get random integers
const randomInt = (min, max) => Math.floor((Math.random() * (max - min) + 1) + min);
console.log(randomInt(10, 20));


// Rounding integers
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.9));


console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));


console.log(Math.floor(23.3));
console.log(Math.floor('23.9'));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));


// Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));



// Creating a date
const now = new Date();
console.log(now)

console.log(new Date('Nov 21 2022 13:30:21'));
console.log(new Date('December 24, 2015'))

console.log(new Date(2037, 18, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));


console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));



const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());


console.log(new Date(2142253380000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) => Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));
const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1);


// internationalizing numbers
const num = 3884764.23;
const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  //unit: 'mile-per-hour',
};
 
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('GERMANY:      ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('BROWSER: ', new Intl.NumberFormat(navigator.language, options).format(num));

*/

// Timmers in javascript
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients);

console.log('Waiting....');
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);


// Setinterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);