function outResult(resultContent) {
    document.getElementById("result").textContent = `${resultContent}`;
}

// Reverse string 123 -> 321.
function task1() {
    let input = prompt("Num:", "123");

    let result = "";
    for (let i = input.length - 1; i >= 0; i--) {
        result += input[i];
    }

    outResult(result);
}

// No repeats 111333456 -> 13456.
function task2() {
    let input = prompt("Num:", "111333456");

    let result = "";
    for (let i = 0; i < input.length; i++) {
        let currentDigit = input[i];
        let isAlreadyAdded = false;
        for (let j = 0; j < result.length; j++) {
            if (result[j] === currentDigit) {
                isAlreadyAdded = true;
                break;
            }
        }
        if (!isAlreadyAdded) {
            result += currentDigit;
        }
    }

    outResult(result);
}

// Amount of digits in number (67555567, 5) -> 4.
function task3() {
    let number = prompt("Num:", "67555567");
    let digit = prompt("Digit:", "5");

    let count = 0;
    for (let i = 0; i < number.length; i++) {
        if (number[i] === digit[0]) {
            count++;
        }
    }

    outResult(count);
}

// Count the longest sequence of repeating 0s or 1s in binary form of the number
// 127 -> 7 (0b1111111)
function task4() {
    let bin = Number(prompt("Num:", "127")).toString(2);

    let maxQueque = 1;
    let currentQueque = 1;

    for (let i = 1; i < bin.length; i++) {
        if (bin[i] === bin[i - 1]) {
            currentQueque++;
        }
        else {
            if (currentQueque > maxQueque) {
                maxQueque = currentQueque;
            }
            currentQueque = 1;
        }
    }
    if (currentQueque > maxQueque) {
        maxQueque = currentQueque;
    }

    outResult(maxQueque);
}

// Find first non-repeaing char in str: 'qwebqweqwe' -> 'b'.
function task5() {
    let str = prompt("String:", "qwebqweqwe");

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let count = 0;
        for (let j = 0; j < str.length; j++) {
            if (str[j] === char) {
                count++;
            }
        }
        if (count === 1) {
            outResult(char);
            return;
        }
    }
    
    outResult("No");
}

// Generate random string of letters and numbers (fixed length)
function task6() {
    length = Number(prompt("Length:", "4"));

    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * chars.length);
        result += chars[index];
    }

    document.getElementById("result").textContent = result;
}

// Return only unique chars in str: 'qwebqweqwe' -> 'qweb'.
function task7() {
    let str = prompt("String:", "qwebqweqwe");

    let result = "";
    let seen = {};

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (!seen[char]) {
            result += char;
            seen[char] = true;
        }
    }

    document.getElementById("result").textContent = result;
}