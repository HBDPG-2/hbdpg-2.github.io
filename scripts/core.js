function generate() {
    argon2.hash({
        pass: passphrase1Input.value,
        salt: sha512(passphrase1Input.value),
        secret: passphrase2Input.value,
        ad: sha512(passphrase2Input.value),
        time: 48,
        mem: 256000,
        hashLen: 32 * 16,
        parallelism: 24,
        type: argon2.ArgonType.Argon2id
        // time: 1,
        // mem: 1024,
        // hashLen: 32 * 16,
        // parallelism: 1,
        // type: argon2.ArgonType.Argon2id
    }).then(hash => {
        let password = getPassword(hash);
        
        result.value = password;
        result.removeAttribute('disabled');
        result.style.boxShadow = '0px 0px 25px rgba(179, 71, 230, 0.8)';
        generateButton.innerHTML = '<b>Generated</b>';
        // generateButton.style.border = '2px solid #202020';
        // generateButton.style.boxShadow = 'none';
        generateNote.style.visibility = 'hidden';
        showPasswordCheckbox.removeAttribute('disabled');
        showPasswordCheckboxLabel.style.color = 'white';
        showPasswordCheckboxLabel.style.pointerEvents = 'auto';
        copyButton.removeAttribute('disabled');
        clearButton.removeAttribute('disabled');
        copyButton.focus();
    }).catch(e => {
        console.error('Error: ', e);
        generateButton.innerHTML = '<b>Error!</b>';
        generateButton.style.color = '#990000';
        generateNote.style.visibility = 'hidden';
        clearButton.removeAttribute('disabled');
        clearButton.focus();
    });
}

function getPassword(hash) {
    let hashDecimals = hexToDecimal(hash.hashHex);

    for (let i = 0; i < 16; i++) {
        let indexes = getIndexes(hashDecimals, 16, i);
        let password = getCharacters(indexes);
        
        if (checkResult(password) === true) {
            return password;
        }
    }

    window.alert('Failed to generate secure password. Try other passphrases or choose a different password length.');
    return null;
}

function getIndexes(hashDecimals, blockSize, shift) {
    let indexes = [];
    indexes[0] = [];
    indexes[1] = [];

    for(let i = 0 + shift, j = 0; i < hashDecimals.length; i += blockSize, j++) {
        let blockSum = 0;

        for(let y = i; y < i + blockSize; y++) {
            if (y < hashDecimals.length) {
                blockSum += hashDecimals[y];
            } else {
                blockSum += hashDecimals[y - hashDecimals.length];
            }
        }

        if (i + blockSum % blockSize < hashDecimals.length) {
            indexes[j % 2].push(hashDecimals[i + blockSum % blockSize]);
        } else {
            indexes[j % 2].push(hashDecimals[(i + blockSum % blockSize) - hashDecimals.length]);
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
    let uniqueChars = new Set();
    let upperCaseCount = 0;
    let lowerCaseCount = 0;
    let digitCount = 0;
    let specialCharCount = 0;
    let entropy = 0.00;

    let minUpperCaseCount = 2;
    let minLowerCaseCount = 2;
    let minDigitCount = 2;
    let minSpecialCharCount = 2;
    let minEntropy = 0.00;

    switch (password.length) {
        case 16:
            minEntropy = 60.00;
            break;
        case 32:
            minEntropy = 140.00;
            break;
        case 64:
            minEntropy = 340.00;
            break;
        default:
            minEntropy = Infinity;
    }

    for (i = 0; i < password.length; i++) {
        uniqueChars.add(password[i]);

        if (/[A-Z]/.test(password[i])) {
            upperCaseCount++;
        } else if (/[a-z]/.test(password[i])) {
            lowerCaseCount++;
        } else if (/[0-9]/.test(password[i])) {
            digitCount++;
        } else {
            specialCharCount++;
        }
    }

    entropy = password.length * Math.log2(uniqueChars.size);

    if (entropy >= minEntropy && upperCaseCount >= minUpperCaseCount && lowerCaseCount >= minLowerCaseCount && digitCount >= minDigitCount && specialCharCount >= minSpecialCharCount) {
        return true;
    } else {
        return false;
    }
}

function hexToDecimal(hexString) {
    let decimalArray = [];

    for (let i = 0; i < hexString.length; i++) {
        let hexChar = hexString.charAt(i);
        decimalArray.push(parseInt(hexChar, 16));
    }

    return decimalArray;
}

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