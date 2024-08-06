document.addEventListener('DOMContentLoaded', function() {
    const form1 = document.getElementById('passphrase1Form');
    const form2 = document.getElementById('passphrase2Form');
    const passphrase1Input = document.getElementById('passphrase1Input');
    const passphrase2Input = document.getElementById('passphrase2Input');
    const showPassphrase1Checkbox = document.getElementById('showPassphrase1Checkbox');
    const showPassphrase2Checkbox = document.getElementById('showPassphrase2Checkbox');
    const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');
    const showPassphrase1CheckboxLabel = document.getElementById('showPassphrase1CheckboxLabel');
    const showPassphrase2CheckboxLabel = document.getElementById('showPassphrase2CheckboxLabel');
    const showPasswordCheckboxLabel = document.getElementById('showPasswordCheckboxLabel');
    const nextButton = document.getElementById('nextButton');
    const confirmButton = document.getElementById('confirmButton');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const generateNote = document.getElementById('generateNote');
    const copyNote = document.getElementById('copyNote');
    const clearNote = document.getElementById('clearNote');
    const result = document.getElementById('result');
    

    form1.removeAttribute('action');
    form2.removeAttribute('action');

    form1.addEventListener('submit', function(event) {
        event.preventDefault();

        passphrase1Input.type = 'password';
        passphrase1Input.setAttribute('disabled', 'disabled');
        showPassphrase1Checkbox.checked = false;
        showPassphrase1Checkbox.setAttribute('disabled', 'disabled');
        showPassphrase1CheckboxLabel.style.color = '#202020';
        nextButton.setAttribute('disabled', 'disabled');
        
        passphrase2Input.removeAttribute('disabled');
        showPassphrase2Checkbox.removeAttribute('disabled');
        showPassphrase2CheckboxLabel.style.color = 'white';
        confirmButton.removeAttribute('disabled');

        passphrase2Input.type = 'password';
        passphrase2Input.focus();
    });

    form2.addEventListener('submit', function(event) {
        event.preventDefault();

        if (passphrase1Input.value != passphrase2Input.value) {
            passphrase2Input.type = 'password';
            passphrase2Input.setAttribute('disabled', 'disabled');
            showPassphrase2Checkbox.checked = false;
            showPassphrase2Checkbox.setAttribute('disabled', 'disabled');
            showPassphrase2CheckboxLabel.style.color = '#202020';
            confirmButton.setAttribute('disabled', 'disabled');

            generateButton.removeAttribute('disabled');
            generateButton.focus();
        } else {
            alert('Passphrases must be different!');
            passphrase2Input.focus();
        }
    });

    showPassphrase1Checkbox.addEventListener('click', function() {
        if (passphrase1Input.type === 'password') {
            passphrase1Input.type = 'text';
        } else {
            passphrase1Input.type = 'password';
        }

        passphrase1Input.focus();
        // passphrase1Input.setSelectionRange(0, passphrase1Input.value.length);
    });

    showPassphrase2Checkbox.addEventListener('click', function() {
        if (passphrase2Input.type === 'password') {
            passphrase2Input.type = 'text';
        } else {
            passphrase2Input.type = 'password';
        }

        passphrase2Input.focus();
        // passphrase2Input.setSelectionRange(0, passphrase2Input.value.length);
    });

    showPasswordCheckbox.addEventListener('click', function() {
        if (result.type === 'password') {
            result.type = 'text';
        } else {
            result.type = 'password';
        }
    });

    generateButton.addEventListener('click', function() {
        generateButton.setAttribute('disabled', 'disabled');
        generateButton.innerHTML = '<img id="loading" src="images/loading.webp" alt="Loaning">';
        // generateButton.style.boxShadow = '0';
        generateNote.style.visibility = 'visible';

        setTimeout(hashnow, 500);
    });

    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(result.value);
        this.innerHTML = 'Copied';
        clearButton.focus();
    });

    clearButton.addEventListener('click', function() {
        navigator.clipboard.writeText('');

        document.location.reload();
    });
});

function hashnow() {
    argon2
        .hash({
            pass: passphrase1Input.value,
            salt: sha512(passphrase1Input.value),
            secret: passphrase2Input.value,
            ad: sha512(passphrase1Input.value),
            time: 48,
            mem: 256000,
            hashLen: 32,
            parallelism: 24,
            type: argon2.ArgonType.Argon2id
            // time: 1,
            // mem: 1024,
            // hashLen: 32,
            // parallelism: 1,
            // type: argon2.ArgonType.Argon2id
        })
        .then(hash => {
        //    document.querySelector('pre').innerText =
        //        `Encoded: ${hash.encoded}\n` +
        //        `Hex: ${hash.hashHex}\n`;
            result.value = hash.hashHex;
            result.removeAttribute('disabled');
            result.style.boxShadow = '0px 0px 25px rgba(179, 71, 230, 0.8)';

            generateButton.innerHTML = '<b>Generated</b>';
            generateNote.style.visibility = 'hidden';
            showPasswordCheckbox.removeAttribute('disabled');
            showPasswordCheckboxLabel.style.color = 'white';
            copyButton.removeAttribute('disabled');
            copyButton.focus();
        })
        .catch(e => console.error('Error: ', e));
}