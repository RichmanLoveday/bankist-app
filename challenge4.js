'use strict';

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];


const eatingAmt = (dogs, owner) => {
    let sarahDog;
    dogs.forEach(function (dog) {
        if (dog.owners.includes(owner)) {
            sarahDog = dog.curFood > dog.recommendedFood ? `${owner} dog is eating much` : `${owner} dog is eating less`;
        }
    })
    return sarahDog;
}


const eatingLevel = (eatLevel, str) => {
    let data = '';
    eatLevel.forEach(function (owners, i) {
        // Condition to fix strings properly
        if (i === 0) {
            data += `"${owners} and `;
        } else if (i === eatLevel.length - 1) {
            data += `${owners}'s ${str} `;
        } else {
            data += `${owners} and `;
        }
    });
    return data;
}

// Dogs eating okay
const checkEatingOkay = dog => {
    return dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10) && dog;
}

// Loop over dogs array of objects
const dogStudies = (dogs) => {
    dogs.forEach(
        dog => dog.recommendedFood = Math.trunc((dog.weight ** 0.75) * 28)
    );

    console.log('------ Added recommended property --------');
    console.log(dogs);

    console.log('----- Sarah dog ---------')
    console.log(eatingAmt(dogs, 'Sarah'));    // find owners dog eating too much or less

    // Owners whose dogs eat much
    const ownerEatToomuch = dogs
        .filter(dog => dog.curFood > dog.recommendedFood)
        .map(dog => dog.owners)
        .flat(1);

    // Owners whose dog eat less
    const ownersEatTooLittle = dogs
        .filter(dog => dog.curFood < dog.recommendedFood)
        .map(dog => dog.owners)
        .flat(1);


    // string of owners dog that eat much or little
    let data = eatingLevel(ownerEatToomuch, 'dogs eat too much!" and') + eatingLevel(ownersEatTooLittle, 'dogs eat too little!"');
    console.log('-------- String dogs eating less or much ----------');
    console.log(data);

    // dog eating exacty amount of food recommended
    console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

    // dog eating okay amount of food at range 10% above/below current > (recommended * 0.90) && current < (recommended * 1.10)
    console.log(dogs.some(
        dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)
    ));

    // Dogs eating okay amount of foods
    console.log('-------- Dogs that are okay ---------');
    console.log(dogs.filter(checkEatingOkay));


    // console.log(ownerEatToomuch);
    // console.log(ownersEatTooLittle)

    const newDogs = [...dogs]
        .sort((a, b) => a.recommendedFood - b.recommendedFood);
    console.log(dogs);
    console.log(newDogs);


}
dogStudies(dogs);






