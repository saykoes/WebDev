function outResult(resultContent) {
    document.getElementById("result").textContent = `${resultContent}`;
}

// Task 1: variables
function task1() {
    let name;
    let admin;

    name = "John";
    admin = name;

    outResult(admin);
    alert(admin)
}

// Task 2: addition
function task2() {
    let a = prompt("First num", "10");
    let b = prompt("Second num?", "5");

    let sum = Number(a) + Number(b);

    outResult(sum);
    alert(sum)
}

// Task 3: Even numbers 2-10
function task3() {
    let result = "";
    for (let i = 2; i <= 10; i += 2) {
        result += i + "; ";
    }
    outResult(result);
}

// Task 4: for -> while
function task4() {
    let i = 0;
    let result = "";
    while (i < 3) {
        result += `num ${i}; `;
        i++;
    }
    outResult(result);
}

// Task 5: while loop for input
function task5() {
    let num;
    do {
        num = prompt("num > 100", "");
        if (num === null) {
            document.getElementById("result").textContent = "Input cancelled";
            return;
        }
    }
    while (Number(num) <= 100);

    outResult(`${num}はいいです`);
}

// Task 6: primes 2-n
function task6() {
    let input = prompt("n (prime numbers 2-n):", "10");
    if (input === null) {
        outResult("Input cancelled");
        return;
    }

    const n = Number(input);
    let primes = [];

    for (let i = 2; i <= n; i++) {
        let isPrime = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }

    outResult(primes.join("; "));
}