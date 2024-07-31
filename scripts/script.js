document.addEventListener('DOMContentLoaded', function () {
    const form1 = document.getElementById('passphrase1Form');
    const form2 = document.getElementById('passphrase2Form');
    const passphrase1Input = document.getElementById('passphrase1Input');
    const passphrase2Input = document.getElementById('passphrase2Input');
    const nextButton = document.getElementById('nextButton');
    const confirmButton = document.getElementById('confirmButton');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const result = document.getElementById('result');

    form1.removeAttribute('action');
    form2.removeAttribute('action');

    form1.addEventListener('submit', function (event) {
        event.preventDefault();

        passphrase1Input.setAttribute('disabled', 'disabled');
        nextButton.setAttribute('disabled', 'disabled');
        
        passphrase2Input.removeAttribute('disabled');
        confirmButton.removeAttribute('disabled');

        passphrase2Input.type = 'password';
        passphrase2Input.focus();
    });

    form2.addEventListener('submit', function (event) {
        event.preventDefault();

        if (passphrase1Input.value != passphrase2Input.value) {
            passphrase2Input.setAttribute('disabled', 'disabled');
            confirmButton.setAttribute('disabled', 'disabled');

            generateButton.removeAttribute('disabled');
            generateButton.focus();
        } else {
            alert('Passphrases must be different!');
            passphrase2Input.focus();
        }
    });
});

function hashnow() {
    generateButton.setAttribute('disabled', 'disabled');
    // generate button loading...

    argon2
        .hash({
            pass: passphrase1Input.value,
            salt: passphrase2Input.value,
            time: 1,
            mem: 1024,
            hashLen: 32,
            parallelism: 1,
            type: argon2.ArgonType.Argon2id
        })
        .then(hash => {
        //    document.querySelector('pre').innerText =
        //        `Encoded: ${hash.encoded}\n` +
        //        `Hex: ${hash.hashHex}\n`;
            result.setAttribute('value', hash.hashHex);
            copyButton.removeAttribute('disabled');
        })
        .catch(e => console.error('Error: ', e));
}