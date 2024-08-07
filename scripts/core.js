function hashnow() {
    argon2
        .hash({
            pass: passphrase1Input.value,
            salt: sha512(passphrase1Input.value),
            secret: passphrase2Input.value,
            ad: sha512(passphrase1Input.value),
            // time: 48,
            // mem: 256000,
            // hashLen: 32,
            // parallelism: 24,
            // type: argon2.ArgonType.Argon2id
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
            result.value = hash.hashHex;
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
        })
        .catch(e => console.error('Error: ', e));
}