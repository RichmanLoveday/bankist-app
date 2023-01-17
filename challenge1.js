'use strict';
// function that accept 2 arrays of dog's ages

const checkDogs = function (dogsJulia, dogsKate) {
    // create a shollow copy of dogsJulia array that removes first and last two array data regarding it origanal

    // console.log(dogsJulia);
    const dogsJuliaNew = dogsJulia.slice(1, -2);
    // console.log(dogsJuliaNew);
    // console.log(dogsJulia);

    // join both array param to single array
    const dogs = [...dogsJuliaNew, ...dogsKate];
    //  console.log(dogs);

    // loop through the new array and display to console
    dogs.forEach(function (dog, i) {
        // condition to check for dog ages
        const dogAges = (dog >= 3) ? 'an adult' : 'still a puppy 🐶';
        // console.log(`Dog number ${i + 1} is ${dogAges}`);

    });

    return dogs;
}

// const juliasData = [3, 5, 2, 12, 7];
// const katesData = [4, 1, 15, 8, 3];

const juliasData = [4, 1, 15, 8, 3];
const katesData = [10, 5, 6, 1, 4];

const dogs = checkDogs(juliasData, katesData);
//console.log(dogs);

// function to calculate average human age
// const calcAverageHumanAge = function (dogsAges) {
//     // loop through dogs and map dogs with condition (dogAge <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4) , and hold store variable in human Age array
//     const humanAgeDogs = dogsAges.map(age => {
//         return age <= 2 ? age * 2 : 16 + (age * 4);
//     });
//     console.log(humanAgeDogs);

//     // filter dogs greater than 18 > humanAges
//     const filteredDogs = humanAgeDogs.filter(age => {
//         return age > 18 && age;
//     });
//     console.log(filteredDogs);
//     // Loop to get sum of average of human age(adults)
//     const sumOfDogs = filteredDogs.reduce((acc, age) => {
//         return acc + age;
//     }, 0);
//     console.log(sumOfDogs);
//     return `Average of human ages of dogs is ${Math.trunc(sumOfDogs / filteredDogs.length)}`;

// }

const calcAverageHumanAge = dogAges =>
    dogAges
        .map(age => age <= 2 ? age * 2 : 16 + (age * 4))
        .filter(age => age > 18 && age)
        .reduce((acc, age, i, arr) => Math.trunc(acc + (age / arr.length)), 0);


console.log(calcAverageHumanAge(dogs));
console.log('------- NEXT AVERAGE ------------');
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log('------- NEXT AVERAGE ------------');
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));










// Test func
