'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,


    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2022-11-23T14:43:26.374Z',
        '2022-11-24T18:49:59.371Z',
        '2022-11-26T12:01:20.894Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const errLogin = document.querySelector('.errLogin');
const errTrans = document.querySelector('.errTrans');
const errLoan = document.querySelector('.errLoan');
const errCloseAcct = document.querySelector('.errCloseAcct');


//////////////////////////////////
// FUNCTIONS

const formatMovementDate = function (date, locale) {

    // functioon to calculate days passed
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);

    // Get date from object
    // For current date and time when logged in 
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        // weekday: 'numeric'
    };
    const displayDate = new Intl.DateTimeFormat(locale, options).format(date);

    // const newDate = new Date(date);
    // const displayDate = `${`${newDate.getDate()}`.padStart(2, 0)}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) {
        return `${daysPassed} days ago`;
    } else {
        return displayDate;
    }
    // console.log(displayDate);
}


// Function to format currency based on user account
const currencyFormatter = (value, locale, currency) => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
}

// For logout timer
const startLogOutTimer = function () {
    const tick = () => {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        // In each call, print the remaining time to UI
        labelTimer.textContent = `${min}:${sec}`;
        // When 0 seconds stop timer and log out user
        if (time === 0) {
            clearInterval(timer)
            labelWelcome.textContent = 'Log in to get started';
            containerApp.style.opacity = 0;
        }
        time--;
    }
    // set time to 5 mins
    let time = 120;
    tick();     // Call time every second
    const timer = setInterval(tick, 1000);
    return timer;
}

// Reset timmer function
const resetTimer = () => {
    clearInterval(timer);
    timer = startLogOutTimer();
}

const displayMovements = function (acc, sort = false) {
    console.log(acc.movements);
    containerMovements.innerHTML = '';

    // get a copy of movement and sort the array
    // console.log(acc.movements);
    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
    const movDates = sort ? acc.movementsDates.slice().reverse() : acc.movementsDates;
    // console.log(movDates); 

    // display movement
    movs.forEach(function (mov, i) {
        // console.log(typeof mov);
        const type = (mov > 0) ? 'deposit' : 'withdrawal';

        // format date
        const displayDate = formatMovementDate(new Date(movDates[i]), acc.locale);
        const formattedMov = currencyFormatter(mov, acc.locale, acc.currency);

        // console.log(type);
        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__date">${displayDate}</div>
                <div class="movements__value">${formattedMov}</div>
            </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};


const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLocaleLowerCase().split(' ').map(name => name.slice(0, 1)).join('');
        // console.log(acc.username);
    });
};
createUsername(accounts);
// console.log(accounts);

// console.log(createUsername());
// console.log();

// display balance value to the screen
const calDisplayBalance = function (acc) {
    const balance = acc.movements.reduce(function (initialBal, currentBal) {
        return initialBal + currentBal;
    }, 0);
    acc.balance = balance;      // store balance in account object

    // display to screen
    const balanceValue = currencyFormatter(acc.balance, acc.locale, acc.currency);
    labelBalance.textContent = `${balanceValue}`;
};

const updateUI = function (acc) {
    displayMovements(acc);    // Display movements
    calDisplayBalance(acc);      // Display balance
    calcDisplaySummary(acc);          // Display summary
}


// Display summary input and outputs
const calcDisplaySummary = function (acc) {
    // incomes
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);

    // Outgoing money 
    const outputs = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);

    console.log(outputs);
    console.log(incomes);



    // calc interest
    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter(int => int > 1)
        .reduce((acc, int) => acc + int, 0);


    // Display to dom
    labelSumOut.textContent = currencyFormatter(Math.abs(outputs), acc.locale, acc.currency);
    labelSumIn.textContent = currencyFormatter(incomes, acc.locale, acc.currency);
    labelSumInterest.textContent = currencyFormatter(interest, acc.locale, acc.currency);

    // console.log(outputs);
    // console.log(incomes);
    // console.log(interest);

}

const firstWithdrawal = account1.movements.find(mov => mov < 0);
// console.log(firstWithdrawal);


// Add EventHandles to the login button
let currentAccount, timer;

// Fake login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Creating current date
inputTransferTo.value = inputClosePin.value = inputCloseUsername.value = inputLoanAmount.value = inputTransferAmount.value = '';

