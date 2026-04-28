function outResult(resultContent) {
    document.getElementById("result").textContent = `${resultContent}`;
}

// Biggest diff in array
function task1_1() {
    const input = prompt("Input array", "1,2,3,4,5");
    const arr = input.split(",").map(x => parseFloat(x.trim())).filter(x => !isNaN(x));

    if (arr.length < 2) {
        outResult("The array is too small");
        return;
    }

    let max = arr[0];
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }
    const maxDiff = max - min;

    outResult(maxDiff);
}

// Unique elements only array
function task1_2() {
    const input = prompt("Array", "1,1,2,2,3,3,5,6");
    const arr = input.split(",").map(x => x.trim());
    const unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {  // indexOf returns -1 if element is not present
            unique.push(arr[i]);
        }
    }
    outResult(`[${unique.join(", ")}]`);
}

// Return objects where isDone: true.
function task1_3() {
    const data = [
        { id: 1, isDone: true },
        { id: 2, isDone: false },
        { id: 3, isDone: true }
    ];

    const filtered = data.filter(item => item.isDone);

    const ids = [];
    for (let i = 0; i < filtered.length; i++)
        ids.push(filtered[i].id);

    outResult(`[${ids.join(", ")}]`);
}


// Return elements greater than 'num'
function task2_1() {
    const input = prompt("Array", "1,2,3,4,5,6,7,8,9,10");
    const num = parseFloat(prompt("Min num", "3"));

    const arr = input.split(",").map(x => parseFloat(x.trim())).filter(x => !isNaN(x));

    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > num)
            result.push(arr[i]);
    }

    outResult(`Greater than ${num} [${result.join(", ")}]`)
}

// normalize mulit-dimentional array
function flatten(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (Array.isArray(item)) {
            let subFlat = flatten(item);
            for (let j = 0; j < subFlat.length; j++)
                result.push(subFlat[j]);
        }
        else result.push(item);
    }
    return result;
}

function task2_2() {
    const input = prompt("Multi-dimentional array", "[1,4,[34,1,20],[6,[6,12,8],6]]");
    try {
        const arr = JSON.parse(input.replace(/'/g, '"'));  // input.replace replaces ' -> "
        const flat = flatten(arr);
        outResult(`[${flat.join(", ")}]`);
    } catch (e) {
        outResult("Error wrong input");
    }
}

// Count pairs that will result 0 if added together (pairs can't be repeated)
function task3_1() {
    const input = prompt("Array", "-7,12,4,6,-4,-12,0");
    const arr = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));

    let count = 0;
    let flag = []; // no repeatings

    for (let i = 0; i < arr.length; i++) {
        if (flag[i]) continue; // no repeatings
        for (let j = i + 1; j < arr.length; j++) {
            if (flag[j]) continue; // no repeatings
            if (arr[i] + arr[j] === 0) {
                count++;
                flag[i] = true; // no repeatings
                flag[j] = true; // no repeatings
                break;
            }
        }
    }
    outResult(`${count}`);
}

// same, but not pairs, trios!
function task3_2() {
    const input = prompt("Array", "-1,2,-1,4,7,-4,1,-2");
    const arr = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));

    let count = 0;
    let flag = []; // no repeatings

    for (let i = 0; i < arr.length; i++) {
        if (flag[i]) continue; // no repeatings
        for (let j = i + 1; j < arr.length; j++) {
            if (flag[j]) continue; // no repeatings
            for (let k = j + 1; k < arr.length; k++) {
                if (flag[k]) continue; // no repeatings
                if (arr[i] + arr[j] + arr[k] === 0) {
                    count++;
                    flag[i] = true; // no repeatings
                    flag[j] = true; // no repeatings
                    flag[k] = true; // no repeatings
                }
            }
        }
    }
    outResult(`${count}`);
}