importScripts('argon2.js');

let passphrase1 = null;
let passphrase2 = null;
let passwordLength = null;

self.onmessage = function(event) {
    const { message, data } = event.data;

    switch (message) {
        case 'passphrase1':
            passphrase1 = data;
            break;
        case 'passphrase2':
            passphrase2 = data;
            break;
        case 'passwordLength':
            passwordLength = data;
            break;
        case 'generate':
            if (passphrase1 !== null && passphrase2 !== null && passwordLength !== null) {
                generate()
                .then(result => self.postMessage({ status: 'Successful', result }))
                .catch(error => self.postMessage({ status: 'Error', error }));
            }
            break;
    }
}

function generate() {
    return new Promise((resolve, reject) => {
        let startTime = performance.now();
        let endTime;
        let elapsedTime = 0.00;

        argon2.hash({
            pass: passphrase1,
            salt: passphrase2,
            time: 48,
            mem: 256000,
            hashLen: passwordLength * 16,
            parallelism: 24,
            type: argon2.ArgonType.Argon2id
            // time: 1,
            // mem: 1024,
            // hashLen: 32 * 16,
            // parallelism: 1,
            // type: argon2.ArgonType.Argon2id
        }).then(hash => {
            let password = getPassword(hash);
    
            endTime = performance.now();
            elapsedTime = (endTime - startTime) / 1000;

            if (password !== null) {
                resolve({password, entropy, elapsedTime});
            } else {
                reject('Failed to generate secure password. Try other passphrases or password length.');
            }
        }).catch(error => {
            reject(error);
        }).finally(() => {
            argon2.unloadRuntime();
        });
    });
}

function getPassword(hash) {
    let hashNibbles = bytesToNibbles(hash.hash);

    for (let i = 0; i < 16; i++) {
        let indexes = getIndexes(hashNibbles, 16, i);
        let password = getCharacters(indexes);
        
        if (checkResult(password) === true) {
            return password;
        } else {
            entropy = 0.00;
        }
    }

    return null;
}

function bytesToNibbles(bytes) {
    let nibbles = [];

    bytes.forEach(byte => {
        let highNibble = (byte >> 4) & 0x0F;
        let lowNibble = byte & 0x0F;

        nibbles.push(highNibble, lowNibble);
    });

    return nibbles;
}

function getIndexes(hashNibbles, blockSize, shift) {
    let indexes = [];
    indexes[0] = [];
    indexes[1] = [];

    for(let i = 0 + shift, j = 0; i < hashNibbles.length; i += blockSize, j++) {
        let blockSum = 0;

        for(let y = i; y < i + blockSize; y++) {
            if (y < hashNibbles.length) {
                blockSum += hashNibbles[y];
            } else {
                blockSum += hashNibbles[y - hashNibbles.length];
            }
        }

        let blockShift = blockSum % blockSize;

        if (i + blockShift < hashNibbles.length) {
            indexes[j % 2].push(hashNibbles[i + blockShift]);
        } else {
            indexes[j % 2].push(hashNibbles[i + blockShift - hashNibbles.length]);
        }
    }

    return indexes;
}

function getCharacters(indexes) {
    let charactersString = '';

    for (let i = 0; i < indexes[0].length; i++) {
        charactersString += defaultCharacterTable[indexes[0][i]][indexes[1][i]];
    }

    return charactersString;
}

function checkResult(password) {
    const uniqueChars = new Set();
    let upperCaseCount = 0;
    let lowerCaseCount = 0;
    let digitCount = 0;
    let specialCharCount = 0;

    let minUpperCaseCount = 2;
    let minLowerCaseCount = 2;
    let minDigitCount = 2;
    let minSpecialCharCount = 2;
    let minEntropy = 0.00;

    switch (true) {
        case password.length < 32:
            minEntropy = 60.00;
            break;
        case password.length < 64:
            minEntropy = 140.00;
            break;
        case password.length >= 64:
            minEntropy = 340.00;
            break;
    }

    for (i = 0; i < password.length; i++) {
        uniqueChars.add(password[i]);

        let charCode = password.charCodeAt(i);

        // Check ASCII-codes
        switch (true) {
            case charCode >= 65 && charCode <= 90:
                upperCaseCount++;
                break;
            case charCode >= 97 && charCode <= 122:
                lowerCaseCount++;
                break;
            case charCode >= 48 && charCode <= 57:
                digitCount++;
                break;
            default:
                specialCharCount++;
                break;
        }
    }

    entropy = password.length * Math.log2(uniqueChars.size);

    if (entropy >= minEntropy &&
        upperCaseCount >= minUpperCaseCount &&
        lowerCaseCount >= minLowerCaseCount &&
        digitCount >= minDigitCount &&
        specialCharCount >= minSpecialCharCount
    ) {
        return true;
    } else {
        return false;
    }
}

let entropy = 0.00;

let defaultCharacterTable = [ [ '3', 'U', 'I', '6', 'g', '9', '1', '8', 'n', 'W', '}', '2', '5', '\\', 'T', '}' ],
                              [ '5', '3', '2', 'V', '7', 'X', '2', '1', '3', '7', ',', '9', '_', '7', 'b', 'F' ],
                              [ 'H', '1', 'n', '5', '6', 'Q', 'C', ':', '+', '[', 'K', '0', 'e', '1', 'm', '0' ],
                              [ 'f', 'E', '/', 'e', '0', 'C', 'S', 'E', ',', '{', 'i', '\\', 'h', '%', 'G', 'z' ],
                              [ 'q', '9', '3', '4', 'B', 'B', '*', 'U', 'l', '5', '[', '0', 'R', 'D', '$', '8' ],
                              [ '8', '3', '8', '0', '9', 'p', '#', '4', '1', '0', '9', 'y', '+', '9', '2', '7' ],
                              [ '7', '7', '7', 'o', 'x', 'j', '.', '5', '#', 'A', '{', ';', 'h', '-', '1', '7' ],
                              [ 'M', 'X', 'O', '2', '2', '5', '6', '4', '1', 'J', '9', '&', 'y', '8', 'Y', 'o' ],
                              [ ')', '"', ']', '1', 'l', '4', '6', '0', '?', 'T', '$', 'F', 'd', '5', ';', 'I' ],
                              [ 'M', '6', 'c', 'Y', 'P', '5', '2', '2', '@', 'k', '%', 's', '&', '0', '|', 'r' ],
                              [ '|', '6', '^', 't', 'v', '6', 'k', '3', 'O', '9', 'x', '=', 'G', 'r', '0', '!' ],
                              [ '_', 'A', '8', '!', '^', '3', 'v', '4', 'W', '6', '\'', '3', 'D', '=', 'p', 'P' ],
                              [ 'a', '4', '\'', 'b', '4', '4', '-', 'j', '9', 'g', ':', 'J', '8', '(', 'u', '<' ],
                              [ 'Q', 'u', 'd', '>', 'w', 'Z', '>', 'S', 'w', ']', '1', '5', '<', '8', '7', 'a' ],
                              [ '3', '~', 'V', '.', '4', '*', 'R', '(', '?', 't', 'f', 'c', '8', 'K', 'm', ')' ],
                              [ 'N', 'Z', '@', 'z', '/', 's', '2', 'H', 'L', 'L', '~', 'N', '"', 'i', '6', 'q' ] ];