btnLogin.addEventListener('click', function (event) {
    // Prevent element default events 
    event.preventDefault();

    // checking for username in account object
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    //console.log(currentAccount);

    // checking pin logins
    // console.log(typeof inputLoginPin.value);
    // console.log(inputLoginPin);
    if (currentAccount?.pin === +inputLoginPin.value) {
        // clear input fields
        inputLoginUsername.value = '';
        inputLoginPin.value = '';
        inputLoginPin.blur();

        // Display ui and welcome message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

        // Display movements
        containerApp.style.opacity = 100;
        updateUI(currentAccount);

        console.log('LOGIN');


        // For current date and time when logged in 
        const date = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            // weekday: 'numeric'
        };
        // const locale = navigator.language;
        // console.log(locale);
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(date);

        // Start countdown
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();
        // console.log(timer);


        // remorve 
        errLogin.classList.remove('invalid_detail');
        errLogin.textContent = '';
    } else {
        // Display error message
        errLogin.classList.add('invalid_detail');
        errLogin.textContent = 'Username/password is incorrect';
    }

    // // Current Date and time
    // const now = new Date();
    // labelDate.textContent = `${`${now.getDate()}`.padStart(2, '0')}/${`${now.getMonth() + 1}`.padStart(2, '0')}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`;

    inputTransferTo.value = inputClosePin.value = inputCloseUsername.value = inputLoanAmount.value = inputTransferAmount.value = '';
});


// Transfer money
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = +inputTransferAmount.value;
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    console.log(amount, receiverAcc);
    // check if balance is greater than amount 
    if (amount >= 1 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        console.log('Transfered valid');

        // update current balance and Add current date of transfer to movementDates
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        console.log(receiverAcc.movements);
        updateUI(currentAccount);       // update UI

        inputTransferTo.value = inputTransferAmount.value = '';

        // success message
        errTrans.style.opacity = 1;
        errTrans.style.color = 'green';
        errTrans.textContent = 'Transfered successfully';
        setTimeout(() => {
            errTrans.style.opacity = 0;
        }, 3000);

    } else {
        //console.log('Error in transmission please confirm inputs');
        errTrans.classList.add('invalid_detail');
        errTrans.style.opacity = 1;
        errTrans.style.color = 'red';
        errTrans.textContent = 'Error in transmission please confirm inputs';
        setTimeout(() => {
            errTrans.style.opacity = 0;
        }, 3000);
    }

    // Reset timer
    resetTimer();
});


// Close account event handler
btnClose.addEventListener('click', function (event) {
    event.preventDefault();

    // validate confirm pin and user
    // console.log(inputCloseUsername.value);
    // console.log(typeof inputClosePin.value);

    // console.log(currentAccount.username);
    // console.log(currentAccount.pin);
    if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
        console.log('Account deleted');
        const curAccIndex = accounts.findIndex(acc => acc === currentAccount);       // loop through accounts to to findIndex of current account
        accounts.splice(curAccIndex, 1);    // remove account from accounts array
        // hide ui
        containerApp.style.opacity = 0;
        labelWelcome.textContent = 'Log in to get started';

    } else {
        console.log('Login details is incorrect');
    }
    inputClosePin.value = inputCloseUsername.value = '';
});


// Requesting for a load
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        setTimeout(() => {
            currentAccount.movementsDates.push(new Date().toISOString());       // Add loan date
            currentAccount.movements.push(amount);         // Amount to the movements
            updateUI(currentAccount);       // Update UI
        }, 2500);
        inputLoanAmount.value = '';
    } else {
        // Display error message
        errLoan.classList.add('invalid_detail');
        errLoan.style.opacity = 1;
        errLoan.textContent = 'Unable to grant loan';
        setTimeout(() => {
            errLoan.style.opacity = 0;
        }, 3000);
    }
    // Reset timer
    resetTimer();
});


// Getting total movements in all accounts objects with flat
const overalBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// with flat map
const overalBalance2 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);


// sort datas
let sort = true;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, sort);          // class movement function
    sort = !sort;
});

// texting with array.from
labelBalance.addEventListener('click', function () {
    const movs = Array.from(
        document.querySelectorAll('.movements__value'), (curr) => Number(curr.textContent.replace('€', ''))
    );
    console.log(movs);
})


