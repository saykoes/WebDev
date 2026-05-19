function outResult(resultContent) {
    document.getElementById("result").textContent = `${resultContent}`;
    console.log(resultContent);
}

// Task 1. Timer
function createCounter(n, onComplete) {
    // returning an object containing all fields and methods
    return {
        timerId: null, // for creating and deleting interval
        currentCount: n,
        isPaused: false,

        // resuming (if paused) or starting
        start() {
            // do nothing if timer is in progress
            if (this.timerId) return;
            this.isPaused = false;

            this.timerId = setInterval(() => {
                outResult(`Counter: ${this.currentCount}`);

                if (this.currentCount <= 0) {
                    this.stop();
                } else {
                    this.currentCount--;
                }
            }, 1000);
        },

        pause() {
            if (this.timerId) {
                clearInterval(this.timerId);

                this.timerId = null;
                this.isPaused = true;

                document.getElementById("result").textContent += " (paused)";
            }
        },

        stop() {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
            outResult("Counter stopped");
            if (typeof onComplete === 'function') {
                onComplete();
            }
        }
    };
}

let counterInstance = null;

function startCounter() {
    const n = parseInt(document.getElementById("counterInput").value) || 10;
    // if in progress -> do noting
    if (counterInstance && !counterInstance.isPaused) {
        return;
    }
    // if not created -> create
    if (!counterInstance) {
        counterInstance = createCounter(n, () => { counterInstance = null; });
    }
    // resume (if paused) or start
    counterInstance.start();
}
function pauseCounter() {
    counterInstance?.pause();
}
function stopCounter() {
    counterInstance?.stop();
}


// Task 2
// delay function via Promise
function delay(seconds) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(); }, seconds*1000);
    });
}
async function runDelayedCounter() {
    const seconds = parseInt(document.getElementById("delayInput").value) || 3;
    outResult(`Waiting ${seconds}s...`);
    await delay(seconds);

    const n = 5;
    for (let i = n; i >= 0; i--) {
        outResult(`Counter: ${i}`);
        await delay(1);
    }
}

// get a first github repo from api (handle promieses via .then)

async function getFirstRepo() {
    const username = document.getElementById("githubUserInput").value.trim();
    if (!username) {
        outResult("Error: Input Github Username");
        return;
    }

    // call an api and return a promise
    fetch(`https://api.github.com/users/${username}`)
        // so this .then returns a promise that has its own .then
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(user => {
            return fetch(user.repos_url).then(r => r.json());
        })
        .then(repos => {
            if (repos.length === 0) {
                outResult("No repos found");
            } else {
                outResult(`First repo: ${repos[0].name}`);
            }
        })
        .catch(err => {
            outResult(`Error: ${err.message}`);
        });
}

// Task 3. Get a first github repo from api (handle promieses via async functions)

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`); // like a  : base(args)
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    const response = await fetch(url);
    if (response.status === 200) { // OK
        return await response.json();
    } else {
        throw new HttpError(response);
    }
}

async function getGithubUserFirstRepo() {
    let name = document.getElementById("githubUserInput").value.trim() || "SaykoES";

    while (true) {
        try {
            const user = await loadJson(`https://api.github.com/users/${name}`);
            const repos = await loadJson(user.repos_url);
            if (repos.length > 0) {
                outResult(`First repo: ${repos[0].name}`);
            } else {
                outResult("User doesn't have any repos");
            }
            break;
        } catch (err) {
            if (err instanceof HttpError && err.response.status === 404) { // NOT FOUND
                name = prompt("User not found. Try a different one", "");
                if (!name) {
                    outResult("Cancelled");
                    break;
                }
            } else {
                outResult(`Error: ${err.message}`);
                break;
            }
        }
    }
}